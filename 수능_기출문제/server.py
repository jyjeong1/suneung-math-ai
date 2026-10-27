#!/usr/bin/env python3
"""Prof.AI 수능수학 기출문제 서버 — 로컬 + Render 클라우드 배포 겸용"""
import http.server
import json
import urllib.request
import ssl
import os
import random
from datetime import date
from urllib.parse import urlparse, parse_qs, unquote

PORT = int(os.environ.get('PORT', 8080))
SERVER_API_KEY = os.environ.get('CLAUDE_API_KEY', '')
DAILY_LIMIT = int(os.environ.get('DAILY_LIMIT', 10))  # 인당 하루 API 호출 제한

# 인당 일일 사용량 추적 {날짜: {uid: 횟수}}
usage_tracker = {}

# 인당 일일 문제 풀이 추적 {날짜: {uid: 횟수}}
quiz_tracker = {}

# 문제은행 서버 메모리 로드
question_bank = []
question_ids = {}       # {qid: index}
question_by_type = {}   # {_type: [questions]}
question_by_year = {}   # {year: [questions]}
question_by_exam = {}   # {exam: [questions]}
question_by_diff = {}   # {difficulty: [questions]}

# 이미지 디렉토리 (기출 이미지)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.normpath(os.path.join(BASE_DIR, '..', '기출모음', 'images'))


def get_qid(q):
    return q.get('_qid', '')


def load_question_bank():
    global question_bank, question_ids, question_by_type
    global question_by_year, question_by_exam, question_by_diff
    try:
        import re
        with open(os.path.join(BASE_DIR, 'questions.js'), 'r', encoding='utf-8') as f:
            content = f.read()
        start = content.find('[')
        end = content.rfind(']') + 1
        if start >= 0 and end > 0:
            json_str = content[start:end]
            # JS 주석 제거 (// 한 줄 주석)
            json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)
            question_bank = json.loads(json_str)

            # 인덱스 미리 계산
            question_ids = {}
            question_by_type = {}
            question_by_year = {}
            question_by_exam = {}
            question_by_diff = {}

            for i, q in enumerate(question_bank):
                qid = get_qid(q)
                if qid:
                    question_ids[qid] = i

                # _type별 분류
                t = q.get('_type', '')
                if t:
                    question_by_type.setdefault(t, []).append(q)

                # year별 분류
                y = q.get('year')
                if y is not None:
                    question_by_year.setdefault(y, []).append(q)

                # exam별 분류
                e = q.get('exam', '')
                if e:
                    question_by_exam.setdefault(e, []).append(q)

                # difficulty별 분류
                d = q.get('difficulty', '')
                if d:
                    question_by_diff.setdefault(d, []).append(q)

            print(f"📦 기출문제 로드: {len(question_bank)}문제, "
                  f"{len(question_by_type)}유형, "
                  f"{len(question_by_year)}년도, "
                  f"{len(question_by_exam)}시험, "
                  f"{len(question_by_diff)}난이도")
    except Exception as e:
        print(f"⚠️ 문제은행 로드 실패: {e}")


load_question_bank()


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


def filter_questions(pool, q_type='', year='', exam='', difficulty='', exclude_set=None):
    """조건에 맞는 문제를 필터링"""
    result = pool
    if q_type:
        result = [q for q in result if q.get('_type') == q_type]
    if year:
        try:
            year_int = int(year)
            result = [q for q in result if q.get('year') == year_int]
        except ValueError:
            pass
    if exam:
        result = [q for q in result if q.get('exam') == exam]
    if difficulty:
        result = [q for q in result if q.get('difficulty') == difficulty]
    if exclude_set:
        result = [q for q in result if get_qid(q) not in exclude_set]
    return result


class AppHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def translate_path(self, path):
        """이미지 경로를 기출모음/images/로 매핑"""
        import urllib.parse
        decoded = urllib.parse.unquote(path)
        if decoded.startswith('/images/'):
            filename = decoded[len('/images/'):]
            img_path = os.path.join(IMAGES_DIR, filename)
            return img_path
        return super().translate_path(path)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers',
                         'Content-Type, x-api-key, x-user-id, anthropic-version, '
                         'anthropic-dangerous-direct-browser-access')
        self.end_headers()

    def do_GET(self):
        # --- /api/status ---
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'hasServerKey': bool(SERVER_API_KEY),
                'dailyLimit': DAILY_LIMIT,
                'questionCount': len(question_bank),
                'types': sorted(question_by_type.keys()),
                'years': sorted(question_by_year.keys()),
                'exams': sorted(question_by_exam.keys()),
                'difficulties': sorted(question_by_diff.keys()),
            }).encode())
            return

        # --- /api/quiz-count (GET) — 오늘 푼 문제 수 조회 ---
        if self.path.startswith('/api/quiz-count'):
            params = parse_qs(urlparse(self.path).query)
            uid = params.get('uid', [''])[0]
            today = date.today().isoformat()
            count = 0
            if today in quiz_tracker and uid in quiz_tracker[today]:
                count = quiz_tracker[today][uid]
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'date': today, 'count': count}).encode())
            return

        # --- /api/questions (GET) ---
        if self.path.startswith('/api/questions'):
            params = parse_qs(urlparse(self.path).query)
            q_type = params.get('type', [''])[0]
            year = params.get('year', [''])[0]
            exam = params.get('exam', [''])[0]
            difficulty = params.get('difficulty', [''])[0]
            count = int(params.get('count', ['1'])[0])

            # exclude 파싱
            exclude_raw = params.get('exclude', ['[]'])[0]
            try:
                exclude_list = json.loads(unquote(exclude_raw))
            except Exception:
                exclude_list = []
            exclude_set = set(exclude_list)

            available = filter_questions(
                question_bank, q_type, year, exam, difficulty, exclude_set)

            # 부족하면 exclude 무시
            if len(available) < count:
                available = filter_questions(
                    question_bank, q_type, year, exam, difficulty)

            selected = random.sample(available, min(count, len(available)))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(selected, ensure_ascii=False).encode())
            return

        # --- 정적 파일 서빙 (현재 디렉토리 + /images/ 매핑) ---
        super().do_GET()

    def do_POST(self):
        # --- /api/quiz-count (POST) — 문제 풀이 카운트 증가 ---
        if self.path == '/api/quiz-count':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            uid = data.get('uid', '') or self.headers.get('x-user-id', '')
            today = date.today().isoformat()
            if today not in quiz_tracker:
                quiz_tracker.clear()
                quiz_tracker[today] = {}
            quiz_tracker[today][uid] = quiz_tracker[today].get(uid, 0) + 1
            count = quiz_tracker[today][uid]
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'date': today, 'count': count}).encode())
            return

        # --- /api/questions (POST) ---
        if self.path == '/api/questions':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}

            q_type = data.get('type', '')
            year = str(data.get('year', ''))
            exam = data.get('exam', '')
            difficulty = data.get('difficulty', '')
            count = int(data.get('count', 1))
            exclude_set = set(data.get('exclude', []))

            available = filter_questions(
                question_bank, q_type, year, exam, difficulty, exclude_set)

            # 부족하면 exclude 무시
            if len(available) < count:
                available = filter_questions(
                    question_bank, q_type, year, exam, difficulty)

            # 비활성화 문제 제외
            available = [q for q in available if not q.get('_disabled')]

            selected = random.sample(available, min(count, len(available)))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(selected, ensure_ascii=False).encode())
            return

        # --- /api/report-question ---
        if self.path == '/api/report-question':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            qid = data.get('qid', '')
            if qid:
                # 신고 카운트 증가
                if not hasattr(type(self), '_report_counts'):
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
                self.wfile.write(json.dumps({
                    'qid': qid, 'reportCount': count, 'disabled': disabled
                }).encode())
            else:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'qid required'}).encode())
            return

        # --- /api/claude (프록시) ---
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
                self.wfile.write(json.dumps({
                    'error': {'message': 'API 키가 설정되지 않았습니다'}
                }).encode())
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
            return

        # --- 404 ---
        self.send_response(404)
        self.end_headers()

    def log_message(self, format, *args):
        print(f"  {args[0]}")


if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), AppHandler)
    if SERVER_API_KEY:
        print(f"🔑 서버 API 키 설정됨 (학생 키 입력 불필요)")
        print(f"📊 일일 사용 제한: 인당 {DAILY_LIMIT}회")
    else:
        print(f"⚠️  서버 API 키 없음 (학생이 직접 키 입력 필요)")
    print(f"🖼️  이미지 디렉토리: {IMAGES_DIR}")
    print(f"🚀 Prof.AI 수능수학 기출문제 서버 시작: http://localhost:{PORT}")
    print(f"   종료: Ctrl+C")
    server.serve_forever()
