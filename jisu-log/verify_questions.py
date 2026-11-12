#!/usr/bin/env python3
"""지수와 로그 문제은행 정밀검증 — 해설 정답 vs answer 필드 비교 + HTML 리포트 생성"""
import json, re, subprocess, datetime

QUESTIONS_JS = "/Users/prof.juyoungjeong/Downloads/suneung-math-ai/jisu-log/questions.js"
OUT_HTML     = "/Users/prof.juyoungjeong/Downloads/jisu_log_verify_report.html"

CIRCLE_KO = {1:'①',2:'②',3:'③',4:'④',5:'⑤'}
CIRCLE_TO_INT = {'①':1,'②':2,'③':3,'④':4,'⑤':5}

def load_questions(path):
    with open(path, encoding='utf-8') as f: raw = f.read()
    r = subprocess.run(['node','-e', raw+'\nprocess.stdout.write(JSON.stringify(QUESTION_BANK));'],
                       capture_output=True, text=True, timeout=15)
    return json.loads(r.stdout)

def extract_expl_answer(expl, atype):
    """해설에서 '∴ 답:' 줄 파싱 → (정답번호 int or None, 원문 str)"""
    if not expl:
        return None, ''
    # 패턴: ∴ 답: ② ... 또는 ∴ 답: 숫자
    m = re.search(r'∴\s*답[:：]\s*([①②③④⑤])', expl)
    if m:
        return CIRCLE_TO_INT.get(m.group(1)), m.group(1)
    # 단답형: ∴ 답: 숫자
    m2 = re.search(r'∴\s*답[:：]\s*\$?([−\-]?\d+(?:[./]\d+)?)\$?', expl)
    if m2:
        return m2.group(1), m2.group(1)
    return None, ''

def check_duplicate_choices(choices):
    """선지 중복 검사 (LaTeX 정규화 후 비교)"""
    def norm(s):
        s = re.sub(r'\\(?:dfrac|frac)\{([^}]+)\}\{([^}]+)\}', r'(\1)/(\2)', s)
        s = re.sub(r'[\s\\{}\$]', '', s).lower()
        return s
    seen = {}
    dups = []
    for i, c in enumerate(choices, 1):
        k = norm(c)
        if k in seen:
            dups.append((seen[k], i, c))
        else:
            seen[k] = i
    return dups

def verify_all(questions):
    results = []
    for q in questions:
        qid   = q['_qid']
        atype = q.get('answerType', 'choice')
        ans   = q.get('answer')
        expl  = q.get('explanation', '')
        prob  = q.get('problem', '')
        choices = q.get('choices', [])
        lv    = q.get('difficulty', '')
        qtype = q.get('type', '')

        expl_ans, expl_ans_raw = extract_expl_answer(expl, atype)

        status = 'ok'
        notes  = []

        if atype == 'choice':
            # 선지 중복
            dups = check_duplicate_choices(choices)
            if dups:
                status = 'warn'
                for a_idx, b_idx, val in dups:
                    notes.append(f'선지중복: ①{CIRCLE_KO.get(a_idx,a_idx)}=①{CIRCLE_KO.get(b_idx,b_idx)} ({val[:25]})')

            # answer=0 미설정
            if ans == 0:
                status = 'bad'
                notes.append('answer=0 (미설정)')

            # 해설 정답과 불일치
            if isinstance(expl_ans, int) and isinstance(ans, int):
                if expl_ans != ans:
                    status = 'bad'
                    notes.append(f'해설:{CIRCLE_KO.get(expl_ans,"?")} ≠ answer:{CIRCLE_KO.get(ans,"?")}')

            # 해설에서 정답 미검출
            if expl_ans is None and expl:
                notes.append('해설 "∴ 답:" 미검출')
                if status == 'ok':
                    status = 'check'

        elif atype == 'short':
            # 단답형: 해설 정답과 answer 비교
            if expl_ans is not None and ans is not None:
                try:
                    if str(expl_ans).strip() != str(ans).strip():
                        # 숫자 비교
                        if float(str(expl_ans).replace('−','-')) != float(str(ans)):
                            status = 'bad'
                            notes.append(f'해설:{expl_ans} ≠ answer:{ans}')
                except:
                    pass

        results.append({
            'qid': qid, 'type': qtype, 'lv': lv, 'atype': atype,
            'ans': ans, 'expl_ans': expl_ans, 'expl_ans_raw': expl_ans_raw,
            'status': status, 'notes': notes,
            'prob': prob[:80], 'choices': choices,
        })
    return results

def build_html(results, questions):
    total   = len(results)
    bad     = [r for r in results if r['status']=='bad']
    warn    = [r for r in results if r['status']=='warn']
    check   = [r for r in results if r['status']=='check']
    ok      = [r for r in results if r['status']=='ok']

    # qid -> question map
    qmap = {q['_qid']: q for q in questions}

    def esc(s): return str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

    rows = ''
    for i, r in enumerate(results, 1):
        sc = r['status']
        cls = {'bad':'bad','warn':'warn','check':'check','ok':'ok'}.get(sc,'ok')
        label = {'bad':'오류','warn':'선지중복','check':'확인필요','ok':'정상'}.get(sc,'정상')
        note_txt = ' / '.join(r['notes']) if r['notes'] else '—'
        q = qmap.get(r['qid'],{})
        choices_txt = ' / '.join([f'{CIRCLE_KO.get(j+1,"")}{esc(c[:20])}' for j,c in enumerate(r.get('choices') or [])])

        rows += (
            f'<tr id="{r["qid"]}">'
            f'<td><b>{i}</b><br><code>{r["qid"]}</code></td>'
            f'<td>{r["type"]}<br><small>{r["lv"]}</small></td>'
            f'<td>{esc(r["prob"])}</td>'
            f'<td class="option">{choices_txt}</td>'
            f'<td>{esc(str(r["expl_ans_raw"])) if r["expl_ans_raw"] else "—"}</td>'
            f'<td>{esc(str(r["ans"]))}</td>'
            f'<td class="{cls}">{label}</td>'
            f'<td>{esc(note_txt)}</td>'
            f'</tr>\n'
        )

    today = datetime.date.today().isoformat()
    html = f'''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>지수와 로그 정밀검증 보고서 ({today})</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{{delimiters:[{{left:'$$',right:'$$',display:true}},{{left:'$',right:'$',display:false}}],throwOnError:false}});"></script>
<style>
body{{font-family:system-ui,'Noto Sans KR',sans-serif;background:#f5f7fb;color:#192538;max-width:1400px;margin:25px auto;padding:0 20px;line-height:1.5}}
h1{{color:#173b62;font-size:26px}} h2{{font-size:18px;margin-top:20px;color:#173b62}}
table{{width:100%;border-collapse:collapse;font-size:12px;background:white}}
th,td{{border:1px solid #d9e1ec;padding:7px;vertical-align:top}}
th{{background:#173b62;color:#fff;position:sticky;top:0}}
tr:nth-child(2n){{background:#f3f8fd}}
.bad{{color:#b91c1c;font-weight:700}} .warn{{color:#955900;font-weight:700}}
.check{{color:#1d4ed8;font-weight:700}} .ok{{color:#0f766e}}
.stat{{display:inline-block;padding:8px 18px;border-radius:8px;margin:6px;font-weight:700;font-size:15px}}
.s-bad{{background:#fee2e2;color:#b91c1c}} .s-warn{{background:#fef3c7;color:#92400e}}
.s-check{{background:#dbeafe;color:#1e40af}} .s-ok{{background:#d1fae5;color:#065f46}}
.intro{{background:#eaf2fb;border-radius:10px;padding:12px 20px;margin-bottom:16px}}
.option{{font-size:11px;color:#45566e}} code{{font-size:11px}}
input#search{{padding:6px 12px;font-size:13px;border:1px solid #ccd;border-radius:6px;width:220px;margin-bottom:10px}}
</style>
<script>
function filterTable(){{
  var kw=document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('tbody tr').forEach(function(tr){{
    tr.style.display = tr.textContent.toLowerCase().includes(kw)?'':'none';
  }});
}}
function showOnly(cls){{
  document.querySelectorAll('tbody tr').forEach(function(tr){{
    if(cls==='all') tr.style.display='';
    else tr.style.display = tr.querySelector('.'+cls) ? '' : 'none';
  }});
}}
</script>
</head><body>
<h1>📊 지수와 로그 정밀검증 보고서</h1>
<div class="intro">
  검증일: {today} · 총 {total}문항 · 해설 "∴ 답:" vs answer 필드 비교 + 선지중복 검사
</div>
<div>
  <span class="stat s-bad">🔴 오류 {len(bad)}</span>
  <span class="stat s-warn">🟡 선지중복 {len(warn)}</span>
  <span class="stat s-check">🔵 확인필요 {len(check)}</span>
  <span class="stat s-ok">🟢 정상 {len(ok)}</span>
</div>
<div style="margin:12px 0">
  <button onclick="showOnly('all')" style="margin:3px;padding:4px 12px;cursor:pointer">전체</button>
  <button onclick="showOnly('bad')" style="margin:3px;padding:4px 12px;cursor:pointer;background:#fee2e2">🔴 오류만</button>
  <button onclick="showOnly('warn')" style="margin:3px;padding:4px 12px;cursor:pointer;background:#fef3c7">🟡 중복만</button>
  <button onclick="showOnly('check')" style="margin:3px;padding:4px 12px;cursor:pointer;background:#dbeafe">🔵 확인필요만</button>
  <input id="search" type="text" placeholder="QID/유형 검색..." oninput="filterTable()">
</div>
<table><thead><tr>
  <th>순번/ID</th><th>유형/난이도</th><th>문제</th><th>선지</th>
  <th>해설 정답</th><th>answer 필드</th><th>판정</th><th>비고</th>
</tr></thead><tbody>
{rows}
</tbody></table>
<p style="margin-top:20px;font-size:12px;color:#888">Prof.AI 수학 · 지수와 로그 · 자동검증 스크립트 생성</p>
</body></html>'''
    return html

def main():
    print("questions.js 로드 중...")
    questions = load_questions(QUESTIONS_JS)
    print(f"  → {len(questions)}문제")

    print("검증 중...")
    results = verify_all(questions)

    bad   = sum(1 for r in results if r['status']=='bad')
    warn  = sum(1 for r in results if r['status']=='warn')
    check = sum(1 for r in results if r['status']=='check')
    ok    = sum(1 for r in results if r['status']=='ok')
    print(f"  🔴 오류: {bad}  🟡 선지중복: {warn}  🔵 확인필요: {check}  🟢 정상: {ok}")

    html = build_html(results, questions)
    with open(OUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\n✅ 리포트 저장: {OUT_HTML} ({len(html)//1024}KB)")

if __name__ == '__main__':
    main()
