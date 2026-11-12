#!/usr/bin/env python3
"""Prof.AI 수능수학 함수의 극한과 연속 서버 — 로컬 + Render 클라우드 배포 겸용"""
import http.server
import json
import urllib.request
import ssl
import os
import threading
import time
import random
from datetime import date, datetime

PORT = int(os.environ.get('PORT', 8080))
SERVER_API_KEY = os.environ.get('CLAUDE_API_KEY', '')
TOSS_SECRET_KEY = os.environ.get('TOSS_SECRET_KEY', '')  # test_sk_... 또는 live_sk_...
DAILY_LIMIT = int(os.environ.get('DAILY_LIMIT', 10))  # 인당 하루 API 호출 제한

# 인당 일일 사용량 추적 {날짜: {uid: 횟수}}
usage_tracker = {}

# 문제은행 서버 메모리 로드
question_bank = []
question_ids = {}  # {qid: index} 미리 계산
question_by_type = {}  # {type: [questions]} 미리 분류

def get_qid(q):
    return (q.get('problem', '') or '')[:80].strip()

def load_question_bank():
    global question_bank, question_ids, question_by_type
    try:
        with open(os.path.join(os.path.dirname(__file__), 'questions.js'), 'r', encoding='utf-8') as f:
            content = f.read()
        start = content.find('[')
        end = content.rfind(']') + 1
        if start >= 0 and end > 0:
            import re
            json_str = content[start:end]
            # JS 주석 제거 (// 한 줄 주석)
            json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)
            question_bank = json.loads(json_str)
            # 인덱스 미리 계산
            question_ids = {}
            question_by_type = {}
            for i, q in enumerate(question_bank):
                question_ids[get_qid(q)] = i
                t = q.get('_type', '')
                if t not in question_by_type:
                    question_by_type[t] = []
                question_by_type[t].append(q)
            print(f"📦 극한 문제은행 로드: {len(question_bank)}문제, {len(question_by_type)}유형")
    except Exception as e:
        print(f"⚠️ 문제은행 로드 실패: {e}")

load_question_bank()

# 사용자별 푼 문제 이력 {uid: set(인덱스)}
user_question_history = {}

def check_rate_limit(uid):
    """일일 사용량 체크. True면 허용, False면 초과"""
    if not uid or not SERVER_API_KEY:
        return True  # 서버키 없으면 제한 없음 (로컬)
    today = date.today().isoformat()
    if today not in usage_tracker:
        usage_tracker.clear()  # 이전 날짜 데이터 정리
        usage_tracker[today] = {}
    count = usage_tracker[today].get(uid, 0)
    if count >= DAILY_LIMIT:
        return False
    usage_tracker[today][uid] = count + 1
    return True

class AppHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-user-id, anthropic-version, anthropic-dangerous-direct-browser-access')
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'hasServerKey': bool(SERVER_API_KEY),
                'dailyLimit': DAILY_LIMIT,
                'questionCount': len(question_bank),
            }).encode())
            return
        if self.path.startswith('/api/questions'):
            from urllib.parse import urlparse, parse_qs
            params = parse_qs(urlparse(self.path).query)
            q_type = params.get('type', [''])[0]
            count = int(params.get('count', ['1'])[0])
            uid = params.get('uid', [''])[0]
            difficulty = params.get('difficulty', [''])[0]

            # 사용자가 푼 문제 제외 (클라이언트에서 전달한 exclude 목록)
            exclude_raw = params.get('exclude', ['[]'])[0]
            try:
                from urllib.parse import unquote
                exclude_list = json.loads(unquote(exclude_raw))
            except:
                exclude_list = []
            exclude_set = set(exclude_list)

            def get_qid_local(q):
                return (q.get('problem', '') or '')[:80].replace('  ', ' ').strip()

            available = [q for q in question_bank
                        if (not q_type or q.get('_type') == q_type)
                        and (not difficulty or q.get('difficulty', '') == difficulty)
                        and get_qid_local(q) not in exclude_set]

            # 부족하면 전체에서 (이력 무시)
            if len(available) < count:
                available = [q for q in question_bank
                            if (not q_type or q.get('_type') == q_type)
                            and (not difficulty or q.get('difficulty', '') == difficulty)]

            selected = random.sample(available, min(count, len(available)))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(selected, ensure_ascii=False).encode())
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/questions':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}

            q_type = data.get('type', '')
            count = int(data.get('count', 1))
            difficulty = data.get('difficulty', '')
            exclude_set = set(data.get('exclude', []))

            # 미리 분류된 유형별 목록 사용 (빠름)
            pool = question_by_type.get(q_type, question_bank) if q_type else question_bank
            if difficulty:
                pool = [q for q in pool if q.get('difficulty', '') == difficulty]
            if exclude_set:
                available = [q for q in pool if get_qid(q) not in exclude_set]
            else:
                available = pool

            if len(available) < count:
                available = pool

            # 비활성화 문제 제외
            available = [q for q in available if not q.get('_disabled')]

            # 감수완료(R) 문제 우선 제공
            reviewed = [q for q in available if q.get('_reviewed')]
            unreviewed = [q for q in available if not q.get('_reviewed')]
            if len(reviewed) >= count:
                selected = random.sample(reviewed, count)
            elif reviewed:
                selected = reviewed + random.sample(unreviewed, min(count - len(reviewed), len(unreviewed)))
            else:
                selected = random.sample(available, min(count, len(available)))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(selected, ensure_ascii=False).encode())
            return

        if self.path == '/api/report-question':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            qid = data.get('qid', '')
            if qid:
                # 신고 카운트 증가
                if not hasattr(self, '_report_counts'):
                    type(self)._report_counts = {}
                counts = type(self)._report_counts
                counts[qid] = counts.get(qid, 0) + 1
                count = counts[qid]
                disabled = False
                # 3건 이상이면 비활성화
                if count >= 3:
                    for q in question_bank:
                        if q.get('_qid') == qid:
                            q['_disabled'] = True
                            q['_disabledReason'] = f'신고 {count}건 누적'
                            disabled = True
                            print(f"⚠️ 문제 비활성화: {qid} (신고 {count}건)")
                            break
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'qid': qid, 'reportCount': count, 'disabled': disabled}).encode())
            else:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'qid required'}).encode())
            return

        if self.path == '/api/save-question':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            q = data.get('question')
            if q and isinstance(q, dict) and q.get('problem'):
                # 중복 체크 (문제 앞 80자)
                qid_check = get_qid(q)
                if qid_check not in question_ids:
                    # U-xxxx 번호 부여
                    u_count = sum(1 for bq in question_bank if not bq.get('_reviewed'))
                    q['_qid'] = f"U-{u_count+1:04d}"
                    q['_reviewed'] = False
                    q['_source'] = q.get('_source', 'ai')
                    question_bank.append(q)
                    question_ids[qid_check] = len(question_bank) - 1
                    t = q.get('_type', '')
                    if t not in question_by_type:
                        question_by_type[t] = []
                    question_by_type[t].append(q)
                    # questions.js에 저장
                    try:
                        js_path = os.path.join(os.path.dirname(__file__), 'questions.js')
                        r_count = sum(1 for bq in question_bank if bq.get('_reviewed'))
                        u_total = len(question_bank) - r_count
                        js = f"// 수능수학 극한 문제은행 — {len(question_bank)}문제 (R:{r_count} 감수완료, U:{u_total} 미감수)\n"
                        js += "// 번호체계: R-xxxx(감수완료), U-xxxx(미감수)\n"
                        js += f"const QUESTION_BANK = {json.dumps(question_bank, ensure_ascii=False, indent=2)};\n"
                        with open(js_path, 'w', encoding='utf-8') as f:
                            f.write(js)
                        print(f"📝 AI 문제 저장: {q['_qid']} ({q.get('_type','')})")
                    except Exception as e:
                        print(f"⚠️ 문제 저장 실패: {e}")
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'saved': True, 'qid': q['_qid']}).encode())
                else:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'saved': False, 'reason': 'duplicate'}).encode())
            else:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'invalid question'}).encode())
            return

        if self.path == '/api/claude':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)

            # 서버 키 사용 시 rate limit 체크
            uid = self.headers.get('x-user-id', '')
            if SERVER_API_KEY and not check_rate_limit(uid):
                self.send_response(429)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': {'message': f'일일 사용 제한({DAILY_LIMIT}회)을 초과했습니다. 내일 다시 이용해주세요.'}
                }).encode())
                return

            api_key = SERVER_API_KEY or self.headers.get('x-api-key', '')

            if not api_key:
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': {'message': 'API 키가 설정되지 않았습니다'}}).encode())
                return

            req_body = json.dumps({
                'model': data.get('model', 'claude-haiku-4-5'),
                'max_tokens': data.get('max_tokens', 2000),
                'messages': data.get('messages', []),
            }).encode('utf-8')

            req = urllib.request.Request(
                'https://api.anthropic.com/v1/messages',
                data=req_body,
                headers={
                    'Content-Type': 'application/json',
                    'x-api-key': api_key,
                    'anthropic-version': '2023-06-01',
                },
                method='POST'
            )

            try:
                ctx = ssl.create_default_context()
                try:
                    import certifi
                    ctx.load_verify_locations(certifi.where())
                except ImportError:
                    pass
                try:
                    resp_to_use = urllib.request.urlopen(req, context=ctx)
                except ssl.SSLCertVerificationError:
                    ctx = ssl._create_unverified_context()
                    resp_to_use = urllib.request.urlopen(req, context=ctx)
                with resp_to_use as response:
                    result = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(result)
            except urllib.error.HTTPError as e:
                error_body = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(error_body)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': {'message': str(e)}}).encode())
        elif self.path == '/api/payment/confirm':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)

            if not TOSS_SECRET_KEY:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '결제 시크릿 키가 설정되지 않았습니다'}).encode())
                return

            import base64
            auth_header = base64.b64encode(f"{TOSS_SECRET_KEY}:".encode()).decode()

            req_body = json.dumps({
                'paymentKey': data.get('paymentKey'),
                'orderId': data.get('orderId'),
                'amount': data.get('amount'),
            }).encode('utf-8')

            req = urllib.request.Request(
                'https://api.tosspayments.com/v1/payments/confirm',
                data=req_body,
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Basic {auth_header}',
                },
                method='POST'
            )

            try:
                ctx = ssl.create_default_context()
                resp = urllib.request.urlopen(req, context=ctx)
                result = resp.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(result)
            except urllib.error.HTTPError as e:
                error_body = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(error_body)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        print(f"  {args[0]}")

# ═══════════════════════════════════════
# 문제은행 자동 교체 (1주마다 70문제 추가)
# ═══════════════════════════════════════
REFRESH_INTERVAL = 7 * 24 * 3600  # 1주일 (초)
REFRESH_COUNT = 70  # 추가할 문제 수
QUESTIONS_PATH = os.path.join(os.path.dirname(__file__), 'questions.js')

TYPES_FOR_REFRESH = {
    "limit_basic": (
        "수능 수학 '함수의 극한 기본' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식(multiple_choice) 3문제, 단답형 정수(short_answer) 2문제.\n"
        "★ 수학 표기: KaTeX 문법 사용. 예) $\\lim_{x \\to a} f(x)$, $\\lim_{x \\to a^+} f(x)$, $\\lim_{x \\to a^-} f(x)$\n"
        "★ 문제 유형: 함수의 극한 정의, 좌극한과 우극한, 극한의 존재 조건, 그래프에서 극한값 읽기, 극한의 기본 성질(합·차·곱·몫), 극한값이 존재하지 않는 경우 판별.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요. 계산 과정을 explanation에 단계별로 작성하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력 (설명 텍스트 없이):\n"
        '[{"type":"극한기본","difficulty":"lv1~lv4","problem":"문제 본문(KaTeX 수식 포함)","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①값","②값","③값","④값","⑤값"] (객관식만, 단답형은 null),'
        '"answer":0 (객관식: 0~4 인덱스, 단답형: 정수값),'
        '"explanation":"풀이 과정(KaTeX 수식 포함, 단계별)","_type":"limit_basic"}]'
    ),
    "limit_calc": (
        "수능 수학 '극한값 계산' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$, $\\lim_{x \\to 0} \\frac{\\sqrt{x+1} - 1}{x}$\n"
        "★ 문제 유형: 다항함수의 극한 계산, 유리함수의 극한(인수분해), 무리함수의 극한(유리화), 극한의 사칙연산, 대입으로 구하는 극한, 함수값과 극한값 비교.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"극한값계산","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"limit_calc"}]'
    ),
    "indeterminate": (
        "수능 수학 '부정형 극한' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\frac{0}{0}$ 꼴, $\\frac{\\infty}{\\infty}$ 꼴, $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$\n"
        "★ 문제 유형: $\\frac{0}{0}$ 부정형 해소(인수분해, 유리화), $\\frac{\\infty}{\\infty}$ 부정형(최고차항 나누기), $0 \\cdot \\infty$ 꼴 변환, $\\infty - \\infty$ 꼴 변환, 부정형 판별과 극한값 계산.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"부정형","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"indeterminate"}]'
    ),
    "limit_infinity": (
        "수능 수학 '무한대 극한' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\lim_{x \\to \\infty} \\frac{2x^2 + 1}{x^2 - 3}$, $\\lim_{x \\to \\infty} (\\sqrt{x^2 + x} - x)$\n"
        "★ 문제 유형: $x \\to \\infty$일 때 다항함수·유리함수의 극한, 최고차항 비교, $\\sqrt{}$ 포함 무한대 극한(유리화), $x \\to -\\infty$ 극한, 발산 속도 비교, 점근선과의 관계.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"무한대극한","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"limit_infinity"}]'
    ),
    "trig_limit": (
        "수능 수학 '삼각함수 극한' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$, $\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$, $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$\n"
        "★ 문제 유형: $\\frac{\\sin x}{x}$ 기본 공식 활용, $\\frac{\\tan x}{x}$ 극한, 삼각함수 치환을 이용한 극한, 삼각함수 합성 후 극한, $\\sin(ax)/\\sin(bx)$ 꼴, 삼각함수와 다항함수 혼합 극한.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"삼각함수극한","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"trig_limit"}]'
    ),
    "continuity": (
        "수능 수학 '함수의 연속' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\lim_{x \\to a} f(x) = f(a)$, 연속의 세 조건, 불연속점\n"
        "★ 문제 유형: 연속의 정의(세 조건 확인), 불연속점 판별(제거 가능·점프·무한), 구간별 정의 함수의 연속성, 그래프에서 연속·불연속 판별, 연속이 되기 위한 조건 구하기.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"함수의연속","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"continuity"}]'
    ),
    "continuity_prop": (
        "수능 수학 '연속함수의 성질' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) 중간값 정리, $f(a) \\cdot f(b) < 0$이면 근 존재, 최대·최소값 정리\n"
        "★ 문제 유형: 중간값 정리 적용(근의 존재성 증명), 최대·최소값 정리, 연속함수의 합·곱·몫의 연속성, 합성함수의 연속성, 사잇값 정리를 이용한 방정식의 근 판별.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"연속함수성질","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"continuity_prop"}]'
    ),
    "coeff_determine": (
        "수능 수학 '미정계수 결정' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) $\\lim_{x \\to 1} \\frac{x^2 + ax + b}{x - 1} = 3$에서 $a, b$ 결정\n"
        "★ 문제 유형: 극한값이 존재하기 위한 미정계수 결정, 연속 조건으로 상수 결정, $\\frac{0}{0}$ 부정형에서 분자 조건으로 계수 결정, 구간별 함수의 연속 조건, 극한값과 함수값이 일치하도록 상수 결정.\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"미정계수결정","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"coeff_determine"}]'
    ),
    "limit_applied": (
        "수능 수학 '극한 활용' 문제를 5개 생성하세요.\n"
        "★ 각 문제의 difficulty 필드는 \"lv1\", \"lv2\", \"lv3\", \"lv4\" 중 하나로 설정하세요.\n"
        "  - lv1: 개념 확인 (공식 직접 적용)\n"
        "  - lv2: 기초 적용 (한 단계 응용)\n"
        "  - lv3: 수능 2등급 수준\n"
        "  - lv4: 동경대·교토대 입시 수준\n"
        "  5문제 중 lv1 1개, lv2 2개, lv3 1개, lv4 1개로 배분하세요.\n"
        "★ answerType 혼합: 객관식 3문제, 단답형 정수 2문제.\n"
        "★ 수학 표기: KaTeX 문법. 예) 점근선 $y = \\lim_{x \\to \\infty} f(x)$, 넓이의 극한, 급수와 극한\n"
        "★ 문제 유형: 점근선 구하기(수평·수직·사선), 넓이·부피의 극한, 급수를 극한으로 표현, 함수의 극한과 그래프 해석, 실생활 극한 문제(수렴하는 값 구하기), 극한과 부등식(샌드위치 정리).\n"
        "★ 검증: 반드시 직접 계산하여 정답을 이중 확인하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"극한활용","difficulty":"lv1~lv4","problem":"문제 본문","answerType":"multiple_choice 또는 short_answer",'
        '"choices":["①","②","③","④","⑤"] 또는 null,"answer":인덱스 또는 정수,'
        '"explanation":"단계별 풀이","_type":"limit_applied"}]'
    ),
    "killer": (
        "수능 수학 함수의 극한과 연속 '복합 킬러' 문제를 5개 생성하세요.\n"
        "★ 난이도: 모두 lv4 (동경대·교토대 입시 수준). 여러 개념을 복합적으로 활용해야 풀리는 고난이도 문제.\n"
        "★ 각 문제의 difficulty 필드는 모두 \"lv4\"로 설정하세요.\n"
        "★ answerType: 단답형 정수(short_answer) 5문제 모두.\n"
        "★ 수학 표기: KaTeX 문법 적극 활용.\n"
        "★ 문제 유형 예시:\n"
        "  - 부정형 극한 + 미정계수 결정 + 연속 조건 결합\n"
        "  - 삼각함수 극한 + 무한대 극한 + 점근선 복합\n"
        "  - 구간별 함수의 연속성 + 중간값 정리 + 근의 개수\n"
        "  - 합성함수의 극한 + 연속 조건 + 함수 결정\n"
        "  - 극한의 대소 관계 + 샌드위치 정리 + 미정계수 종합\n"
        "★ 검증: 반드시 직접 풀어서 정답을 이중 확인하세요. 풀이 과정을 3단계 이상으로 상세히 작성하세요.\n"
        "★ 출력 형식 — 반드시 JSON 배열로만 출력:\n"
        '[{"type":"복합 킬러","difficulty":"lv4","problem":"문제 본문(복합 조건, 여러 단계)","answerType":"short_answer",'
        '"choices":null,"answer":정수값,'
        '"explanation":"상세 풀이(3단계 이상, KaTeX 수식 포함)","_type":"killer"}]'
    ),
}

def call_api_for_refresh(prompt):
    """서버 측 API 호출 (문제 생성용)"""
    if not SERVER_API_KEY:
        return None
    req_body = json.dumps({
        "model": "claude-haiku-4-5",
        "max_tokens": 4096,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=req_body,
        headers={
            "Content-Type": "application/json",
            "x-api-key": SERVER_API_KEY,
            "anthropic-version": "2023-06-01",
        },
        method="POST"
    )
    ctx = ssl.create_default_context()
    try:
        import certifi
        ctx.load_verify_locations(certifi.where())
    except ImportError:
        pass
    try:
        resp = urllib.request.urlopen(req, context=ctx, timeout=120)
    except ssl.SSLCertVerificationError:
        ctx = ssl._create_unverified_context()
        resp = urllib.request.urlopen(req, context=ctx, timeout=120)
    result = json.loads(resp.read())
    return result["content"][0]["text"]

def verify_math_answer(q):
    """수학 문제 정답 검증 — Claude에게 독립적으로 풀게 하여 정답 비교"""
    try:
        problem = q.get('problem', '')
        answer = q.get('answer')
        answer_type = q.get('answerType', 'multiple_choice')
        choices = q.get('choices')

        if answer is None:
            print(f"    ❌ 수학 검증: answer가 없음")
            return False

        # Claude에게 독립적으로 풀기 요청
        if answer_type == 'short_answer':
            prompt = (
                f"다음 수학 문제를 풀고 정답(정수)만 답하세요.\n\n"
                f"문제:\n{problem}\n\n"
                f"반드시 아래 형식으로만 답하세요:\n"
                f"ANSWER: 정수값"
            )
        else:
            choices_str = '\n'.join(choices) if choices else ''
            prompt = (
                f"다음 수학 문제를 풀고 정답 번호(0~4, 0=①, 1=②, 2=③, 3=④, 4=⑤)만 답하세요.\n\n"
                f"문제:\n{problem}\n\n"
                f"선택지:\n{choices_str}\n\n"
                f"반드시 아래 형식으로만 답하세요:\n"
                f"ANSWER: 숫자"
            )

        result = call_api_for_refresh(prompt)
        if not result:
            return True  # API 실패 시 통과

        # ANSWER: 숫자 파싱
        import re
        match = re.search(r'ANSWER:\s*(-?\d+)', result)
        if not match:
            print(f"    ⚠️ 수학 검증: 응답 파싱 실패 — {result[:100]}")
            return True  # 파싱 실패 시 통과

        verified_answer = int(match.group(1))

        if verified_answer == answer:
            print(f"    ✅ 수학 검증: 정답 일치 ({answer})")
            return True
        else:
            print(f"    ❌ 수학 검증: 정답 불일치 (문제 정답={answer}, 검증 정답={verified_answer})")
            return False
    except Exception as e:
        print(f"    ⚠️ 수학 검증 실패: {e}")
        return True  # 검증 실패 시 통과

def parse_json_array(text):
    start = text.find("[")
    end = text.rfind("]") + 1
    if start < 0 or end <= 0:
        return []
    try:
        return json.loads(text[start:end])
    except json.JSONDecodeError:
        return []

def refresh_questions():
    """70문제를 새로 생성하여 questions.js에 추가"""
    while True:
        try:
            # 다음 교체까지 대기
            time.sleep(REFRESH_INTERVAL)
            if not SERVER_API_KEY:
                continue

            print(f"\n🔄 [{datetime.now().strftime('%Y-%m-%d %H:%M')}] 함수극한 문제은행 추가 시작 ({REFRESH_COUNT}문제)")

            # 기존 문제 로드
            if not os.path.exists(QUESTIONS_PATH):
                continue
            with open(QUESTIONS_PATH, 'r', encoding='utf-8') as f:
                content = f.read()
            start = content.find("[")
            end = content.rfind("]") + 1
            if start < 0:
                continue
            existing = json.loads(content[start:end])

            # 유형별 ~7문제씩 생성 (10유형 x 7 = 70)
            new_questions = []
            types_list = list(TYPES_FOR_REFRESH.items())
            for type_key, prompt in types_list:
                target = 7
                generated = 0
                attempts = 0
                while generated < target and attempts < 5:
                    attempts += 1
                    try:
                        result = call_api_for_refresh(prompt)
                        if not result:
                            break
                        questions = parse_json_array(result)
                        for q in questions:
                            if '_type' not in q:
                                q['_type'] = type_key
                            if 'answerType' not in q:
                                q['answerType'] = 'multiple_choice'
                        new_questions.extend(questions)
                        generated += len(questions)
                        print(f"  ✅ {type_key}: +{len(questions)} (총 {generated}/{target})")
                    except Exception as e:
                        print(f"  ⚠️ {type_key} 생성 실패: {e}")
                    time.sleep(1)

            if len(new_questions) < 30:
                print(f"  ❌ 생성 부족 ({len(new_questions)}문제) — 추가 취소")
                continue

            # 수학 문제 정답 자동 검증
            verified = []
            for q in new_questions[:REFRESH_COUNT]:
                if verify_math_answer(q):
                    q['_mathVerified'] = True
                    verified.append(q)
                else:
                    print(f"    ❌ 수학 문제 폐기 (정답 검증 실패: {q.get('_type','')})")
                time.sleep(0.5)
            print(f"  🔍 검증 결과: {len(new_questions[:REFRESH_COUNT])}문제 중 {len(verified)}문제 통과")

            # 기존 문제에 검증 통과 문제만 추가
            updated = existing + verified

            # questions.js 덮어쓰기
            js_content = f"// Prof.AI 수능수학 함수극한 문제은행 — {len(updated)}문제\n"
            js_content += f"// 마지막 추가: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
            js_content += f"const QUESTION_BANK = {json.dumps(updated, ensure_ascii=False, indent=2)};\n"

            with open(QUESTIONS_PATH, 'w', encoding='utf-8') as f:
                f.write(js_content)

            print(f"  🎉 추가 완료! 기존 {len(existing)} + 신규 {len(verified)} = {len(updated)}문제")
            load_question_bank()  # 서버 메모리도 갱신

            # 신규 문제로 날짜별 감수용 파일 + 감수도구 자동 생성
            date_str = datetime.now().strftime('%Y%m%d')
            base_dir = os.path.dirname(__file__)
            try:
                # 1. 날짜별 감수용 JS 파일
                sample_js_path = os.path.join(base_dir, f'questions_sample_{date_str}.js')
                sample_js = f"// Prof.AI 함수극한 감수용 — {date_str} 신규 {len(verified)}문제\n"
                sample_js += f"const QUESTION_BANK = {json.dumps(verified, ensure_ascii=False, indent=2)};\n"
                with open(sample_js_path, 'w', encoding='utf-8') as sf:
                    sf.write(sample_js)

                # 2. 날짜별 감수도구 HTML (review_1.html을 템플릿으로)
                review_template = os.path.join(base_dir, 'review_1.html')
                review_new_path = os.path.join(base_dir, f'review_{date_str}.html')
                if os.path.exists(review_template):
                    with open(review_template, 'r', encoding='utf-8') as rf:
                        review_html = rf.read()
                    review_html = review_html.replace('questions_sample.js', f'questions_sample_{date_str}.js')
                    review_html = review_html.replace('Prof.AI 문항 감수표', f'Prof.AI 함수극한 감수 ({date_str}, {len(verified)}문제)')
                    review_html = review_html.replace("profai_review", f"profai_review_{date_str}")
                    with open(review_new_path, 'w', encoding='utf-8') as rf:
                        rf.write(review_html)

                print(f"  📋 감수도구 생성: review_{date_str}.html ({len(verified)}문제)")
            except Exception as se:
                print(f"  ⚠️ 감수도구 생성 실패: {se}")

        except Exception as e:
            print(f"  ❌ 문제은행 추가 오류: {e}")

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), AppHandler)
    if SERVER_API_KEY:
        print(f"🔑 서버 API 키 설정됨 (학생 키 입력 불필요)")
        print(f"📊 일일 사용 제한: 인당 {DAILY_LIMIT}회")
        # 문제은행 자동 추가 스레드 시작
        refresh_thread = threading.Thread(target=refresh_questions, daemon=True)
        refresh_thread.start()
        print(f"🔄 문제은행 자동 추가: {REFRESH_INTERVAL//3600//24}일마다 {REFRESH_COUNT}문제 누적")
    else:
        print(f"⚠️  서버 API 키 없음 (학생이 직접 키 입력 필요)")
    print(f"🚀 Prof.AI 수능수학 함수의 극한과 연속 서버 시작: http://localhost:{PORT}")
    print(f"   종료: Ctrl+C")
    server.serve_forever()
