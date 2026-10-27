const FORMULA_BANK = [
  // ── 1. 수학 기본 (기본연산, 곱셈공식, 나머지정리, 인수분해) ──────
  {
    category: "수학 기본",
    formulas: [
      {
        name: "곱셈공식 (완전제곱)",
        formula: "$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$",
        description: "두 항의 합 또는 차를 제곱한 전개 공식이다.",
        example: "$(x+3)^2 = x^2 + 6x + 9$",
        tip: "중간항의 부호에 주의하자. $(a-b)^2$의 중간항은 $-2ab$이다."
      },
      {
        name: "곱셈공식 (합차)",
        formula: "$(a+b)(a-b) = a^2 - b^2$",
        description: "합과 차의 곱은 제곱의 차로 변환된다.",
        example: "$(x+5)(x-5) = x^2 - 25$",
        tip: "인수분해의 역과정이기도 하다. 유리화에서도 자주 활용된다."
      },
      {
        name: "곱셈공식 (세제곱)",
        formula: "$(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3$",
        description: "세제곱 전개 공식이다. 이항정리의 특수한 경우이다.",
        example: "$(x+2)^3 = x^3 + 6x^2 + 12x + 8$",
        tip: "계수는 파스칼의 삼각형 $1, 3, 3, 1$을 따른다."
      },
      {
        name: "인수분해 (세제곱의 합·차)",
        formula: "$a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$",
        description: "세제곱의 합 또는 차를 인수분해하는 공식이다.",
        example: "$x^3 - 8 = (x-2)(x^2+2x+4)$",
        tip: "두 번째 인수의 가운데 항 부호는 첫 번째 인수의 부호와 반대이다."
      },
      {
        name: "나머지정리",
        formula: "$f(x)$를 $(x-a)$로 나눈 나머지는 $f(a)$",
        description: "다항식 f(x)를 일차식 (x-a)로 나눈 나머지는 f(a)를 대입하여 구한다.",
        example: "$f(x)=x^3-2x+1$을 $(x-1)$로 나눈 나머지: $f(1)=1-2+1=0$",
        tip: "나머지가 0이면 (x-a)는 f(x)의 인수이다 (인수정리)."
      },
      {
        name: "인수정리",
        formula: "$f(a)=0 \\;\\Leftrightarrow\\; (x-a)$는 $f(x)$의 인수",
        description: "f(a)=0이면 f(x)는 (x-a)로 나누어떨어진다.",
        example: "$f(x)=x^3-6x^2+11x-6$, $f(1)=0$ → $(x-1)$이 인수 → $f(x)=(x-1)(x-2)(x-3)$",
        tip: "최고차항의 계수와 상수항의 약수를 대입하여 근을 찾는다."
      },
      {
        name: "조립제법",
        formula: "$f(x) \\div (x-a)$의 몫과 나머지를 빠르게 계산하는 방법",
        description: "계수를 나열하고 a를 반복 곱·합하여 몫의 계수와 나머지를 구한다.",
        example: "$x^3-6x^2+11x-6 \\div (x-1)$: 계수 $1,-6,11,-6$ → 몫 $x^2-5x+6$, 나머지 $0$",
        tip: "고차다항식의 인수분해 시 조립제법을 반복 적용하면 효율적이다."
      },
      {
        name: "이항정리",
        formula: "$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k}b^k$",
        description: "이항식의 n제곱을 전개하는 일반 공식이다.",
        example: "$(x+1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$",
        tip: "특정 항의 계수만 구할 때는 $\\binom{n}{k}$를 이용하면 전체를 전개하지 않아도 된다."
      }
    ]
  },

  // ── 2. 지수·로그 ──────────────────────────────────────────────
  {
    category: "지수·로그",
    formulas: [
      {
        name: "지수법칙",
        formula: "$a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}$",
        description: "같은 밑의 거듭제곱 사이의 기본 연산 법칙이다.",
        example: "$2^3 \\cdot 2^5 = 2^8 = 256$",
        tip: "밑이 같을 때만 지수를 더하거나 뺄 수 있다."
      },
      {
        name: "거듭제곱근과 지수",
        formula: "$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m \\quad (a>0)$",
        description: "유리수 지수는 거듭제곱근으로 표현할 수 있다.",
        example: "$8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$",
        tip: "분모가 근호의 차수, 분자가 거듭제곱의 지수이다."
      },
      {
        name: "로그의 정의",
        formula: "$\\log_a b = c \\;\\Leftrightarrow\\; a^c = b \\quad (a>0, a\\neq 1, b>0)$",
        description: "로그는 '밑 a를 몇 제곱하면 b가 되는가'를 나타낸다.",
        example: "$\\log_2 8 = 3 \\;\\Leftrightarrow\\; 2^3 = 8$",
        tip: "로그의 정의를 지수 형태로 바꾸어 계산하면 명확하다."
      },
      {
        name: "로그의 성질",
        formula: "$\\log_a(MN) = \\log_a M + \\log_a N, \\quad \\log_a\\frac{M}{N} = \\log_a M - \\log_a N, \\quad \\log_a M^k = k\\log_a M$",
        description: "로그의 곱·몫·거듭제곱에 대한 기본 성질이다.",
        example: "$\\log_2 24 = \\log_2(8 \\times 3) = \\log_2 8 + \\log_2 3 = 3 + \\log_2 3$",
        tip: "곱은 합으로, 몫은 차로, 지수는 계수로 변환된다."
      },
      {
        name: "밑 변환 공식",
        formula: "$\\log_a b = \\frac{\\log_c b}{\\log_c a} = \\frac{1}{\\log_b a}$",
        description: "로그의 밑을 원하는 밑으로 변환할 수 있다.",
        example: "$\\log_4 8 = \\frac{\\log_2 8}{\\log_2 4} = \\frac{3}{2}$",
        tip: "밑이 다른 로그끼리 계산할 때 반드시 필요한 공식이다."
      },
      {
        name: "상용로그",
        formula: "$\\log_{10} N = n + \\alpha \\quad (0 \\le \\alpha < 1)$",
        description: "밑이 10인 로그. 정수 부분 n이 자릿수 결정, 소수 부분 α가 첫째 자리 숫자를 결정한다.",
        example: "$\\log_{10} 200 = \\log_{10} 2 + 2 \\approx 2.301$ → 3자리 수",
        tip: "N이 n+1자리 수 $\\Leftrightarrow$ $n \\le \\log_{10} N < n+1$이다."
      },
      {
        name: "지수함수의 그래프",
        formula: "$y = a^x \\;(a>0, a\\neq 1)$: 점 $(0,1)$을 지남, $a>1$이면 증가, $0<a<1$이면 감소",
        description: "지수함수의 기본 그래프 성질이다. y축이 점근선이 아닌 x축이 점근선이다.",
        example: "$y=2^x$: $x=0$일 때 $y=1$, $x=3$일 때 $y=8$, $x \\to -\\infty$일 때 $y \\to 0$",
        tip: "점근선은 $y=0$ (x축)이다. 그래프는 x축에 한없이 가까워지지만 만나지 않는다."
      },
      {
        name: "로그함수의 그래프",
        formula: "$y = \\log_a x \\;(a>0, a\\neq 1)$: 점 $(1,0)$을 지남, $a>1$이면 증가, $0<a<1$이면 감소",
        description: "로그함수는 지수함수의 역함수이다. $y=a^x$와 $y=x$에 대해 대칭이다.",
        example: "$y=\\log_2 x$: $x=1$일 때 $y=0$, $x=8$일 때 $y=3$",
        tip: "점근선은 $x=0$ (y축)이다. 정의역은 $x>0$이다."
      }
    ]
  },

  // ── 3. 삼각함수 ──────────────────────────────────────────────
  {
    category: "삼각함수",
    formulas: [
      {
        name: "삼각함수의 정의 (단위원)",
        formula: "$\\sin\\theta = y, \\quad \\cos\\theta = x, \\quad \\tan\\theta = \\frac{y}{x} = \\frac{\\sin\\theta}{\\cos\\theta}$",
        description: "단위원 위의 점 (x, y)에서 삼각함수를 정의한다.",
        example: "$\\theta = \\frac{\\pi}{6}$일 때 $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$, $\\cos\\frac{\\pi}{6}=\\frac{\\sqrt{3}}{2}$",
        tip: "특수각 $0, \\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}$의 값을 암기하자."
      },
      {
        name: "삼각함수의 기본 관계",
        formula: "$\\sin^2\\theta + \\cos^2\\theta = 1, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta$",
        description: "피타고라스 항등식을 비롯한 삼각함수의 기본 관계식이다.",
        example: "$\\sin\\theta = \\frac{3}{5}$이면 $\\cos\\theta = \\pm\\frac{4}{5}$ (사분면에 따라 부호 결정)",
        tip: "$\\sin^2\\theta + \\cos^2\\theta = 1$을 변형하면 다양한 관계식을 유도할 수 있다."
      },
      {
        name: "삼각함수의 그래프",
        formula: "$y = a\\sin(bx+c)+d$: 진폭 $|a|$, 주기 $\\frac{2\\pi}{|b|}$, 위상이동 $-\\frac{c}{b}$, 수직이동 $d$",
        description: "사인·코사인 함수의 그래프 변환 공식이다.",
        example: "$y=2\\sin(3x-\\frac{\\pi}{2})+1$: 진폭 $2$, 주기 $\\frac{2\\pi}{3}$, 우로 $\\frac{\\pi}{6}$ 이동, 위로 $1$ 이동",
        tip: "주기 $= \\frac{2\\pi}{|b|}$, 탄젠트의 주기는 $\\frac{\\pi}{|b|}$이다."
      },
      {
        name: "덧셈정리",
        formula: "$\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta$\n$\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta$",
        description: "두 각의 합·차에 대한 삼각함수 전개 공식이다.",
        example: "$\\sin 75° = \\sin(45°+30°) = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$",
        tip: "코사인 덧셈정리의 부호는 사인과 반대임에 주의하자."
      },
      {
        name: "배각공식",
        formula: "$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha, \\quad \\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha = 2\\cos^2\\alpha - 1 = 1 - 2\\sin^2\\alpha$",
        description: "각을 2배로 만드는 공식이다. 덧셈정리에서 α=β로 놓으면 유도된다.",
        example: "$\\sin\\theta = \\frac{3}{5}$일 때 $\\sin 2\\theta = 2 \\cdot \\frac{3}{5} \\cdot \\frac{4}{5} = \\frac{24}{25}$",
        tip: "$\\cos 2\\alpha$의 세 가지 표현을 상황에 맞게 선택하는 것이 핵심이다."
      },
      {
        name: "반각공식",
        formula: "$\\sin^2\\frac{\\alpha}{2} = \\frac{1-\\cos\\alpha}{2}, \\quad \\cos^2\\frac{\\alpha}{2} = \\frac{1+\\cos\\alpha}{2}$",
        description: "배각공식을 변형하여 반각의 삼각함수 값을 구하는 공식이다.",
        example: "$\\cos^2 15° = \\frac{1+\\cos 30°}{2} = \\frac{1+\\frac{\\sqrt{3}}{2}}{2} = \\frac{2+\\sqrt{3}}{4}$",
        tip: "적분에서 $\\sin^2 x$, $\\cos^2 x$를 처리할 때 자주 활용된다."
      },
      {
        name: "합차를 곱으로 (합을 곱으로)",
        formula: "$\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$\n$\\cos A + \\cos B = 2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$",
        description: "삼각함수의 합을 곱의 형태로 변환하는 공식이다.",
        example: "$\\sin 50° + \\sin 10° = 2\\sin 30°\\cos 20° = \\cos 20°$",
        tip: "방정식에서 인수분해 형태로 만들 때 유용하다."
      },
      {
        name: "사인법칙과 코사인법칙",
        formula: "$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$\n$a^2 = b^2 + c^2 - 2bc\\cos A$",
        description: "삼각형의 변과 각 사이의 관계를 나타내는 법칙이다.",
        example: "삼각형에서 $a=5, b=7, C=60°$ → $c^2 = 25+49-70\\cdot\\frac{1}{2}=39$",
        tip: "사인법칙은 외접원 반지름 R과 연결되며, 코사인법칙은 한 각을 알 때 변을 구하는 데 사용한다."
      }
    ]
  },

  // ── 4. 수열 ──────────────────────────────────────────────────
  {
    category: "수열",
    formulas: [
      {
        name: "등차수열의 일반항",
        formula: "$a_n = a_1 + (n-1)d$",
        description: "첫째항 $a_1$, 공차 $d$인 등차수열의 제n항이다.",
        example: "첫째항 $3$, 공차 $2$: $a_n = 3+2(n-1) = 2n+1$",
        tip: "$a_n = a_m + (n-m)d$로 중간항에서 출발할 수도 있다."
      },
      {
        name: "등차수열의 합",
        formula: "$S_n = \\frac{n(a_1 + a_n)}{2} = \\frac{n\\{2a_1+(n-1)d\\}}{2}$",
        description: "첫째항부터 제n항까지의 합이다.",
        example: "$1+2+3+\\cdots+100 = \\frac{100 \\times 101}{2} = 5050$",
        tip: "$S_n$이 $n$에 대한 이차식이면 등차수열이다."
      },
      {
        name: "등비수열의 일반항",
        formula: "$a_n = a_1 \\cdot r^{n-1}$",
        description: "첫째항 $a_1$, 공비 $r$인 등비수열의 제n항이다.",
        example: "첫째항 $2$, 공비 $3$: $a_n = 2 \\cdot 3^{n-1}$",
        tip: "$\\frac{a_{n+1}}{a_n} = r$ (일정)이 등비수열의 핵심 성질이다."
      },
      {
        name: "등비수열의 합",
        formula: "$S_n = \\frac{a_1(r^n - 1)}{r - 1} \\quad (r \\neq 1)$",
        description: "공비가 1이 아닌 등비수열의 처음 n항의 합이다.",
        example: "$1+2+4+8+\\cdots+2^9 = \\frac{1 \\cdot (2^{10}-1)}{2-1} = 1023$",
        tip: "$r=1$이면 $S_n = na_1$이다. 무한등비급수는 $|r|<1$일 때 $\\frac{a_1}{1-r}$이다."
      },
      {
        name: "$S_n$과 $a_n$의 관계",
        formula: "$a_n = \\begin{cases} S_1 & (n=1) \\\\ S_n - S_{n-1} & (n \\ge 2) \\end{cases}$",
        description: "부분합 $S_n$이 주어졌을 때 일반항 $a_n$을 구하는 공식이다.",
        example: "$S_n = 3n^2+n$ → $a_n = S_n-S_{n-1} = 6n-2$ ($n \\ge 2$), $a_1 = S_1 = 4$",
        tip: "$n=1$일 때도 같은 식이 성립하는지 반드시 확인해야 한다."
      },
      {
        name: "시그마(Σ) 공식",
        formula: "$\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}, \\quad \\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}, \\quad \\sum_{k=1}^{n} k^3 = \\left\\{\\frac{n(n+1)}{2}\\right\\}^2$",
        description: "자연수의 거듭제곱 합 공식이다.",
        example: "$\\sum_{k=1}^{10} k^2 = \\frac{10 \\cdot 11 \\cdot 21}{6} = 385$",
        tip: "$\\sum k^3 = (\\sum k)^2$이라는 놀라운 관계가 성립한다."
      },
      {
        name: "수학적 귀납법",
        formula: "① $n=1$일 때 성립 확인 ② $n=k$일 때 성립 가정 → $n=k+1$일 때 성립 증명",
        description: "자연수에 관한 명제를 증명하는 방법이다.",
        example: "$1+2+\\cdots+n = \\frac{n(n+1)}{2}$ 증명: 기본단계 + 귀납단계",
        tip: "귀납 가정($n=k$일 때 성립)을 $n=k+1$의 증명 과정에서 반드시 사용해야 한다."
      },
      {
        name: "점화식 (여러 유형)",
        formula: "$a_{n+1} = a_n + f(n), \\quad a_{n+1} = ra_n + d, \\quad a_{n+1} = pa_n + q^n$ 등",
        description: "이웃하는 항 사이의 관계식으로 수열을 정의한다.",
        example: "$a_{n+1} = 2a_n + 1$, $a_1=1$ → 특성방정식 $x=2x+1$, $x=-1$ → $a_n+1 = 2^n(a_1+1) = 2^{n+1}$",
        tip: "$a_{n+1} = pa_n + q$ 형태는 $\\alpha = p\\alpha + q$인 $\\alpha$를 찾아 $a_n - \\alpha$를 등비수열로 만든다."
      }
    ]
  },

  // ── 5. 함수의 극한·연속 ───────────────────────────────────────
  {
    category: "함수의 극한·연속",
    formulas: [
      {
        name: "함수의 극한 정의",
        formula: "$\\lim_{x \\to a} f(x) = L$",
        description: "x가 a에 한없이 가까워질 때 f(x)의 값이 L에 수렴하면 극한값은 L이다.",
        example: "$\\lim_{x \\to 2} (3x+1) = 7$",
        tip: "좌극한과 우극한이 같아야 극한값이 존재한다."
      },
      {
        name: "극한의 사칙연산",
        formula: "$\\lim_{x \\to a}[f(x) \\pm g(x)] = L \\pm M, \\quad \\lim_{x \\to a}\\frac{f(x)}{g(x)} = \\frac{L}{M}\\;(M \\neq 0)$",
        description: "극한값이 존재하면 합, 차, 곱, 몫의 극한은 각각의 극한값으로 계산할 수 있다.",
        example: "$\\lim_{x\\to 1}(x^2+3x) = 1+3 = 4$",
        tip: "몫의 극한에서 분모의 극한값이 0이면 바로 적용할 수 없다."
      },
      {
        name: "부정형 0/0 처리",
        formula: "$\\lim_{x \\to a}\\frac{f(x)}{g(x)} \\;\\left(\\frac{0}{0}\\text{ 꼴}\\right)$ → 인수분해, 유리화로 약분",
        description: "분자·분모가 모두 0이면 공통인수를 약분한 뒤 극한을 구한다.",
        example: "$\\lim_{x\\to 1}\\frac{x^2-1}{x-1}=\\lim_{x\\to 1}(x+1)=2$",
        tip: "다항함수의 0/0 부정형은 (x-a)로 인수분해하는 것이 핵심이다."
      },
      {
        name: "부정형 ∞/∞ 처리",
        formula: "$\\lim_{x \\to \\infty}\\frac{a_nx^n+\\cdots}{b_mx^m+\\cdots}$: $n=m$이면 $\\frac{a_n}{b_m}$, $n<m$이면 $0$, $n>m$이면 발산",
        description: "최고차항으로 분자·분모를 나누어 판별한다.",
        example: "$\\lim_{x\\to\\infty}\\frac{3x^2+1}{2x^2-5}=\\frac{3}{2}$",
        tip: "최고차항의 차수를 먼저 비교하면 빠르게 판별할 수 있다."
      },
      {
        name: "함수의 연속 정의",
        formula: "① $f(a)$ 정의됨 ② $\\lim_{x \\to a}f(x)$ 존재 ③ $f(a)=\\lim_{x \\to a}f(x)$",
        description: "세 조건을 모두 만족해야 x=a에서 연속이다.",
        example: "$f(x)=\\begin{cases}x^2 & (x\\neq 1)\\\\3 & (x=1)\\end{cases}$ → $x=1$에서 불연속 ($1\\neq 3$)",
        tip: "수능에서 미정계수 결정 문제의 핵심: 연속이 되도록 함수값을 결정한다."
      },
      {
        name: "중간값 정리",
        formula: "$f$가 $[a,b]$에서 연속이고 $f(a) \\neq f(b)$이면, 사이의 모든 값 $k$에 대해 $f(c)=k$인 $c$ 존재",
        description: "연속함수는 두 함수값 사이의 모든 값을 반드시 거친다.",
        example: "$f(x)=x^3-2$: $f(1)=-1<0$, $f(2)=6>0$ → $(1,2)$에 근 존재",
        tip: "방정식의 실근 존재성 증명에 핵심적으로 사용된다."
      },
      {
        name: "무한대에서의 극한",
        formula: "$\\lim_{x \\to \\infty}\\frac{1}{x} = 0, \\quad \\lim_{x \\to \\infty}\\frac{1}{x^n} = 0 \\;(n>0)$",
        description: "x가 무한히 커지면 $\\frac{1}{x^n}$은 0에 수렴한다.",
        example: "$\\lim_{x\\to\\infty}\\frac{2x+1}{x} = \\lim_{x\\to\\infty}(2+\\frac{1}{x}) = 2$",
        tip: "분자·분모를 최고차항으로 나누면 $\\frac{1}{x}$ 꼴로 정리된다."
      },
      {
        name: "극한값이 존재할 조건 (분모→0)",
        formula: "$\\lim_{x \\to a}g(x)=0$이고 $\\lim_{x \\to a}\\frac{f(x)}{g(x)}$이 유한 → $\\lim_{x \\to a}f(x)=0$",
        description: "분모가 0으로 갈 때 극한값이 유한하면 분자도 반드시 0으로 가야 한다.",
        example: "$\\lim_{x\\to 1}\\frac{ax+b}{x-1}=3$ 이면 $a+b=0$ (분자→0 필요)",
        tip: "미정계수 결정 문제에서 가장 자주 쓰이는 핵심 조건이다."
      }
    ]
  },

  // ── 6. 미분법 ──────────────────────────────────────────────────
  {
    category: "미분법",
    formulas: [
      {
        name: "미분계수 정의",
        formula: "$f'(a) = \\lim_{h \\to 0}\\frac{f(a+h)-f(a)}{h} = \\lim_{x \\to a}\\frac{f(x)-f(a)}{x-a}$",
        description: "x=a에서의 순간변화율로, 접선의 기울기이다.",
        example: "$f(x)=x^2$, $f'(2)=\\lim_{h\\to 0}\\frac{(2+h)^2-4}{h}=4$",
        tip: "두 가지 형태를 모두 숙지하자. 수능에서 변형 출제가 빈번하다."
      },
      {
        name: "기본 도함수 공식",
        formula: "$(x^n)' = nx^{n-1}, \\quad (c)' = 0, \\quad (cf)' = cf'$",
        description: "다항함수 미분의 기본 공식이다.",
        example: "$(5x^3)' = 15x^2$",
        tip: "지수를 앞으로 내리고 지수를 1 줄인다."
      },
      {
        name: "접선의 방정식",
        formula: "$y - f(a) = f'(a)(x - a)$",
        description: "곡선 $y=f(x)$ 위의 점 $(a, f(a))$에서의 접선의 방정식이다.",
        example: "$f(x)=x^2$, 점 $(1,1)$에서 접선: $y=2x-1$",
        tip: "접점이 주어진 경우와 외부 점에서 접선을 긋는 경우를 구분하자."
      },
      {
        name: "함수의 증가·감소 판정",
        formula: "$f'(x)>0 \\Rightarrow f$ 증가, $\\quad f'(x)<0 \\Rightarrow f$ 감소",
        description: "도함수의 부호로 원래 함수의 증가·감소를 판정한다.",
        example: "$f(x)=x^3-3x$ → $f'(x)=3(x+1)(x-1)$ → $x<-1$ 또는 $x>1$에서 증가",
        tip: "증감표를 그려서 부호 변화를 확인하는 것이 가장 확실하다."
      },
      {
        name: "극대·극소 판정",
        formula: "$f'(a)=0$이고 $f'(x)$의 부호가 $+\\to -$이면 극대, $-\\to +$이면 극소",
        description: "도함수가 0인 점에서 부호 변화로 극값을 판정한다.",
        example: "$f(x)=x^3-3x$: $x=-1$에서 극대(값 $2$), $x=1$에서 극소(값 $-2$)",
        tip: "$f'(a)=0$이어도 부호가 바뀌지 않으면 극값이 아니다. (예: $f(x)=x^3$의 $x=0$)"
      },
      {
        name: "닫힌 구간에서 최대·최소",
        formula: "$[a,b]$에서 $f'(x)=0$인 점과 양 끝점 $f(a), f(b)$를 비교",
        description: "극값 후보와 양 끝점의 함수값을 모두 비교하여 최대·최소를 결정한다.",
        example: "$f(x)=x^3-3x$, $[-2,2]$: 후보 $f(-2)=-2, f(-1)=2, f(1)=-2, f(2)=2$",
        tip: "끝점을 빠뜨리지 않도록 주의하자."
      },
      {
        name: "방정식의 실근 개수 판별",
        formula: "$f(x)=k$의 실근 수 $= y=f(x)$와 $y=k$의 교점 수",
        description: "함수의 그래프와 수평선의 교점으로 실근 개수를 판별한다.",
        example: "$x^3-3x=k$: 극대 $2$, 극소 $-2$ → $-2<k<2$이면 3개 근",
        tip: "극값을 구하면 k의 범위별 실근 개수를 완전히 파악할 수 있다."
      },
      {
        name: "속도·가속도",
        formula: "$v(t)=s'(t), \\quad a(t)=v'(t)=s''(t)$",
        description: "위치함수를 미분하면 속도, 속도를 미분하면 가속도이다.",
        example: "$s(t)=t^3-6t^2+9t$ → $v(t)=3t^2-12t+9$, $a(t)=6t-12$",
        tip: "속력은 속도의 절댓값 $|v(t)|$이다."
      }
    ]
  },

  // ── 7. 적분법 ──────────────────────────────────────────────────
  {
    category: "적분법",
    formulas: [
      {
        name: "부정적분 기본 공식",
        formula: "$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$",
        description: "미분의 역과정으로, 적분상수 C를 반드시 붙인다.",
        example: "$\\int x^3\\,dx = \\frac{x^4}{4} + C$",
        tip: "부정적분에서 적분상수 C를 빼먹으면 감점된다."
      },
      {
        name: "부정적분의 성질",
        formula: "$\\int\\{f(x) \\pm g(x)\\}dx = \\int f(x)dx \\pm \\int g(x)dx, \\quad \\int kf(x)dx = k\\int f(x)dx$",
        description: "적분의 선형성: 합·차의 적분은 각각의 적분의 합·차이다.",
        example: "$\\int(3x^2-2x+1)dx = x^3-x^2+x+C$",
        tip: "항별로 따로 적분한 뒤 합치면 된다."
      },
      {
        name: "정적분 정의",
        formula: "$\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad (F'(x)=f(x))$",
        description: "부정적분의 위끝값에서 아래끝값을 뺀다.",
        example: "$\\int_1^3 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_1^3 = 9 - \\frac{1}{3} = \\frac{26}{3}$",
        tip: "정적분은 적분상수가 상쇄되므로 C를 쓰지 않는다."
      },
      {
        name: "정적분의 성질",
        formula: "$\\int_a^b f(x)dx = -\\int_b^a f(x)dx, \\quad \\int_a^b f(x)dx = \\int_a^c f(x)dx + \\int_c^b f(x)dx$",
        description: "적분 구간의 방향과 분할에 관한 성질이다.",
        example: "$\\int_0^3 |x-1|dx = \\int_0^1(1-x)dx + \\int_1^3(x-1)dx = \\frac{1}{2}+2 = \\frac{5}{2}$",
        tip: "절댓값 함수의 정적분은 부호가 바뀌는 점에서 구간을 나누어야 한다."
      },
      {
        name: "우함수·기함수의 정적분",
        formula: "$f(-x)=f(x)$이면 $\\int_{-a}^{a}f(x)dx = 2\\int_0^a f(x)dx$\n$f(-x)=-f(x)$이면 $\\int_{-a}^{a}f(x)dx = 0$",
        description: "대칭 구간에서 우함수·기함수의 적분을 간단히 계산할 수 있다.",
        example: "$\\int_{-1}^{1} x^3 dx = 0$ (기함수), $\\int_{-1}^{1} x^2 dx = 2\\int_0^1 x^2 dx = \\frac{2}{3}$ (우함수)",
        tip: "대칭 구간이 주어지면 먼저 우함수/기함수 여부를 확인하자."
      },
      {
        name: "넓이 계산 (두 곡선 사이)",
        formula: "$S = \\int_a^b |f(x) - g(x)|\\,dx$",
        description: "두 곡선 사이의 넓이는 위쪽 함수에서 아래쪽 함수를 뺀 것의 적분이다.",
        example: "$y=x^2$과 $y=x$ 사이: $S=\\int_0^1(x-x^2)dx = \\frac{1}{6}$",
        tip: "교점을 먼저 구하고, 구간별로 어느 함수가 위에 있는지 판별한다."
      },
      {
        name: "속도와 거리 (적분 활용)",
        formula: "$\\text{변위} = \\int_a^b v(t)dt, \\quad \\text{이동거리} = \\int_a^b |v(t)|dt$",
        description: "속도를 적분하면 변위, 속도의 절댓값을 적분하면 이동거리이다.",
        example: "$v(t)=t-2$, $[0,4]$: 변위$=0$, 이동거리$=\\int_0^2(2-t)dt+\\int_2^4(t-2)dt=4$",
        tip: "변위(위치 변화)와 이동거리(총 움직인 거리)는 다르다."
      },
      {
        name: "정적분으로 정의된 함수",
        formula: "$\\frac{d}{dx}\\int_a^x f(t)dt = f(x)$",
        description: "위끝이 x인 정적분을 x로 미분하면 피적분함수가 된다.",
        example: "$F(x) = \\int_0^x (t^2+1)dt$ → $F'(x) = x^2+1$",
        tip: "미적분의 기본정리(FTC)이다. 수능에서 자주 출제되는 핵심 개념이다."
      }
    ]
  },

  // ── 8. 경우의 수 ──────────────────────────────────────────────
  {
    category: "경우의 수",
    formulas: [
      {
        name: "합의 법칙과 곱의 법칙",
        formula: "합의 법칙: $|A \\cup B| = |A| + |B|$ (배반), 곱의 법칙: $|A \\times B| = |A| \\times |B|$",
        description: "동시에 일어나지 않으면 합, 연이어 일어나면 곱으로 계산한다.",
        example: "주사위 두 개를 던질 때 경우의 수: $6 \\times 6 = 36$",
        tip: "'또는'은 합의 법칙, '그리고'는 곱의 법칙에 대응된다."
      },
      {
        name: "순열",
        formula: "$_nP_r = \\frac{n!}{(n-r)!} = n(n-1)(n-2)\\cdots(n-r+1)$",
        description: "n개 중 r개를 뽑아 일렬로 나열하는 경우의 수이다.",
        example: "$_5P_3 = 5 \\times 4 \\times 3 = 60$",
        tip: "순서가 있는 선택이다. 자리 배치, 번호 부여 문제에서 사용한다."
      },
      {
        name: "조합",
        formula: "$_nC_r = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$",
        description: "n개 중 r개를 뽑는 경우의 수 (순서 무관)이다.",
        example: "$_5C_2 = \\frac{5!}{2! \\cdot 3!} = 10$",
        tip: "$_nC_r = _nC_{n-r}$이므로 $r$이 크면 $n-r$로 계산하는 것이 편리하다."
      },
      {
        name: "같은 것이 있는 순열",
        formula: "$\\frac{n!}{p! \\cdot q! \\cdot r! \\cdots} \\quad (p+q+r+\\cdots = n)$",
        description: "같은 종류의 것이 여러 개 있을 때의 순열이다.",
        example: "BANANA의 문자 배열: $\\frac{6!}{1! \\cdot 3! \\cdot 2!} = 60$",
        tip: "같은 것의 개수만큼 나누어 중복을 제거한다."
      },
      {
        name: "원순열",
        formula: "$\\frac{n!}{n} = (n-1)!$",
        description: "원형으로 배열하는 경우의 수로, 회전하여 같은 것은 하나로 센다.",
        example: "5명이 원탁에 앉는 경우: $(5-1)! = 24$",
        tip: "한 사람을 고정하고 나머지를 일렬로 나열하는 것과 같다."
      },
      {
        name: "중복순열",
        formula: "$_n\\Pi_r = n^r$",
        description: "n개 중 중복을 허용하여 r개를 뽑아 나열하는 경우의 수이다.",
        example: "숫자 $1,2,3$으로 만드는 4자리 수: $3^4 = 81$",
        tip: "각 자리마다 n개 선택지가 독립적으로 존재한다."
      },
      {
        name: "중복조합",
        formula: "$_nH_r = _{n+r-1}C_r = \\binom{n+r-1}{r}$",
        description: "n종류에서 중복을 허용하여 r개를 뽑는 경우의 수이다.",
        example: "3종류 과일에서 5개를 고르는 수: $_3H_5 = _7C_5 = 21$",
        tip: "$\\circ$와 $|$를 이용한 칸막이 방법으로 이해하면 직관적이다."
      }
    ]
  },

  // ── 9. 확률 ──────────────────────────────────────────────────
  {
    category: "확률",
    formulas: [
      {
        name: "확률의 정의",
        formula: "$P(A) = \\frac{n(A)}{n(S)} \\quad (0 \\le P(A) \\le 1)$",
        description: "사건 A의 확률은 전체 경우의 수 중 A가 일어나는 경우의 수의 비율이다.",
        example: "주사위를 던져 짝수가 나올 확률: $P = \\frac{3}{6} = \\frac{1}{2}$",
        tip: "각 근원사건의 확률이 같은(등확률) 경우에만 이 공식을 쓸 수 있다."
      },
      {
        name: "확률의 덧셈정리",
        formula: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$",
        description: "두 사건의 합사건 확률이다. 배반이면 $P(A \\cap B)=0$이므로 합이다.",
        example: "카드 52장에서 하트 또는 K: $P=\\frac{13}{52}+\\frac{4}{52}-\\frac{1}{52}=\\frac{16}{52}$",
        tip: "벤다이어그램을 그려서 겹치는 부분을 빼는 것으로 이해하자."
      },
      {
        name: "여사건의 확률",
        formula: "$P(A^c) = 1 - P(A)$",
        description: "사건 A가 일어나지 않을 확률이다.",
        example: "주사위 2개를 던져 합이 4 이상일 확률: $1 - P(\\text{합 ≤ 3}) = 1-\\frac{3}{36}=\\frac{11}{12}$",
        tip: "'적어도 하나'가 나오면 여사건을 먼저 생각하자."
      },
      {
        name: "조건부확률",
        formula: "$P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad (P(B)>0)$",
        description: "사건 B가 일어난 조건에서 사건 A가 일어날 확률이다.",
        example: "주사위에서 짝수일 때 4 이상일 확률: $P = \\frac{P(\\{4,6\\})}{P(\\{2,4,6\\})} = \\frac{2}{3}$",
        tip: "표본공간이 B로 축소된다고 생각하면 직관적이다."
      },
      {
        name: "확률의 곱셈정리",
        formula: "$P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$",
        description: "두 사건이 동시에 일어날 확률이다.",
        example: "비복원추출: 빨간 공 3개, 파란 공 2개에서 연속 빨간 공 뽑을 확률: $\\frac{3}{5} \\cdot \\frac{2}{4} = \\frac{3}{10}$",
        tip: "독립이 아닌 경우 순서에 따라 조건부확률이 달라진다."
      },
      {
        name: "독립사건",
        formula: "$P(A \\cap B) = P(A) \\cdot P(B) \\;\\Leftrightarrow\\; A, B$ 독립",
        description: "한 사건의 발생이 다른 사건의 확률에 영향을 주지 않으면 독립이다.",
        example: "동전 두 번: $P(\\text{앞앞}) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$",
        tip: "$P(A|B) = P(A)$이면 독립이다. 배반과 독립은 다른 개념이다."
      },
      {
        name: "베이즈 정리 (전확률 공식)",
        formula: "$P(B_k|A) = \\frac{P(B_k)P(A|B_k)}{\\sum_{i} P(B_i)P(A|B_i)}$",
        description: "결과(A)를 관찰한 후 원인($B_k$)의 확률을 역으로 구한다.",
        example: "공장 A(60%), B(40%)에서 불량률 2%, 5% → 불량품이 A에서 나왔을 확률: $\\frac{0.6 \\times 0.02}{0.6 \\times 0.02 + 0.4 \\times 0.05}=\\frac{12}{32}$",
        tip: "수능에서는 분할된 원인별로 표를 만들어 계산하면 실수를 줄일 수 있다."
      }
    ]
  },

  // ── 10. 통계 ──────────────────────────────────────────────────
  {
    category: "통계",
    formulas: [
      {
        name: "평균·분산·표준편차",
        formula: "$E(X) = \\sum x_i p_i, \\quad V(X) = E(X^2) - \\{E(X)\\}^2, \\quad \\sigma(X) = \\sqrt{V(X)}$",
        description: "확률변수 X의 기대값, 분산, 표준편차이다.",
        example: "주사위 눈의 기대값: $E(X) = \\frac{1+2+3+4+5+6}{6} = 3.5$",
        tip: "$V(X) = E(X^2) - \\{E(X)\\}^2$이 계산이 가장 빠르다."
      },
      {
        name: "기대값·분산의 성질",
        formula: "$E(aX+b) = aE(X)+b, \\quad V(aX+b) = a^2V(X)$",
        description: "선형변환 시 기대값은 같은 변환, 분산은 계수의 제곱만 영향을 준다.",
        example: "$E(X)=10, V(X)=4$일 때 $E(2X+3)=23$, $V(2X+3)=16$",
        tip: "분산에서 상수 b는 사라지고 계수 a는 제곱된다."
      },
      {
        name: "이항분포",
        formula: "$X \\sim B(n,p)$: $P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$, $E(X)=np$, $V(X)=np(1-p)$",
        description: "성공확률 p인 시행을 n번 반복할 때 성공 횟수의 분포이다.",
        example: "$X \\sim B(10, 0.3)$: $E(X)=3$, $V(X)=2.1$",
        tip: "각 시행이 독립이고 성공확률이 일정해야 이항분포이다."
      },
      {
        name: "정규분포",
        formula: "$X \\sim N(\\mu, \\sigma^2)$: $P(a \\le X \\le b) = P\\left(\\frac{a-\\mu}{\\sigma} \\le Z \\le \\frac{b-\\mu}{\\sigma}\\right)$",
        description: "평균 μ, 분산 σ²인 정규분포를 표준화하여 확률을 구한다.",
        example: "$X \\sim N(50, 10^2)$: $P(X \\le 60) = P(Z \\le 1) = 0.8413$",
        tip: "표준화 공식 $Z = \\frac{X-\\mu}{\\sigma}$을 이용하여 표준정규분포표를 참조한다."
      },
      {
        name: "표준정규분포의 성질",
        formula: "$Z \\sim N(0,1)$: $P(Z \\le 0)=0.5$, $P(-z \\le Z \\le z) = 2P(0 \\le Z \\le z)$",
        description: "평균 0, 표준편차 1인 정규분포이다. y축 대칭이다.",
        example: "$P(-1.96 \\le Z \\le 1.96) = 0.95$",
        tip: "$P(Z \\ge z) = 0.5 - P(0 \\le Z \\le z)$: 대칭성을 활용하자."
      },
      {
        name: "이항분포의 정규근사",
        formula: "$X \\sim B(n,p)$에서 $n$이 충분히 크면 $X \\approx N(np, np(1-p))$",
        description: "n이 크면 이항분포를 정규분포로 근사할 수 있다.",
        example: "$X \\sim B(100, 0.5)$ → $X \\approx N(50, 25)$",
        tip: "수능에서는 주로 $n$이 크고 $np \\ge 5$, $n(1-p) \\ge 5$인 경우에 적용한다."
      },
      {
        name: "모평균의 추정 (신뢰구간)",
        formula: "$\\bar{X} - z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}$",
        description: "모표준편차 σ를 알 때 모평균 μ의 신뢰구간이다.",
        example: "$\\bar{X}=50, \\sigma=10, n=100$, 95% 신뢰구간: $50 \\pm 1.96 \\times 1 = [48.04, 51.96]$",
        tip: "95% → $z=1.96$, 99% → $z=2.58$이다. 표본 크기가 커지면 신뢰구간이 좁아진다."
      },
      {
        name: "표본평균의 분포",
        formula: "$\\bar{X} \\sim N\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$",
        description: "모집단이 정규분포 $N(\\mu, \\sigma^2)$이면 표본평균도 정규분포를 따른다.",
        example: "$X \\sim N(100, 16)$, $n=4$ → $\\bar{X} \\sim N(100, 4)$, $\\sigma_{\\bar{X}}=2$",
        tip: "표본 크기 $n$이 커질수록 표본평균의 분산 $\\frac{\\sigma^2}{n}$이 작아진다."
      }
    ]
  },

  // ── 11. 벡터 ──────────────────────────────────────────────────
  {
    category: "벡터",
    formulas: [
      {
        name: "벡터의 덧셈과 뺄셈",
        formula: "$\\vec{a} + \\vec{b} = (a_1+b_1, a_2+b_2), \\quad \\vec{a} - \\vec{b} = (a_1-b_1, a_2-b_2)$",
        description: "성분끼리 더하거나 빼서 벡터의 합·차를 구한다.",
        example: "$\\vec{a}=(3,1), \\vec{b}=(1,2)$ → $\\vec{a}+\\vec{b}=(4,3)$",
        tip: "기하학적으로 평행사변형법 또는 삼각형법으로 이해할 수 있다."
      },
      {
        name: "벡터의 크기",
        formula: "$|\\vec{a}| = \\sqrt{a_1^2 + a_2^2}$",
        description: "벡터의 크기(길이)는 성분의 제곱합의 양의 제곱근이다.",
        example: "$\\vec{a}=(3,4)$ → $|\\vec{a}|=\\sqrt{9+16}=5$",
        tip: "단위벡터는 $\\frac{\\vec{a}}{|\\vec{a}|}$이다."
      },
      {
        name: "내적 (스칼라곱)",
        formula: "$\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 = |\\vec{a}||\\vec{b}|\\cos\\theta$",
        description: "두 벡터의 내적은 성분곱의 합이며, 두 벡터 사이의 각과 관련된다.",
        example: "$\\vec{a}=(1,2), \\vec{b}=(3,-1)$ → $\\vec{a}\\cdot\\vec{b}=3-2=1$",
        tip: "내적의 결과는 벡터가 아닌 스칼라(수)이다."
      },
      {
        name: "수직·평행 조건",
        formula: "$\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0$\n$\\vec{a} \\parallel \\vec{b} \\Leftrightarrow a_1b_2 - a_2b_1 = 0$",
        description: "내적이 0이면 수직, 성분비가 같으면 평행이다.",
        example: "$\\vec{a}=(2,3), \\vec{b}=(3,-2)$ → $\\vec{a}\\cdot\\vec{b}=6-6=0$ → 수직",
        tip: "수직 조건은 내적=0, 평행 조건은 외적=0으로 기억하자."
      },
      {
        name: "두 벡터 사이의 각",
        formula: "$\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}$",
        description: "내적과 크기를 이용하여 두 벡터 사이의 각을 구한다.",
        example: "$\\vec{a}=(1,0), \\vec{b}=(1,1)$ → $\\cos\\theta = \\frac{1}{\\sqrt{2}}$ → $\\theta=45°$",
        tip: "코사인 값이 양이면 예각, 0이면 직각, 음이면 둔각이다."
      },
      {
        name: "위치벡터와 내분·외분",
        formula: "내분점: $\\vec{p} = \\frac{n\\vec{a}+m\\vec{b}}{m+n}$, 외분점: $\\vec{p} = \\frac{-n\\vec{a}+m\\vec{b}}{m-n}$",
        description: "두 점을 m:n으로 내분·외분하는 점의 위치벡터이다.",
        example: "$A(1,2), B(5,6)$의 중점: $\\frac{\\vec{a}+\\vec{b}}{2} = (3,4)$",
        tip: "중점은 $m=n=1$인 내분점의 특수한 경우이다."
      },
      {
        name: "직선의 벡터 방정식",
        formula: "$\\vec{r} = \\vec{a} + t\\vec{d} \\quad (t \\in \\mathbb{R})$",
        description: "점 A를 지나고 방향벡터 $\\vec{d}$에 평행한 직선의 방정식이다.",
        example: "점 $(1,2)$, 방향벡터 $(3,4)$: $(x,y)=(1+3t, 2+4t)$",
        tip: "매개변수 $t$를 소거하면 일반형 직선의 방정식을 얻는다."
      },
      {
        name: "정사영 (벡터의 사영)",
        formula: "$\\text{proj}_{\\vec{b}}\\vec{a} = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\vec{b}$",
        description: "벡터 $\\vec{a}$를 $\\vec{b}$ 방향으로 사영한 벡터이다.",
        example: "$\\vec{a}=(3,4), \\vec{b}=(1,0)$ → 정사영 $= \\frac{3}{1}(1,0)=(3,0)$",
        tip: "정사영의 크기는 $\\frac{|\\vec{a}\\cdot\\vec{b}|}{|\\vec{b}|}$이다."
      }
    ]
  },

  // ── 12. 공간도형·이차곡선 ──────────────────────────────────────
  {
    category: "공간도형·이차곡선",
    formulas: [
      {
        name: "공간에서 두 점 사이의 거리",
        formula: "$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$",
        description: "3차원 공간에서 두 점 사이의 거리 공식이다.",
        example: "$A(1,2,3), B(4,6,3)$ → $d=\\sqrt{9+16+0}=5$",
        tip: "평면에서의 거리 공식에 z성분을 추가한 것이다."
      },
      {
        name: "구의 방정식",
        formula: "$(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$",
        description: "중심 $(a,b,c)$, 반지름 $r$인 구의 방정식이다.",
        example: "중심 $(1,2,3)$, 반지름 $4$: $(x-1)^2+(y-2)^2+(z-3)^2=16$",
        tip: "일반형 $x^2+y^2+z^2+Ax+By+Cz+D=0$에서 완전제곱식으로 변환하여 중심과 반지름을 구한다."
      },
      {
        name: "점과 평면 사이의 거리",
        formula: "$d = \\frac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}$",
        description: "점 $(x_1,y_1,z_1)$에서 평면 $ax+by+cz+d=0$까지의 거리이다.",
        example: "$(1,0,0)$에서 $x+y+z-3=0$까지: $d=\\frac{|1+0+0-3|}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$",
        tip: "평면의 방정식에서 법선벡터는 $(a,b,c)$이다."
      },
      {
        name: "포물선의 방정식",
        formula: "$y^2 = 4px$: 초점 $(p,0)$, 준선 $x=-p$\n$x^2 = 4py$: 초점 $(0,p)$, 준선 $y=-p$",
        description: "초점까지의 거리와 준선까지의 거리가 같은 점의 궤적이 포물선이다.",
        example: "$y^2=12x$: $4p=12$, $p=3$ → 초점 $(3,0)$, 준선 $x=-3$",
        tip: "포물선 위의 점에서 초점까지의 거리 = 준선까지의 거리이다."
      },
      {
        name: "타원의 방정식",
        formula: "$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\;(a>b>0)$: 초점 $(\\pm c, 0)$, $c^2=a^2-b^2$",
        description: "두 초점까지의 거리의 합이 $2a$로 일정한 점의 궤적이다.",
        example: "$\\frac{x^2}{25}+\\frac{y^2}{9}=1$: $a=5, b=3, c=4$ → 초점 $(\\pm 4, 0)$",
        tip: "장축 길이 $2a$, 단축 길이 $2b$, $c^2 = a^2 - b^2$이다."
      },
      {
        name: "쌍곡선의 방정식",
        formula: "$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$: 초점 $(\\pm c, 0)$, $c^2=a^2+b^2$, 점근선 $y=\\pm\\frac{b}{a}x$",
        description: "두 초점까지의 거리의 차가 $2a$로 일정한 점의 궤적이다.",
        example: "$\\frac{x^2}{4}-\\frac{y^2}{5}=1$: $a=2, b=\\sqrt{5}, c=3$ → 초점 $(\\pm 3, 0)$",
        tip: "쌍곡선은 $c^2=a^2+b^2$ (타원과 다름!), 점근선이 존재한다."
      },
      {
        name: "이차곡선의 이심률",
        formula: "타원: $e = \\frac{c}{a} < 1$, 포물선: $e = 1$, 쌍곡선: $e = \\frac{c}{a} > 1$",
        description: "이심률은 이차곡선의 모양을 결정하는 값이다.",
        example: "타원 $\\frac{x^2}{25}+\\frac{y^2}{9}=1$: $e=\\frac{4}{5}=0.8$",
        tip: "이심률이 0에 가까우면 원에 가깝고, 1에 가까우면 찌그러진 타원이다."
      },
      {
        name: "이차곡선과 직선의 관계",
        formula: "직선 $y=mx+n$을 이차곡선에 대입 → 판별식 $D$로 교점 개수 판별",
        description: "$D>0$이면 2개 교점(할선), $D=0$이면 1개(접선), $D<0$이면 교점 없음이다.",
        example: "$y=x+k$와 $x^2+y^2=1$: $(1+1)x^2+2kx+(k^2-1)=0$ → $D=4-4(2)(k^2-1)>0$",
        tip: "접선의 조건($D=0$)에서 기울기나 상수항을 결정하는 문제가 빈출이다."
      }
    ]
  }
];
