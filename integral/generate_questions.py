#!/usr/bin/env python3
"""적분법 문제 400개 배치 생성 (Claude API)"""
import json, os, sys, time, re
import urllib.request, ssl

API_KEY = os.environ.get("CLAUDE_API_KEY", "")
API_URL = "https://api.anthropic.com/v1/messages"
MODEL = "claude-haiku-4-5-20251001"
QUESTIONS_FILE = os.path.join(os.path.dirname(__file__), 'questions.js')
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), 'gen_progress.json')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
sys.stdout = open(sys.stdout.fileno(), 'w', buffering=1)

# 7유형 × 4난이도 × ~14문제 = 392 + 기출108 = 500문제
TYPES = [
    ('integral_basic', '적분 기본', '다항함수 적분, 상수배·합차 적분, 적분과 미분의 관계, 기본 계산'),
    ('indefinite', '부정적분', '부정적분, 거듭제곱 적분, 삼각/지수/로그함수 적분, 치환적분, 부분적분'),
    ('definite', '정적분', '정적분 계산, 정적분 성질, 우함수·기함수 적분, 구분구적법, 급수와 정적분'),
    ('area', '넓이', '곡선과 x축 사이 넓이, 두 곡선 사이 넓이, 1/6공식, y축 기준 넓이'),
    ('velocity_dist', '속도·거리', '속도→위치 적분, 이동거리 절대값 적분, 가속도→속도, 변위와 이동거리 비교'),
    ('integral_app', '정적분 활용', '정적분으로 정의된 함수, 정적분 방정식, 넓이 최솟값, 복합 활용'),
]

DIFFICULTIES = [
    ('lv1', '개념 확인', 'Lv.1 개념 확인. 공식을 직접 적용하는 가장 쉬운 문제. 조건 1개, 계산 1단계.'),
    ('lv2', '기초 적용', 'Lv.2 기초 적용. 개념을 한 단계 응용. 조건 1~2개, 계산 2단계.'),
    ('lv3', '수능 실전', 'Lv.3 수능 실전 수준. 여러 조건 결합, 2~3단계 추론 필요. 수능 기출과 유사한 난이도.'),
    ('lv4', '킬러', 'Lv.4 수능 킬러 수준. 창의적 접근, 비자명한 풀이, 여러 개념 융합. 수능 29~30번급.'),
]

# 유형별 목표 문제 수 (난이도별)
TARGET = {
    'integral_basic':  {'lv1': 10, 'lv2': 15, 'lv3': 12, 'lv4': 6},
    'indefinite':      {'lv1': 8, 'lv2': 15, 'lv3': 15, 'lv4': 8},
    'definite':        {'lv1': 8, 'lv2': 15, 'lv3': 15, 'lv4': 8},
    'area':            {'lv1': 8, 'lv2': 15, 'lv3': 15, 'lv4': 8},
    'velocity_dist':   {'lv1': 8, 'lv2': 15, 'lv3': 15, 'lv4': 8},
    'integral_app':    {'lv1': 6, 'lv2': 12, 'lv3': 15, 'lv4': 10},
}

def call_api(prompt, retries=3):
    body = json.dumps({
        "model": MODEL,
        "max_tokens": 1500,
        "messages": [{"role": "user", "content": prompt}]
    }).encode()

    req = urllib.request.Request(API_URL, data=body, method='POST')
    req.add_header('x-api-key', API_KEY)
    req.add_header('anthropic-version', '2023-06-01')
    req.add_header('content-type', 'application/json')

    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
                data = json.loads(resp.read().decode())
                return data['content'][0]['text']
        except Exception as e:
            if attempt < retries - 1:
                time.sleep((attempt + 1) * 3)
            else:
                raise

def generate_one(type_key, type_name, type_desc, diff_key, diff_name, diff_desc, qid):
    prompt = f"""한국 수능 수학 {type_name} 문제 1개. {diff_desc}
단원: {type_desc}

JSON만 출력:
{{"_type":"{type_key}","type":"{type_name}","problem":"문제 (KaTeX)","answerType":"choice","choices":["① ..","② ..","③ ..","④ ..","⑤ .."],"answer":0,"explanation":"풀이","difficulty":"{diff_key}"}}"""

    text = call_api(prompt)
    # ```json ... ``` 블록 제거
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    match = re.search(r'\{[\s\S]*\}', text)
    if not match:
        return None

    try:
        q = json.loads(match.group(0))
    except json.JSONDecodeError:
        # 중첩 JSON 문제 시 첫 번째 완전한 JSON만 추출
        brace = 0
        start = text.find('{')
        if start < 0:
            return None
        for i in range(start, len(text)):
            if text[i] == '{': brace += 1
            elif text[i] == '}': brace -= 1
            if brace == 0:
                try:
                    q = json.loads(text[start:i+1])
                    break
                except:
                    return None
        else:
            return None
    q['_qid'] = qid
    q['_type'] = type_key
    q['type'] = type_name
    q['difficulty'] = diff_key
    q['_reviewed'] = False
    q['_source'] = 'ai'

    # Validate
    if q.get('answerType') == 'choice':
        if not isinstance(q.get('answer'), int) or q['answer'] < 0 or q['answer'] > 4:
            return None
        if not q.get('choices') or len(q['choices']) != 5:
            return None
    else:
        if not isinstance(q.get('answer'), (int, float)):
            return None
        q['answer'] = int(q['answer'])

    if not q.get('problem') or not q.get('explanation'):
        return None

    return q

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_progress(questions):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(questions, f, ensure_ascii=False)

def main():
    generated = load_progress()
    existing_count = len(generated)

    # Count what we already have per type/difficulty
    done = {}
    for q in generated:
        key = f"{q['_type']}_{q['difficulty']}"
        done[key] = done.get(key, 0) + 1

    # Build task list
    tasks = []
    for type_key, type_name, type_desc in TYPES:
        for diff_key, diff_name, diff_desc in DIFFICULTIES:
            target = TARGET[type_key][diff_key]
            already = done.get(f"{type_key}_{diff_key}", 0)
            remaining = max(0, target - already)
            for _ in range(remaining):
                tasks.append((type_key, type_name, type_desc, diff_key, diff_name, diff_desc))

    total_target = sum(TARGET[t][d] for t, _, _ in TYPES for d, _, _ in DIFFICULTIES)
    print(f"📦 기존 생성: {existing_count}문제 | 남은 작업: {len(tasks)}문제 | 목표: {total_target}문제")

    if not tasks:
        print("✅ 모든 문제 생성 완료!")
        apply_to_questions(generated)
        return

    success = 0
    fail = 0
    start_time = time.time()
    qid_counter = existing_count + 1

    for idx, (type_key, type_name, type_desc, diff_key, diff_name, diff_desc) in enumerate(tasks):
        qid = f"A-{qid_counter:04d}"
        num = existing_count + idx + 1

        try:
            q = generate_one(type_key, type_name, type_desc, diff_key, diff_name, diff_desc, qid)
            if q:
                generated.append(q)
                qid_counter += 1
                success += 1
                elapsed = time.time() - start_time
                rate = (idx + 1) / elapsed * 60 if elapsed > 0 else 0
                eta = (len(tasks) - idx - 1) / (rate / 60) if rate > 0 else 0
                print(f"  ✅ [{num}] {qid} | {type_name} {diff_key} | {rate:.0f}/분 | ETA:{eta/60:.0f}분")
            else:
                fail += 1
                print(f"  ❌ [{num}] | {type_name} {diff_key} | 파싱 실패")
        except Exception as e:
            fail += 1
            print(f"  ❌ [{num}] | {type_name} {diff_key} | {e}")

        if (idx + 1) % 50 == 0:
            save_progress(generated)
            print(f"  💾 저장 ({len(generated)}문제)")

        time.sleep(1.5)

    save_progress(generated)
    print(f"\n📊 결과: 성공 {success} | 실패 {fail} | 총 {len(generated)}문제")
    apply_to_questions(generated)

def apply_to_questions(ai_questions):
    """기출 + AI 생성 문제를 합쳐서 questions.js 저장"""
    with open(QUESTIONS_FILE, 'r') as f:
        c = f.read()
    existing = json.loads(c[c.find('['):c.rfind(']')+1])

    # 기출문제만 유지 (T-로 시작하는 것)
    past_exam = [q for q in existing if q['_qid'].startswith('I-')]

    # 합치기
    all_questions = past_exam + ai_questions

    js = 'const QUESTION_BANK = ' + json.dumps(all_questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_FILE, 'w') as f:
        f.write(js)
    print(f"✅ questions.js: 기출 {len(past_exam)} + AI {len(ai_questions)} = {len(all_questions)}문제")

if __name__ == '__main__':
    main()
