#!/usr/bin/env python3
"""수열 문제은행 정밀검증 + HTML 리포트"""
import json, subprocess, re, datetime

QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/sequence/questions.js"
OUT_HTML     = "/Users/prof.juyoungjeong/Downloads/suneung_sequence_verify_report.html"

CIRCLE = {'①':1,'②':2,'③':3,'④':4,'⑤':5}

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout)

def esc(s):
    return str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def verify(questions):
    results = []
    for q in questions:
        qid   = q['_qid']
        atype = q.get('answerType','choice')
        ans   = q.get('answer')
        expl  = q.get('explanation','')
        choices = q.get('choices') or []
        status, notes = 'ok', []

        if atype == 'choice':
            # answer 범위 초과
            if isinstance(ans,int) and choices and ans > len(choices):
                status='bad'; notes.append(f'answer={ans} > 선지수={len(choices)}')
            # 해설 ∴답 vs answer
            m = re.search(r'∴\s*답[:：]\s*([①②③④⑤])', expl)
            if m:
                ea = CIRCLE[m.group(1)]
                if ea != ans:
                    status='bad'; notes.append(f'해설:{ea} ≠ answer:{ans}')
            else:
                if status=='ok': status='check'; notes.append('∴답 미검출')

        elif atype == 'short':
            # 단답형: 해설 ∴답 숫자 vs answer
            m = re.search(r'∴\s*답[:：]\s*[\$]?([−\-]?\d+(?:[./]\d+)?)[\$]?', expl)
            if m:
                ea_str = m.group(1).replace('−','-')
                try:
                    if int(ea_str) != int(ans):
                        status='bad'; notes.append(f'해설:{ea_str} ≠ answer:{ans}')
                except:
                    pass

        results.append({
            'qid':qid, 'type':q.get('type',''), 'lv':q.get('difficulty',''),
            'atype':atype, 'ans':ans, 'status':status, 'notes':notes,
            'prob': q.get('problem','')[:80],
        })
    return results

def build_html(results, total):
    bad   = [r for r in results if r['status']=='bad']
    check = [r for r in results if r['status']=='check']
    ok    = [r for r in results if r['status']=='ok']

    rows = ''
    for r in sorted(results, key=lambda x: (x['status']!='bad', x['status']!='check', x['qid'])):
        cls   = {'bad':'bad','check':'check','ok':'ok'}.get(r['status'],'ok')
        label = {'bad':'🔴 오류','check':'🔵 확인','ok':'🟢 정상'}.get(r['status'],'🟢')
        note  = ' / '.join(r['notes']) if r['notes'] else '—'
        rows += (f'<tr>'
                 f'<td><code>{esc(r["qid"])}</code></td>'
                 f'<td>{esc(r["type"])}<br><small>{esc(r["lv"])}</small></td>'
                 f'<td>{esc(r["atype"])}</td>'
                 f'<td>{esc(str(r["ans"]))}</td>'
                 f'<td class="{cls}">{label}</td>'
                 f'<td>{esc(note)}</td>'
                 f'<td style="font-size:11px">{esc(r["prob"])}</td>'
                 f'</tr>\n')

    today = datetime.date.today().isoformat()
    return f'''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>수열 정밀검증 보고서 ({today})</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{{delimiters:[{{left:'$$',right:'$$',display:true}},{{left:'$',right:'$',display:false}}],throwOnError:false}});"></script>
<style>
body{{font-family:system-ui,"Noto Sans KR",sans-serif;background:#f5f7fb;color:#192538;max-width:1300px;margin:25px auto;padding:0 20px}}
h1{{color:#173b62}}
table{{width:100%;border-collapse:collapse;font-size:12px;background:white}}
th,td{{border:1px solid #d9e1ec;padding:7px;vertical-align:top}}
th{{background:#173b62;color:#fff;position:sticky;top:0}}
tr:nth-child(2n){{background:#f3f8fd}}
.bad{{color:#b91c1c;font-weight:700}} .check{{color:#1d4ed8;font-weight:700}} .ok{{color:#0f766e}}
.stat{{display:inline-block;padding:8px 16px;border-radius:8px;margin:5px;font-weight:700}}
.s-bad{{background:#fee2e2;color:#b91c1c}} .s-check{{background:#dbeafe;color:#1e40af}} .s-ok{{background:#d1fae5;color:#065f46}}
code{{font-size:11px}}
input#search{{padding:6px 12px;font-size:13px;border:1px solid #ccd;border-radius:6px;width:220px;margin-bottom:10px}}
</style>
<script>
function showOnly(cls){{
  document.querySelectorAll("tbody tr").forEach(function(tr){{
    tr.style.display = cls==="all" || tr.querySelector("."+cls) ? "" : "none";
  }});
}}
function filterTable(){{
  var kw=document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("tbody tr").forEach(function(tr){{
    tr.style.display = tr.textContent.toLowerCase().includes(kw) ? "" : "none";
  }});
}}
</script>
</head><body>
<h1>📊 수열 정밀검증 보고서</h1>
<p>검증일: {today} · 총 {total}문제 · 해설 ∴답 vs answer 필드 비교 + 구조 검사</p>
<div>
  <span class="stat s-bad">🔴 오류 {len(bad)}</span>
  <span class="stat s-check">🔵 확인필요 {len(check)}</span>
  <span class="stat s-ok">🟢 정상 {len(ok)}</span>
</div>
<div style="margin:10px 0">
  <button onclick="showOnly('all')" style="margin:3px;padding:4px 12px;cursor:pointer">전체</button>
  <button onclick="showOnly('bad')" style="margin:3px;padding:4px 12px;cursor:pointer;background:#fee2e2">🔴 오류만</button>
  <button onclick="showOnly('check')" style="margin:3px;padding:4px 12px;cursor:pointer;background:#dbeafe">🔵 확인필요만</button>
  <input id="search" type="text" placeholder="QID/유형 검색..." oninput="filterTable()">
</div>
<table><thead><tr>
  <th>QID</th><th>유형/난이도</th><th>타입</th><th>answer</th><th>판정</th><th>비고</th><th>문제</th>
</tr></thead><tbody>{rows}</tbody></table>
<p style="font-size:12px;color:#888;margin-top:16px">Prof.AI 수학 · 수열 자동검증 스크립트</p>
</body></html>'''

def main():
    print("questions.js 로드 중...")
    questions = load_questions(QUESTIONS_JS)
    print(f"  → {len(questions)}문제")

    print("검증 중...")
    results = verify(questions)

    bad   = sum(1 for r in results if r['status']=='bad')
    check = sum(1 for r in results if r['status']=='check')
    ok    = sum(1 for r in results if r['status']=='ok')
    print(f"  🔴 오류: {bad}  🔵 확인필요: {check}  🟢 정상: {ok}")

    if bad:
        print("\n오류 목록:")
        for r in results:
            if r['status']=='bad':
                print(f"  {r['qid']}: {' / '.join(r['notes'])}")

    html = build_html(results, len(questions))
    with open(OUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\n✅ 리포트: {OUT_HTML} ({len(html)//1024}KB)")

if __name__ == '__main__':
    main()
