#!/usr/bin/env python3
"""삼각함수 검토보고서 → questions.js 반영"""
import json, re, subprocess

REVIEW_HTML  = "/Users/prof.juyoungjeong/Downloads/ProfAI_삼각함수_218문항_검토보고서.html"
QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/triangle/questions.js"

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout), raw

def norm_text(s):
    """문제 텍스트 정규화 (매칭용)"""
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def parse_review(path):
    with open(path, encoding='utf-8') as f: html = f.read()

    sections = re.findall(r'<section[^>]+id="q\d+"[^>]*>([\s\S]*?)</section>', html)
    print(f"섹션 수: {len(sections)}")

    items = []
    for sec in sections:
        # 문제 텍스트
        prob_m = re.search(r'<div class="p">([\s\S]*?)</div>', sec)
        prob_text = norm_text(prob_m.group(1)) if prob_m else ''

        # small: "동일 표현 선지: [N]" 추출
        small_m = re.search(r'<small>([\s\S]*?)</small>', sec)
        small_txt = norm_text(small_m.group(1)) if small_m else ''

        correct_ans = None
        m = re.search(r'동일 표현 선지:\s*\[(\d)\]', small_txt)
        if m:
            correct_ans = int(m.group(1))

        # 현재 표시 정답
        cur_m = re.search(r'초록 정답:\s*\[(\d)\]', small_txt)
        cur_ans = int(cur_m.group(1)) if cur_m else None

        # issue
        issue_m = re.search(r'<p class="issue">([\s\S]*?)</p>', sec)
        issue = norm_text(issue_m.group(1)) if issue_m else ''

        # 중복 그룹 번호
        dup_m = re.search(r'원문 완전 중복:\s*([\d,]+)', issue)
        dup_group = dup_m.group(1) if dup_m else None

        # verified 메모
        ver_m = re.search(r'<p class="verified">([\s\S]*?)</p>', sec)
        verified = norm_text(ver_m.group(1)) if ver_m else ''

        items.append({
            'prob': prob_text,
            'correct_ans': correct_ans,
            'cur_ans': cur_ans,
            'issue': issue,
            'dup_group': dup_group,
            'verified': verified,
        })
    return items

def match_questions(items, questions):
    """문제 텍스트로 review item → T-XXXX 매칭"""
    def norm_q(s):
        s = re.sub(r'\s+', ' ', s).strip()
        return s

    q_texts = [(q['_qid'], norm_q(q.get('problem',''))) for q in questions]

    matched = []
    unmatched = []
    for item in items:
        prob = item['prob']
        best_qid = None
        best_score = 0
        # 앞 60자로 빠른 매칭
        probe = prob[:60]
        for qid, qt in q_texts:
            if probe and probe in qt:
                score = len(probe)
                if score > best_score:
                    best_score = score
                    best_qid = qid
        if best_qid is None:
            # 더 짧게 재시도
            for n in [40, 25]:
                probe2 = prob[:n]
                for qid, qt in q_texts:
                    if probe2 and probe2 in qt:
                        best_qid = qid
                        break
                if best_qid:
                    break
        if best_qid:
            matched.append({**item, 'qid': best_qid})
        else:
            unmatched.append(item)
    return matched, unmatched

def main():
    print("questions.js 로드 중...")
    questions, raw_js = load_questions(QUESTIONS_JS)
    qid_map = {q['_qid']: i for i, q in enumerate(questions)}
    print(f"  → {len(questions)}문제")

    print("검토보고서 파싱 중...")
    items = parse_review(REVIEW_HTML)

    print("매칭 중...")
    matched, unmatched = match_questions(items, questions)
    print(f"  → 매칭 성공: {len(matched)}, 실패: {len(unmatched)}")

    # 중복 문항 처리: 각 중복 그룹에서 첫 번째만 남기고 나머지 삭제
    dup_groups = {}
    for item in matched:
        if item['dup_group']:
            g = item['dup_group']
            if g not in dup_groups:
                dup_groups[g] = []
            dup_groups[g].append(item['qid'])

    to_delete = set()
    for g, qids in dup_groups.items():
        # 첫 번째만 유지
        for qid in qids[1:]:
            to_delete.add(qid)

    print(f"\n중복 삭제 대상: {len(to_delete)}개")
    for qid in sorted(to_delete):
        print(f"  {qid}")

    # 정답 수정
    applied, skipped = [], []
    for item in matched:
        qid = item['qid']
        if qid in to_delete:
            continue
        correct = item['correct_ans']
        cur     = item['cur_ans']
        if correct is None:
            skipped.append(f"{qid}: 동일표현선지 없음 ({item['issue'][:50]})")
            continue
        if correct == cur:
            continue  # 이미 정상
        idx = qid_map.get(qid)
        if idx is None:
            continue
        old = questions[idx]['answer']
        questions[idx]['answer'] = correct
        applied.append(f"  {qid}: {old} → {correct}")

    print(f"\n정답 수정 ({len(applied)}개):")
    for line in applied:
        print(line)

    if skipped:
        print(f"\n수동 확인 필요 ({len(skipped)}개):")
        for s in skipped[:10]:
            print(f"  {s}")

    # 중복 삭제
    before = len(questions)
    questions = [q for q in questions if q['_qid'] not in to_delete]
    print(f"\n삭제: {before} → {len(questions)}문제")

    # 저장
    header_m = re.match(r'(// .*?\n)', raw_js)
    header = header_m.group(1) if header_m else ''
    header = re.sub(r'\d+문제', f'{len(questions)}문제', header)
    new_js = header + 'const QUESTION_BANK = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n'
    with open(QUESTIONS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(f"\n✅ questions.js 저장 완료 ({len(questions)}문제)")

if __name__ == '__main__':
    main()
