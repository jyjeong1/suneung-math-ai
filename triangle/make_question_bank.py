#!/usr/bin/env python3
"""삼각함수 문제은행 HTML 생성기"""
import json, re, os, subprocess

QUESTIONS_JS = os.path.join(os.path.dirname(__file__), "questions.js")
FORMULAS_JS  = os.path.join(os.path.dirname(__file__), "formulas.js")
OUT_HTML     = os.path.join(os.path.dirname(__file__), "question_bank.html")

ACCT  = "#a78bfa"   # 삼각함수 테마 색 (보라)
ACCT2 = "#c4b5fd"

LV_COLOR = {
    "lv1": {"bg":"rgba(34,197,94,0.15)",  "bd":"rgba(34,197,94,0.4)",  "label":"Lv.1 개념",  "txt":"#4ade80"},
    "lv2": {"bg":"rgba(59,130,246,0.15)", "bd":"rgba(59,130,246,0.4)", "label":"Lv.2 기초",  "txt":"#60a5fa"},
    "lv3": {"bg":"rgba(249,115,22,0.15)", "bd":"rgba(249,115,22,0.4)", "label":"Lv.3 수능",  "txt":"#fb923c"},
    "lv4": {"bg":"rgba(168,85,247,0.15)", "bd":"rgba(168,85,247,0.4)", "label":"Lv.4 고난도","txt":"#c084fc"},
}

# ── JS 파싱 ───────────────────────────────────────────────────────
def load_js_array(path, varname):
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    script = raw + f"\nprocess.stdout.write(JSON.stringify({varname}));"
    try:
        r = subprocess.run(["node", "-e", script],
                           capture_output=True, text=True, timeout=15)
        if r.returncode == 0:
            return json.loads(r.stdout)
    except Exception:
        pass
    return []

def esc(s):
    return str(s).replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

# ── 카드 HTML ─────────────────────────────────────────────────────
def q_card(q, idx):
    lv  = q.get("difficulty","lv2")
    lvc = LV_COLOR.get(lv, LV_COLOR["lv2"])
    qid = q.get("_qid","")
    src = q.get("_source","")
    rev = q.get("_reviewed", False)
    prob = q.get("problem","")
    expl = q.get("explanation","")
    choices = q.get("choices",[])
    ans  = q.get("answer", None)
    atype = q.get("answerType","choice")
    img   = q.get("img","")
    year  = q.get("year","")
    exam  = q.get("exam","")
    qnum  = q.get("questionNum","")
    pts   = q.get("points","")

    # 출처 뱃지
    src_badge = ""
    if src == "past_exam":
        src_badge = f'<span style="background:rgba(255,215,0,0.2);color:#fbbf24;border:1px solid rgba(255,215,0,0.3);font-size:10px;padding:1px 6px;border-radius:4px;margin-left:4px">기출</span>'
        if year and exam:
            src_badge += f'<span style="font-size:10px;color:#888;margin-left:4px">{year} {exam} {qnum}번</span>'
    if pts:
        src_badge += f'<span style="font-size:10px;color:#94a3b8;margin-left:4px">[{pts}점]</span>'

    rev_badge = '<span style="color:#4ade80;font-size:11px;margin-left:4px">✔ 감수</span>' if rev else ""

    # 단답형 답
    ans_html = ""
    if atype == "short" and ans is not None:
        ans_html = f'<div style="margin:6px 0;font-size:14px;color:#4ade80;font-weight:700">정답: {esc(str(ans))}</div>'

    # 선택지 (choices 배열이 있을 때)
    choices_html = ""
    if choices:
        items = ""
        for i, c in enumerate(choices, 1):
            is_ans = (i == ans)
            ac = "#4ade80" if is_ans else "#aaa"
            fw = "700" if is_ans else "400"
            mark = "✓ " if is_ans else f"{'①②③④⑤'[i-1] if i<=5 else str(i)+'. '} "
            items += f'<div style="color:{ac};font-weight:{fw};margin:2px 0;font-size:14px">{mark}{esc(c)}</div>'
        choices_html = f'<div style="margin:8px 0 4px">{items}</div>'

    # 이미지 (기출 문제)
    img_html = ""
    if img:
        img_html = f'<div style="margin:8px 0;padding:6px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:12px;color:#666;text-align:center">🖼 이미지: {esc(img)}</div>'

    # 풀이
    expl_html = ""
    if expl:
        expl_lines = esc(expl).replace("\\n","<br>").replace("\n","<br>")
        expl_html = f'<details style="margin-top:8px"><summary style="cursor:pointer;font-size:13px;color:{ACCT};user-select:none">▶ 풀이 보기</summary><div style="margin-top:8px;font-size:13px;color:#ccc;line-height:1.7;background:rgba(255,255,255,0.03);padding:10px;border-radius:8px">{expl_lines}</div></details>'

    prob_html = esc(prob).replace("\\n","<br>").replace("\n","<br>")

    return (
        f'<div class="q-card" id="{qid}" style="background:{lvc["bg"]};border:1px solid {lvc["bd"]};'
        f'border-left:4px solid {lvc["txt"]};border-radius:12px;padding:16px 18px;margin-bottom:12px">\n'
        f'  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px">\n'
        f'    <span style="font-size:12px;font-weight:700;background:{lvc["bd"]};color:{lvc["txt"]};padding:2px 8px;border-radius:4px">{qid}</span>\n'
        f'    <span style="font-size:11px;color:#666">{idx}번 · {lvc["label"]} {src_badge}{rev_badge}</span>\n'
        f'  </div>\n'
        f'  <div class="math-content" style="font-size:15px;line-height:1.9;margin-bottom:6px">{prob_html}</div>\n'
        f'  {img_html}{choices_html}{ans_html}{expl_html}\n'
        f'</div>'
    )

# ── 공식 HTML ─────────────────────────────────────────────────────
def formula_section(formulas):
    if not formulas:
        return ""
    html = (f'<section id="formulas" style="margin-bottom:40px">'
            f'<h2 style="font-size:20px;font-weight:800;color:{ACCT};padding:12px 0;'
            f'border-bottom:3px solid {ACCT};margin-bottom:16px">📐 공식 레퍼런스</h2>')
    for cat in formulas:
        cname = esc(cat.get("category",""))
        html += (f'<div style="margin-bottom:20px">'
                 f'<h3 style="font-size:16px;font-weight:700;color:{ACCT2};margin-bottom:10px">{cname}</h3>')
        for f in cat.get("formulas",[]):
            fname = esc(f.get("name",""))
            ffmla = esc(f.get("formula",""))
            fdesc = esc(f.get("description",""))
            fex   = esc(f.get("example",""))
            ftip  = esc(f.get("tip",""))
            html += (f'<div style="background:rgba(167,139,250,0.07);border:1px solid rgba(167,139,250,0.2);'
                     f'border-radius:10px;padding:12px 14px;margin-bottom:8px">'
                     f'<div style="font-weight:700;color:#e2e8f0;margin-bottom:4px">{fname}</div>'
                     f'<div class="math-content" style="font-size:15px;color:{ACCT};margin-bottom:4px">{ffmla}</div>'
                     f'<div style="font-size:13px;color:#94a3b8">{fdesc}</div>'
                     + (f'<div style="font-size:12px;color:#a3e635;margin-top:4px">예) {fex}</div>' if fex else "")
                     + (f'<div style="font-size:12px;color:#fb923c;margin-top:3px">💡 {ftip}</div>' if ftip else "")
                     + '</div>')
        html += '</div>'
    html += '</section>'
    return html

# ── 목차 ─────────────────────────────────────────────────────────
def toc_links(types):
    out = ""
    for t in types:
        slug = re.sub(r'[^\w가-힣]','_', t)
        out += f'<a href="#{slug}" style="font-size:13px;color:{ACCT};text-decoration:none;margin:3px 8px 3px 0">{t}</a> '
    return out

# ── 메인 ─────────────────────────────────────────────────────────
def main():
    print("questions.js 파싱 중...")
    questions = load_js_array(QUESTIONS_JS, "QUESTION_BANK")
    if not questions:
        raise RuntimeError("questions.js 파싱 실패")
    print(f"  → {len(questions)}문제 로드")

    print("formulas.js 파싱 중...")
    formulas = load_js_array(FORMULAS_JS, "FORMULA_BANK")
    print(f"  → 공식 카테고리 {len(formulas)}개")

    total = len(questions)
    lv_cnt = {}
    for q in questions:
        lv = q.get("difficulty","lv2")
        lv_cnt[lv] = lv_cnt.get(lv,0)+1

    src_ai   = sum(1 for q in questions if q.get("_source")=="ai")
    src_past = sum(1 for q in questions if q.get("_source")=="past_exam")
    rev_cnt  = sum(1 for q in questions if q.get("_reviewed"))

    # 유형별 그룹화
    type_order, type_groups = [], {}
    for q in questions:
        t = q.get("type","기타")
        if t not in type_groups:
            type_groups[t] = {lv:[] for lv in ["lv1","lv2","lv3","lv4"]}
            type_order.append(t)
        lv = q.get("difficulty","lv2")
        type_groups[t].setdefault(lv,[]).append(q)

    # 본문
    body = ""
    idx_global = 0
    for t in type_order:
        slug = re.sub(r'[^\w가-힣]','_', t)
        body += (f'<div id="{slug}" style="font-size:20px;font-weight:800;color:{ACCT};'
                 f'padding:12px 0;border-bottom:3px solid {ACCT};margin:32px 0 16px">{t}</div>\n')
        for lv in ["lv1","lv2","lv3","lv4"]:
            qs = type_groups[t].get(lv,[])
            if not qs: continue
            lvc = LV_COLOR[lv]
            body += (f'<div style="font-size:15px;font-weight:700;padding:8px 12px;border-radius:8px;'
                     f'margin:16px 0 10px;color:#fff;background:{lvc["bd"]}">'
                     f'{lvc["label"]} ({len(qs)}문제)</div>\n')
            for q in qs:
                idx_global += 1
                body += q_card(q, idx_global) + "\n"

    stat = (f'총 {total}문제 | AI 생성 {src_ai} · 기출 {src_past} | 감수완료 {rev_cnt} | '
            f'lv1:{lv_cnt.get("lv1",0)} lv2:{lv_cnt.get("lv2",0)} '
            f'lv3:{lv_cnt.get("lv3",0)} lv4:{lv_cnt.get("lv4",0)}')

    html = f'''<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Prof.AI 수학:삼각함수 — 문제은행 ({total}문제)</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{{delimiters:[{{left:'$$',right:'$$',display:true}},{{left:'$',right:'$',display:false}}],throwOnError:false}});"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:'Noto Sans KR',sans-serif;background:#0a0f1a;color:#e0e0e0;max-width:900px;margin:0 auto;padding:20px}}
h1{{font-size:24px;font-weight:900;color:{ACCT};margin-bottom:8px}}
.summary{{font-size:13px;color:#888;margin-bottom:24px}}
.toc{{background:rgba(255,255,255,0.03);border:1px solid rgba(167,139,250,0.2);border-radius:12px;padding:16px;margin-bottom:24px}}
.toc h2{{font-size:16px;margin-bottom:10px;color:{ACCT}}}
details summary::-webkit-details-marker{{display:none}}
</style>
</head><body>
<h1>📐 Prof.AI 수학: 삼각함수 — 문제은행</h1>
<div class="summary">RPI 공학박사 · 삼성전자/GE 연구원 · 29년 교수 감수 | {stat}</div>

<div class="toc">
  <h2>📌 목차 (유형별)</h2>
  <a href="#formulas" style="font-size:13px;color:#a3e635;text-decoration:none;margin:3px 8px 3px 0;font-weight:700">📐 공식 레퍼런스</a>
  {toc_links(type_order)}
</div>

{formula_section(formulas)}

{body}

<div style="text-align:center;margin:40px 0 20px;font-size:13px;color:#555">
  Prof.AI 수학 · 삼각함수 문제은행 · {total}문제 · 2026
</div>
</body></html>'''

    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    sz = os.path.getsize(OUT_HTML) // 1024
    print(f"✅ 생성 완료: {OUT_HTML}")
    print(f"   {total}문제 · {sz}KB")

if __name__ == "__main__":
    main()
