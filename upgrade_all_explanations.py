#!/usr/bin/env python3
"""모든 문제의 해설을 상세 업그레이드 (핵심개념 + 풀이 + 오답분석)
사용법: python3 upgrade_all_explanations.py <questions.js 경로> <progress 파일명>
"""
import json, os, sys, time, re
import urllib.request, ssl

API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
API_URL = "https://api.anthropic.com/v1/messages"
MODEL = "claude-haiku-4-5-20251001"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
sys.stdout = open(sys.stdout.fileno(), 'w', buffering=1)

QUESTIONS_FILE = sys.argv[1]
PROGRESS_FILE = sys.argv[2]
APP_NAME = sys.argv[3] if len(sys.argv) > 3 else ''

def call_api(prompt, retries=3):
    body = json.dumps({
        "model": MODEL, "max_tokens": 2000,
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

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_progress(progress):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, ensure_ascii=False)

def main():
    with open(QUESTIONS_FILE, 'r') as f:
        c = f.read()
    questions = json.loads(c[c.find('['):c.rfind(']')+1])
    progress = load_progress()

    remaining = [(i, q) for i, q in enumerate(questions) if q.get('_qid','') not in progress]
    done = len(questions) - len(remaining)
    total = len(questions)
    print(f"[{APP_NAME}] 전체 {total}문제 | 완료 {done} | 남은 {len(remaining)}")

    if not remaining:
        print(f"[{APP_NAME}] ✅ 모든 해설 업그레이드 완료!")
        apply_progress(questions, progress)
        return

    success = 0
    fail = 0
    start_time = time.time()

    for idx, (qi, q) in enumerate(remaining):
        num = done + idx + 1
        qid = q.get('_qid', f'Q-{qi}')

        choices_text = ''
        if q.get('choices'):
            choices_text = '\n'.join(q['choices'])
        elif q.get('answerType') == 'choice':
            choices_text = '① ② ③ ④ ⑤ (선지 내용은 문제 본문에 포함)'

        if q.get('answerType') == 'choice':
            ans = q.get('answer', 0)
            if isinstance(ans, int) and 0 <= ans <= 4:
                answer_text = '①②③④⑤'[ans]
            else:
                answer_text = str(ans)
        else:
            answer_text = str(q.get('answer', ''))

        problem_text = q.get('problem', q.get('passage', ''))[:600]

        prompt = f"""아래 수능 수학 문제의 해설을 상세하게 작성해주세요.

[문제]
{problem_text}

[선택지]
{choices_text}

[정답]
{answer_text}

아래 형식으로 해설을 작성하세요. 다른 텍스트 없이 해설만 출력:

**[핵심 개념]**
이 문제에 필요한 기초 개념과 공식을 먼저 설명

**[풀이]**
단계별로 상세한 풀이 (KaTeX 수식 $...$ 사용)

**[정답 확인]**
정답이 맞는 이유 한 줄 정리

**[오답 분석]**
각 오답 선지가 왜 틀린지 간단히 설명 (객관식인 경우)

**[핵심 포인트]**
이 문제에서 기억할 핵심 1~2줄"""

        try:
            text = call_api(prompt)
            if text and len(text) > 100:
                progress[qid] = text.strip()
                success += 1
                elapsed = time.time() - start_time
                rate = (idx + 1) / elapsed * 60 if elapsed > 0 else 0
                eta = (len(remaining) - idx - 1) / (rate / 60) if rate > 0 else 0
                print(f"  ✅ [{num}/{total}] {qid} | {len(text)}자 | {rate:.0f}/분 | ETA:{eta/60:.0f}분")
            else:
                fail += 1
                print(f"  ❌ [{num}/{total}] {qid} | 짧음")
        except Exception as e:
            fail += 1
            print(f"  ❌ [{num}/{total}] {qid} | {e}")

        if (idx + 1) % 50 == 0:
            save_progress(progress)
            print(f"  💾 [{APP_NAME}] 저장 ({len(progress)}/{total})")

        time.sleep(1.5)

    save_progress(progress)
    print(f"\n[{APP_NAME}] 📊 성공 {success} | 실패 {fail} | 총 {len(progress)}/{total}")
    apply_progress(questions, progress)

def apply_progress(questions, progress):
    applied = 0
    for q in questions:
        qid = q.get('_qid', '')
        if qid in progress:
            q['explanation'] = progress[qid]
            applied += 1
    js = 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_FILE, 'w') as f:
        f.write(js)
    print(f"[{APP_NAME}] ✅ questions.js 업데이트: {applied}문제 해설 업그레이드")

if __name__ == '__main__':
    main()
