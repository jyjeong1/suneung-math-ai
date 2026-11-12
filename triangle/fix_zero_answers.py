#!/usr/bin/env python3
"""answer=0인 삼각함수 문제 — 해설에서 정답 추출 또는 직접 계산으로 채움"""
import json, re, subprocess
from fractions import Fraction
import math

QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/triangle/questions.js"

CIRCLE = {'①':1,'②':2,'③':3,'④':4,'⑤':5}

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout), raw

def extract_expl_answer(expl):
    """해설 ∴ 답: 에서 선지 번호 추출"""
    if not expl: return None
    m = re.search(r'∴\s*답[:：]\s*([①②③④⑤])', expl)
    if m: return CIRCLE[m.group(1)]
    # ∴ 답: ② ... 형태
    m2 = re.search(r'∴\s*답[:：][^①②③④⑤\n]*([①②③④⑤])', expl)
    if m2: return CIRCLE[m2.group(1)]
    return None

def norm_choice(s):
    """선지 LaTeX → 비교용 정규화"""
    s = re.sub(r'\\(?:dfrac|frac)\{([^}]+)\}\{([^}]+)\}', lambda m: str(Fraction(m.group(1).strip(), m.group(2).strip()) if m.group(1).strip().lstrip('-').isdigit() and m.group(2).strip().isdigit() else f'{m.group(1)}/{m.group(2)}'), s)
    s = re.sub(r'[\$\s\\{},]', '', s)
    return s.lower()

def find_choice_matching(choices, target_str):
    """target_str과 일치하는 선지 번호 반환"""
    t = re.sub(r'[\$\s\\{},]', '', target_str).lower()
    for i, c in enumerate(choices, 1):
        cn = re.sub(r'[\$\s\\{},]', '', c).lower()
        if t in cn or cn in t:
            return i
    return None

def main():
    questions, raw_js = load_questions(QUESTIONS_JS)
    qid_map = {q['_qid']: i for i, q in enumerate(questions)}

    zero_choice = [q for q in questions
                   if q.get('answerType') == 'choice' and q.get('answer') == 0]
    print(f"answer=0 객관식: {len(zero_choice)}개")

    fixed, failed = [], []

    for q in zero_choice:
        qid    = q['_qid']
        expl   = q.get('explanation', '')
        choices = q.get('choices') or []

        # 1. 해설 ∴ 답: 에서 추출
        ans = extract_expl_answer(expl)
        if ans:
            questions[qid_map[qid]]['answer'] = ans
            fixed.append(f"  {qid}: 해설→{ans}")
            continue

        # 2. 해설 마지막 줄의 원문자 번호 탐색
        last_lines = expl[-300:]
        m = re.search(r'([①②③④⑤])\s*[\$\\]', last_lines)
        if m:
            ans = CIRCLE[m.group(1)]
            questions[qid_map[qid]]['answer'] = ans
            fixed.append(f"  {qid}: 후반추출→{ans}")
            continue

        # 3. "답: N번" 또는 "정답: ①" 패턴
        m2 = re.search(r'(?:정답|답)[\s:：]+([①②③④⑤])', expl)
        if m2:
            ans = CIRCLE[m2.group(1)]
            questions[qid_map[qid]]['answer'] = ans
            fixed.append(f"  {qid}: 정답패턴→{ans}")
            continue

        failed.append(qid)

    print(f"\n수정 완료: {len(fixed)}개")
    for line in fixed:
        print(line)
    print(f"\n여전히 answer=0: {len(failed)}개")
    for qid in failed:
        q = questions[qid_map[qid]]
        print(f"  {qid} [{q.get('type')}] {q.get('problem','')[:50]}")

    # 저장
    header_m = re.match(r'(// .*?\n)', raw_js)
    header = header_m.group(1) if header_m else ''
    new_js = header + 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(f"\n✅ 저장 완료")

if __name__ == '__main__':
    main()
