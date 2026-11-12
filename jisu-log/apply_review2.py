#!/usr/bin/env python3
"""101~264번 검토 결과를 questions.js에 반영"""
import json, re, subprocess

REVIEW_HTML  = "/Users/prof.juyoungjeong/Downloads/ProfAI_exponents_logs_101_264_review.html"
QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/jisu-log/questions.js"

CIRCLE = {'①':1,'②':2,'③':3,'④':4,'⑤':5}

# ── HTML 파싱 ─────────────────────────────────────────────────────
def parse_review(path):
    with open(path, encoding='utf-8') as f:
        html = f.read()

    rows = re.findall(r'<tr id="q\d+">(.*?)</tr>', html, re.S)
    corrections = {}   # qid -> int (1-indexed)
    warn_no_ans  = []  # 정답표시 누락 warn (answer=0 → 1)
    skip_dup     = []  # 중복 문항
    need_manual  = []  # 선지 재구성 필요

    for row in rows:
        td_parts = re.findall(r'<td([^>]*)>(.*?)</td>', row, re.S)
        if len(td_parts) < 5:
            continue

        status_attrs = td_parts[4][0]
        cls_m = re.search(r'class="(\w+)"', status_attrs)
        status_cls = cls_m.group(1) if cls_m else ''

        qid_m = re.search(r'R-\d+', td_parts[0][1])
        if not qid_m:
            continue
        qid = qid_m.group()

        ans_raw  = re.sub(r'<[^>]+>', '', td_parts[3][1]).strip()
        action   = re.sub(r'<[^>]+>', '', td_parts[5][1]).strip() if len(td_parts) > 5 else ''

        if status_cls == 'ok':
            continue

        if status_cls == 'warn':
            # 중복 문항
            if '중복' in action:
                skip_dup.append(qid)
                continue
            # 나머지 warn = 정답표시 누락 → 정답은 ① (ans_raw가 "① ...")
            first = ans_raw[0] if ans_raw else ''
            if first in CIRCLE:
                corrections[qid] = CIRCLE[first]
            continue

        if status_cls == 'bad':
            first = ans_raw[0] if ans_raw else ''
            if first in CIRCLE:
                corrections[qid] = CIRCLE[first]
            continue

    return corrections, skip_dup

# ── questions.js 로드 ─────────────────────────────────────────────
def load_questions(path):
    with open(path, encoding='utf-8') as f:
        raw = f.read()
    r = subprocess.run(
        ['node', '-e', raw + '\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
        capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout), raw

# ── 특수 케이스 처리 ──────────────────────────────────────────────
def fix_special(qs_map):
    """R-0117, R-0152, R-0208, R-0226, R-0228 직접 수정"""
    fixes = []

    # R-0117: ①∛8과 ②2가 동치 → ①을 오답으로 교체
    if 'R-0117' in qs_map:
        q = qs_map['R-0117']
        if q.get('choices'):
            q['choices'][0] = r'$\sqrt[3]{6}$'   # ∛6 ≠ 2
            q['answer'] = 2
            fixes.append('R-0117: ①→∛6(오답), answer=2')

    # R-0152: ②2와 ⑤log₃9가 동치 → ⑤를 오답으로 교체
    if 'R-0152' in qs_map:
        q = qs_map['R-0152']
        if q.get('choices') and len(q['choices']) >= 5:
            q['choices'][4] = r'$\log_3 27$'   # log₃27=3 ≠ 2
            fixes.append('R-0152: ⑤→log₃27(오답)')

    # R-0226: 답 ②(1/2)이 맞음, 해설이 ④로 잘못 바꿈
    if 'R-0226' in qs_map:
        qs_map['R-0226']['answer'] = 2
        fixes.append('R-0226: answer 4→2')

    # R-0228: 답 ④(5/3)이 맞음, 해설이 ②로 잘못 바꿈
    if 'R-0228' in qs_map:
        qs_map['R-0228']['answer'] = 4
        fixes.append('R-0228: answer 2→4')

    # R-0208: 분모가 ⁵√4인데 해설이 ⁸√4로 왜곡 → 문제/해설/선지 일괄 수정
    if 'R-0208' in qs_map:
        q = qs_map['R-0208']
        # 올바른 계산: ∜(2^3) / ⁵√4 = 2^(3/4) / 2^(2/5) = 2^(15/20 - 8/20) = 2^(7/20) = ²⁰√(2^7)
        q['problem'] = (
            r'$\dfrac{\sqrt[4]{2^3}}{\sqrt[5]{4}}$의 값은?'
        )
        q['choices'] = [
            r'$\sqrt[20]{2^3}$',
            r'$\sqrt[20]{2^7}$',
            r'$\sqrt[20]{2^{11}}$',
            r'$\sqrt[20]{2^{13}}$',
            r'$\sqrt[20]{2^{17}}$',
        ]
        q['answer'] = 2   # ② 2^(7/20)
        q['explanation'] = (
            "**[풀이]**\n\n"
            "**기본 개념:** 근호를 지수로 변환 후 지수법칙 적용.\n\n"
            "**Step 1.** 각 항을 지수로 표현합니다.\n"
            r"$\sqrt[4]{2^3} = 2^{3/4}$, $\quad \sqrt[5]{4} = \sqrt[5]{2^2} = 2^{2/5}$" + "\n\n"
            "**Step 2.** 나눗셈 → 지수 뺄셈.\n"
            r"$2^{3/4} \div 2^{2/5} = 2^{3/4 - 2/5} = 2^{15/20 - 8/20} = 2^{7/20}$" + "\n\n"
            r"**Step 3.** $2^{7/20} = \sqrt[20]{2^7}$" + "\n\n"
            "**∴ 답: ② $\\sqrt[20]{2^7}$**"
        )
        fixes.append('R-0208: 문제·선지·해설 전면 수정 (2^(7/20))')

    return fixes

# ── 메인 ─────────────────────────────────────────────────────────
def main():
    print("검토 보고서 파싱 중...")
    corrections, skip_dup = parse_review(REVIEW_HTML)
    print(f"  → 정답 수정: {len(corrections)}개")
    print(f"  → 중복 문항: {skip_dup}")

    print("questions.js 로드 중...")
    questions, raw_js = load_questions(QUESTIONS_JS)
    qid_map  = {q['_qid']: i   for i, q in enumerate(questions)}
    qs_map   = {q['_qid']: q   for q in questions}

    # 일반 정답 수정
    applied, not_found = [], []
    for qid, new_ans in corrections.items():
        if qid not in qid_map:
            not_found.append(qid)
            continue
        old = questions[qid_map[qid]].get('answer')
        questions[qid_map[qid]]['answer'] = new_ans
        applied.append(f"  {qid}: {old} → {new_ans}")

    print(f"\n일반 정답 수정 ({len(applied)}개):")
    for line in applied:
        print(line)

    # 특수 케이스
    print("\n특수 케이스 처리:")
    special_fixes = fix_special(qs_map)
    for f in special_fixes:
        print(f"  ✓ {f}")

    if not_found:
        print(f"\n찾지 못한 QID: {not_found}")
    if skip_dup:
        print(f"\n⚠️  중복 문항 (수동 처리 권장): {skip_dup}")

    # 저장
    header_m = re.match(r'(// .*?\n)', raw_js)
    header = header_m.group(1) if header_m else ''
    new_js = header + 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(f"\n✅ questions.js 저장 완료")

if __name__ == '__main__':
    main()
