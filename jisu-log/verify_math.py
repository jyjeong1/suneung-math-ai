#!/usr/bin/env python3
"""sympy 기반 수식 직접 계산 검증"""
import json, subprocess, datetime
import re as _re
from sympy import *
from sympy.parsing.latex import parse_latex
re = _re

QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/jisu-log/questions.js"
OUT_HTML     = "/Users/prof.juyoungjeong/Downloads/jisu_log_mathverify_report.html"

CIRCLE_KO  = {1:'①',2:'②',3:'③',4:'④',5:'⑤'}

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout)

def clean_latex(s):
    """LaTeX → sympy 파싱 가능 형태로 정제"""
    s = s.strip().strip('$').strip()
    s = re.sub(r'\\dfrac', r'\\frac', s)
    s = re.sub(r'\\left|\\right', '', s)
    s = re.sub(r'\\cdot', '*', s)
    s = re.sub(r'\\times', '*', s)
    s = re.sub(r'\\div', '/', s)
    return s

def try_parse(latex_str):
    """LaTeX 수식 → sympy expr. 실패시 None"""
    try:
        expr = parse_latex(clean_latex(latex_str))
        return expr
    except:
        return None

def eval_choice(latex_str):
    """선지 하나를 수치로 평가"""
    expr = try_parse(latex_str)
    if expr is None:
        return None
    try:
        val = simplify(expr)
        return val
    except:
        return None

def find_matching_choice(computed_val, choices):
    """computed_val과 일치하는 선지 번호(1-indexed) 반환"""
    if computed_val is None:
        return None
    for i, c in enumerate(choices, 1):
        cv = eval_choice(c)
        if cv is None:
            continue
        try:
            if simplify(computed_val - cv) == 0:
                return i
        except:
            pass
    return None

# ── 단순 계산 문제 패턴 ───────────────────────────────────────────
# 패턴: "X의 값은?" 또는 "X를 구하시오" → X를 계산
PATTERNS = [
    # 지수/로그 직접 계산
    (r'^\$(.+?)\$의 값(?:은|을 구하시오)', 'direct'),
    (r'^\$(.+?)\$을 간단히 하면', 'direct'),
    (r'^\$(.+?)\$의 값을 구하시오', 'direct'),
]

def try_verify_question(q):
    """
    단순 계산 문제를 sympy로 검증.
    반환: ('ok'|'bad'|'skip', computed, note)
    """
    prob    = q.get('problem', '').strip()
    atype   = q.get('answerType', 'choice')
    choices = q.get('choices') or []
    ans     = q.get('answer')

    # 조건/서술형 등 복잡한 문제 건너뜀
    skip_keywords = ['일 때', '이면', '이고', '에 대하여', '함수', '그래프',
                     '방정식', '부등식', '몇 자리', '범위', '치역', '정의역',
                     '점근선', '이동', '교점', '최대', '최솟값', '역함수',
                     'log 2 =', '자릿수', '배', '지나는', '만족', '성립']
    if any(kw in prob for kw in skip_keywords):
        return 'skip', None, '복잡한 문제(건너뜀)'

    # 문제에서 계산식 추출
    for pat, mode in PATTERNS:
        m = re.search(pat, prob, re.S)
        if m:
            expr_str = m.group(1)
            expr = try_parse(expr_str)
            if expr is None:
                return 'skip', None, 'LaTeX 파싱 실패'
            try:
                computed = simplify(expr)
                computed_n = float(computed.evalf()) if computed.is_number else None
            except:
                return 'skip', None, '계산 실패'

            if atype == 'short':
                try:
                    expected = float(str(ans).replace('−','-'))
                    if computed_n is not None and abs(computed_n - expected) < 1e-6:
                        return 'ok', computed, f'계산={computed}'
                    elif computed_n is not None:
                        return 'bad', computed, f'계산={computed} ≠ answer={ans}'
                except:
                    return 'skip', None, '단답 비교 실패'

            elif atype == 'choice' and choices:
                matched = find_matching_choice(computed, choices)
                if matched is None:
                    return 'skip', computed, f'선지매칭 실패(계산={computed})'
                if matched == ans:
                    return 'ok', computed, f'계산={computed} → {CIRCLE_KO.get(matched)}'
                else:
                    return 'bad', computed, f'계산={computed} → {CIRCLE_KO.get(matched,"?")} ≠ answer:{CIRCLE_KO.get(ans,"?")}'

    return 'skip', None, '패턴 없음'

def build_html(all_results):
    bad   = [r for r in all_results if r['mstatus']=='bad']
    ok    = [r for r in all_results if r['mstatus']=='ok']
    skip  = [r for r in all_results if r['mstatus']=='skip']

    def esc(s): return str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

    rows = ''
    for r in sorted(all_results, key=lambda x: (x['mstatus']!='bad', x['mstatus']!='ok', x['qid'])):
        cls = {'bad':'bad','ok':'ok','skip':'skip_cls'}.get(r['mstatus'],'skip_cls')
        label = {'bad':'🔴 불일치','ok':'🟢 일치','skip':'⚪ 건너뜀'}.get(r['mstatus'],'⚪')
        rows += (
            f'<tr>'
            f'<td><code>{esc(r["qid"])}</code></td>'
            f'<td>{esc(r["qtype"])}<br><small>{esc(r["lv"])}</small></td>'
            f'<td>{esc(r["prob"][:90])}</td>'
            f'<td class="{cls}">{label}</td>'
            f'<td>{esc(r["note"])}</td>'
            f'</tr>\n'
        )

    today = datetime.date.today().isoformat()
    return f'''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>지수와 로그 수식검증 보고서 ({today})</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{{delimiters:[{{left:'$$',right:'$$',display:true}},{{left:'$',right:'$',display:false}}],throwOnError:false}});"></script>
<style>
body{{font-family:system-ui,'Noto Sans KR',sans-serif;background:#f5f7fb;color:#192538;max-width:1200px;margin:25px auto;padding:0 20px}}
h1{{color:#173b62}} table{{width:100%;border-collapse:collapse;font-size:12.5px;background:white}}
th,td{{border:1px solid #d9e1ec;padding:8px;vertical-align:top}}
th{{background:#173b62;color:#fff;position:sticky;top:0}}
tr:nth-child(2n){{background:#f3f8fd}}
.bad{{color:#b91c1c;font-weight:700}} .ok{{color:#0f766e}} .skip_cls{{color:#94a3b8}}
.stat{{display:inline-block;padding:8px 16px;border-radius:8px;margin:5px;font-weight:700}}
.s-bad{{background:#fee2e2;color:#b91c1c}} .s-ok{{background:#d1fae5;color:#065f46}}
.s-skip{{background:#f1f5f9;color:#64748b}}
code{{font-size:11px}}
</style></head><body>
<h1>🔬 지수와 로그 — sympy 수식 직접 계산 검증</h1>
<p>검증일: {today} · 단순 계산식 문제를 sympy로 직접 계산 후 answer 필드와 비교</p>
<div>
  <span class="stat s-bad">🔴 불일치 {len(bad)}</span>
  <span class="stat s-ok">🟢 일치 {len(ok)}</span>
  <span class="stat s-skip">⚪ 건너뜀(복잡) {len(skip)}</span>
</div>
<table style="margin-top:16px"><thead><tr>
  <th>QID</th><th>유형/난이도</th><th>문제</th><th>판정</th><th>비고</th>
</tr></thead><tbody>{rows}</tbody></table>
<p style="font-size:12px;color:#888;margin-top:16px">
  "건너뜀"은 조건부/함수/그래프/서술형 등 자동계산 불가 문제입니다.
</p>
</body></html>'''

def main():
    print("questions.js 로드 중...")
    questions = load_questions(QUESTIONS_JS)
    print(f"  → {len(questions)}문제")

    all_results = []
    bad_count = 0
    for q in questions:
        mstatus, computed, note = try_verify_question(q)
        all_results.append({
            'qid': q['_qid'], 'qtype': q.get('type',''), 'lv': q.get('difficulty',''),
            'prob': q.get('problem','')[:90], 'mstatus': mstatus, 'note': note,
        })
        if mstatus == 'bad':
            bad_count += 1
            print(f"  🔴 {q['_qid']}: {note}")

    ok   = sum(1 for r in all_results if r['mstatus']=='ok')
    skip = sum(1 for r in all_results if r['mstatus']=='skip')
    print(f"\n결과: 불일치 {bad_count} / 일치 {ok} / 건너뜀 {skip}")

    html = build_html(all_results)
    with open(OUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"✅ 리포트: {OUT_HTML}")

if __name__ == '__main__':
    main()
