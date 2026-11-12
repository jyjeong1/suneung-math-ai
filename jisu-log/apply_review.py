#!/usr/bin/env python3
"""first100_review.html 검토 결과를 questions.js에 반영"""
import json, re, subprocess
from html.parser import HTMLParser

REVIEW_HTML = "/Users/prof.juyoungjeong/Downloads/first100_review.html"
QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/jisu-log/questions.js"

# 한국어 원문자 → 정수
CIRCLE = {'①':1,'②':2,'③':3,'④':4,'⑤':5}

def parse_review(path):
    """HTML 테이블에서 (qid, correct_answer, status) 추출"""
    with open(path, encoding='utf-8') as f:
        html = f.read()

    # <tr> 단위로 파싱
    rows = re.findall(r'<tr>(.*?)</tr>', html, re.S)
    corrections = {}  # qid -> new answer (int, 1-indexed) or None if skip
    skipped = []

    for row in rows:
        tds = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)
        if len(tds) < 6:
            continue

        # QID 추출
        qid_m = re.search(r'(R-\d+)', tds[1])
        if not qid_m:
            continue
        qid = qid_m.group(1)

        # 판정 추출
        status_m = re.search(r'class="(\w+)">(.*?)</span>', tds[4]) or re.search(r'>(.*?)<', tds[4])
        raw_class = re.search(r'class="(\w+)"', tds[4])
        status_cls = raw_class.group(1) if raw_class else ''
        status_text = re.sub(r'<[^>]+>', '', tds[4]).strip()

        if status_cls == 'ok':
            continue  # 정상 → 건드리지 않음

        if status_cls == 'warn':
            skipped.append(qid)
            continue  # 복수정답 → 별도 처리 필요

        # 정답 열 파싱 (tds[3])
        raw_ans = re.sub(r'<[^>]+>', '', tds[3]).strip()
        # 원문자로 시작하면 선택지 번호
        first_char = raw_ans[0] if raw_ans else ''
        if first_char in CIRCLE:
            new_ans = CIRCLE[first_char]
            corrections[qid] = new_ans
        else:
            # 주관식 — answer는 숫자/문자열, 현재는 오류 없음(ok만 있음)
            # 만약 bad/누락이어도 주관식은 answer 값이 이미 맞으므로 skip
            pass

    return corrections, skipped

def load_questions(path):
    with open(path, encoding='utf-8') as f:
        raw = f.read()
    result = subprocess.run(
        ['node', '-e', raw + '\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
        capture_output=True, text=True, timeout=15)
    return json.loads(result.stdout), raw

def main():
    print("검토 보고서 파싱 중...")
    corrections, skipped = parse_review(REVIEW_HTML)
    print(f"  → 수정 대상: {len(corrections)}개")
    print(f"  → 복수정답(건너뜀): {skipped}")

    print("questions.js 로드 중...")
    questions, raw_js = load_questions(QUESTIONS_JS)

    # qid → index 매핑
    qid_map = {q['_qid']: i for i, q in enumerate(questions)}

    applied = []
    not_found = []
    for qid, new_ans in corrections.items():
        if qid not in qid_map:
            not_found.append(qid)
            continue
        idx = qid_map[qid]
        old_ans = questions[idx].get('answer')
        questions[idx]['answer'] = new_ans
        applied.append(f"  {qid}: {old_ans} → {new_ans}")

    print(f"\n적용된 수정 ({len(applied)}개):")
    for line in applied:
        print(line)

    if not_found:
        print(f"\n찾지 못한 QID: {not_found}")

    # questions.js 재작성
    header_m = re.match(r'(// .*?\n)', raw_js)
    header = header_m.group(1) if header_m else ''
    # 문제 수 업데이트
    header = re.sub(r'\d+문제', f'{len(questions)}문제', header)
    new_js = header + 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'

    with open(QUESTIONS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)

    print(f"\n✅ questions.js 저장 완료 ({len(applied)}개 수정)")
    print(f"\n⚠️  복수정답 선지 오류 (수동 수정 필요):")
    for qid in skipped:
        print(f"  {qid}")

if __name__ == '__main__':
    main()
