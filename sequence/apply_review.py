#!/usr/bin/env python3
"""수열 351문항 검증보고서 → questions.js 반영"""
import json, re, subprocess

REVIEW_HTML  = "/Users/prof.juyoungjeong/Downloads/ProfAI_수열_351문항_전체검증보고서.html"
QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/sequence/questions.js"

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout), raw

def esc(s): return re.sub(r'<[^>]+>','',s).strip()

def parse_review(path):
    with open(path, encoding='utf-8') as f: html = f.read()
    rows = re.findall(r'<tr[^>]*><td>(\d+)</td><td>(R-\d+)</td><td[^>]*>(.*?)</td><td>(.*?)</td><td[^>]*>(.*?)</td></tr>', html, re.S)
    print(f"보고서 행 수: {len(rows)}")

    fix_ans  = {}   # qid -> int (정답 수정)
    to_delete = set()  # 삭제

    DELETE_KINDS = {
        '정답/선택지 오류','해 없음','조건 모순','발산','정의 불능',
        '복수 정답 보기','복수 정답','중복 정답 보기','성립 불가 항등식',
        '최댓값 없음','조건 불충분','경계 조건 오류','정답 불완전',
        '문항/선택지 불일치',
    }

    for r in rows:
        num, qid, prob, kind, advice = r
        kind_txt = esc(kind)
        adv_txt  = esc(advice)

        # 1. 초록표시/해설 불일치 → 풀이 정답번호 사용
        if kind_txt == '초록 표시/해설 번호 불일치':
            m = re.search(r'풀이\s*정답번호\s*(\d)번', adv_txt)
            if m:
                fix_ans[qid] = int(m.group(1))
            continue

        # 2. 정답 오류 / 계산 오류 / 해설 정답 오류 → advice에서 번호 추출
        if kind_txt in ('정답 오류','정답 계산 오류','해설 정답 오류','수학적 문제 확인'):
            # (④) 또는 ④로 수정 패턴
            m = re.search(r'\(([①②③④⑤])\)', adv_txt)
            if not m:
                m = re.search(r'([①②③④⑤])(?:\s*(?:가|이)\s*(?:맞|정답|옳))', adv_txt)
            if not m:
                m = re.search(r'선택지\s*([①②③④⑤])', adv_txt)
            if m:
                CIRCLE={'①':1,'②':2,'③':3,'④':4,'⑤':5}
                c = re.search(r'[①②③④⑤]', m.group())
                if c:
                    fix_ans[qid] = CIRCLE[c.group()]
            continue

        # 3. 삭제 대상
        if kind_txt in DELETE_KINDS:
            to_delete.add(qid)

    return fix_ans, to_delete

def main():
    print("questions.js 로드 중...")
    questions, raw_js = load_questions(QUESTIONS_JS)
    qid_map = {q['_qid']: i for i, q in enumerate(questions)}
    print(f"  → {len(questions)}문제")

    fix_ans, to_delete = parse_review(REVIEW_HTML)
    print(f"\n정답 수정: {len(fix_ans)}개")
    print(f"삭제 대상: {len(to_delete)}개")

    # 정답 수정 적용
    applied = []
    for qid, new_ans in fix_ans.items():
        if qid not in qid_map: continue
        old = questions[qid_map[qid]].get('answer')
        questions[qid_map[qid]]['answer'] = new_ans
        applied.append(f"  {qid}: {old}→{new_ans}")

    print(f"\n적용된 정답 수정 ({len(applied)}개):")
    for line in applied: print(line)

    # 추가: 해설 ∴ 답 vs answer 불일치도 수정
    CIRCLE={'①':1,'②':2,'③':3,'④':4,'⑤':5}
    extra = 0
    for q in questions:
        if q.get('answerType') != 'choice': continue
        if q['_qid'] in to_delete: continue
        expl = q.get('explanation','')
        m = re.search(r'∴\s*답[:：]\s*([①②③④⑤])', expl)
        if m:
            ea = CIRCLE[m.group(1)]
            if ea != q.get('answer'):
                questions[qid_map[q['_qid']]]['answer'] = ea
                extra += 1
    print(f"\n해설 ∴답 불일치 추가 수정: {extra}개")

    # 삭제
    before = len(questions)
    questions = [q for q in questions if q['_qid'] not in to_delete]
    print(f"\n삭제: {before} → {len(questions)}문제 ({before-len(questions)}개 제거)")

    # 저장
    header_m = re.match(r'(// .*?\n)', raw_js)
    header = header_m.group(1) if header_m else ''
    header = re.sub(r'\d+문제', f'{len(questions)}문제', header)
    new_js = header + 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(f"\n✅ 저장 완료 ({len(questions)}문제)")

if __name__ == '__main__':
    main()
