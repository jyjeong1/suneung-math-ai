const FORMULA_BANK = [
  {
    category: "부정적분 기본",
    formulas: [
      { name: "부정적분 정의", formula: "$\\int f(x)dx = F(x) + C \\quad (F'(x)=f(x))$", description: "미분의 역연산이다. 적분상수 C를 반드시 붙여야 한다.", example: "$\\int 3x^2 dx = x^3 + C$", tip: "부정적분은 '미분하면 f(x)가 되는 함수'를 찾는 것이다." },
      { name: "거듭제곱 적분", formula: "$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$", description: "지수에 1을 더하고 그 수로 나눈다.", example: "$\\int x^4 dx = \\frac{x^5}{5} + C$", tip: "$n=-1$일 때는 $\\int \\frac{1}{x}dx = \\ln|x| + C$이다." },
      { name: "상수배·합차 적분", formula: "$\\int kf(x)dx = k\\int f(x)dx$, $\\int [f(x) \\pm g(x)]dx = \\int f(x)dx \\pm \\int g(x)dx$", description: "상수는 밖으로, 합차는 따로 적분한다.", example: "$\\int (3x^2 - 2x + 1)dx = x^3 - x^2 + x + C$", tip: "곱이나 몫은 이 규칙이 적용되지 않는다!" },
      { name: "삼각함수 적분", formula: "$\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$", description: "사인을 적분하면 -코사인, 코사인을 적분하면 사인이다.", example: "$\\int \\cos 2x\\,dx = \\frac{1}{2}\\sin 2x + C$", tip: "부호 실수가 잦다. sin→-cos, cos→sin을 정확히 기억하자." },
      { name: "지수·로그함수 적분", formula: "$\\int e^x dx = e^x + C$, $\\int a^x dx = \\frac{a^x}{\\ln a} + C$", description: "$e^x$는 적분해도 자기 자신이다.", example: "$\\int 2^x dx = \\frac{2^x}{\\ln 2} + C$", tip: "$\\int e^{ax}dx = \\frac{1}{a}e^{ax} + C$로 확장된다." }
    ]
  },
  {
    category: "정적분",
    formulas: [
      { name: "정적분 정의", formula: "$\\int_a^b f(x)dx = F(b) - F(a)$", description: "부정적분의 위끝값에서 아래끝값을 뺀다. (미적분의 기본정리)", example: "$\\int_1^3 2x\\,dx = [x^2]_1^3 = 9 - 1 = 8$", tip: "정적분은 적분상수 C가 필요 없다." },
      { name: "정적분의 성질", formula: "$\\int_a^b f(x)dx = -\\int_b^a f(x)dx$, $\\int_a^a f(x)dx = 0$", description: "적분 구간을 바꾸면 부호가 바뀐다.", example: "$\\int_3^1 2x\\,dx = -\\int_1^3 2x\\,dx = -8$", tip: "$\\int_a^c = \\int_a^b + \\int_b^c$ (구간 분할)도 중요하다." },
      { name: "우함수·기함수 정적분", formula: "$f(-x)=f(x)$이면 $\\int_{-a}^a f(x)dx = 2\\int_0^a f(x)dx$\n$f(-x)=-f(x)$이면 $\\int_{-a}^a f(x)dx = 0$", description: "대칭 구간에서 우함수는 2배, 기함수는 0이다.", example: "$\\int_{-1}^1 x^3 dx = 0$ (기함수)", tip: "수능에서 계산을 줄여주는 핵심 성질이다." },
      { name: "치환적분", formula: "$\\int_a^b f(g(x))g'(x)dx = \\int_{g(a)}^{g(b)} f(t)dt$", description: "$t=g(x)$로 치환하면 $dt=g'(x)dx$이다.", example: "$\\int_0^1 2x(x^2+1)^3 dx$에서 $t=x^2+1$으로 치환", tip: "치환 후 적분 구간도 바꿔야 한다!" },
      { name: "부분적분", formula: "$\\int f(x)g'(x)dx = f(x)g(x) - \\int f'(x)g(x)dx$", description: "곱의 미분법의 역연산이다. LIATE 순서로 f를 선택한다.", example: "$\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x + \\cos x + C$", tip: "로그(L)→역삼각(I)→대수(A)→삼각(T)→지수(E) 순서로 f를 정한다." }
    ]
  },
  {
    category: "정적분과 넓이",
    formulas: [
      { name: "곡선과 x축 사이 넓이", formula: "$S = \\int_a^b |f(x)|\\,dx$", description: "함수값이 음수인 구간에서는 절대값을 씌워야 한다.", example: "$y=x^2-1$과 x축: $S = \\int_{-1}^1 |x^2-1|dx = \\int_{-1}^1 (1-x^2)dx$", tip: "f(x)의 부호가 바뀌는 점에서 구간을 나눠야 한다." },
      { name: "두 곡선 사이 넓이", formula: "$S = \\int_a^b |f(x) - g(x)|\\,dx$", description: "위에 있는 곡선에서 아래 곡선을 뺀다.", example: "$y=x$와 $y=x^2$ 사이 넓이: $\\int_0^1 (x - x^2)dx = \\frac{1}{6}$", tip: "먼저 교점을 구해서 적분 구간을 정한다." },
      { name: "포물선·직선 넓이 공식", formula: "$S = \\frac{|a|}{6}(\\beta - \\alpha)^3$ (3차 공식)", description: "$y=a(x-\\alpha)(x-\\beta)$와 x축 사이 넓이이다.", example: "$y=x^2-4x+3=(x-1)(x-3)$과 x축: $S = \\frac{1}{6}(3-1)^3 = \\frac{4}{3}$", tip: "1/6 공식, 1/12 공식은 수능에서 계산 시간을 절약해준다." },
      { name: "y축 기준 넓이", formula: "$S = \\int_c^d |x|\\,dy = \\int_c^d |g(y)|\\,dy$", description: "x=g(y)로 놓고 y에 대해 적분한다.", example: "$x=y^2$와 y축 사이: $\\int_0^2 y^2 dy = \\frac{8}{3}$", tip: "y축 기준이 편한 경우 적극 활용하자." }
    ]
  },
  {
    category: "정적분과 급수",
    formulas: [
      { name: "구분구적법", formula: "$\\int_a^b f(x)dx = \\lim_{n \\to \\infty} \\sum_{k=1}^n f\\left(a + \\frac{(b-a)k}{n}\\right) \\cdot \\frac{b-a}{n}$", description: "정적분을 급수의 극한으로 정의한다.", example: "$\\lim_{n \\to \\infty} \\sum_{k=1}^n \\frac{1}{n}f\\left(\\frac{k}{n}\\right) = \\int_0^1 f(x)dx$", tip: "급수→정적분 변환: $\\frac{k}{n} \\to x$, $\\frac{1}{n} \\to dx$" },
      { name: "급수와 정적분 관계", formula: "$\\lim_{n \\to \\infty} \\frac{1}{n}\\sum_{k=1}^n f\\left(\\frac{k}{n}\\right) = \\int_0^1 f(x)dx$", description: "구간 [0,1]에서의 정적분과 같다.", example: "$\\lim_{n\\to\\infty} \\frac{1}{n}\\sum_{k=1}^n \\frac{k}{n} = \\int_0^1 x\\,dx = \\frac{1}{2}$", tip: "수능 단골 문제! 급수 형태를 보면 정적분으로 바꿔보자." }
    ]
  },
  {
    category: "속도·거리",
    formulas: [
      { name: "속도에서 위치", formula: "$x(t) = x(0) + \\int_0^t v(s)\\,ds$", description: "속도를 적분하면 위치(변위)를 구할 수 있다.", example: "$v(t)=3t^2$이면 $x(t) = x(0) + t^3$", tip: "위치 = 초기 위치 + 변위(속도의 적분)" },
      { name: "이동 거리", formula: "$\\text{이동 거리} = \\int_a^b |v(t)|\\,dt$", description: "속도의 절대값을 적분하면 실제 이동 거리이다. 변위와 다르다!", example: "왕복 운동 시: 변위=0이지만 이동 거리>0", tip: "$v(t)=0$인 점에서 방향이 바뀌므로 구간을 나눠야 한다." },
      { name: "가속도에서 속도", formula: "$v(t) = v(0) + \\int_0^t a(s)\\,ds$", description: "가속도를 적분하면 속도를 구할 수 있다.", example: "$a(t)=6t$이면 $v(t) = v(0) + 3t^2$", tip: "위치→속도→가속도는 미분, 역방향은 적분이다." },
      { name: "변위와 이동 거리 비교", formula: "변위: $\\int_a^b v(t)dt$ (부호 있음)\n이동 거리: $\\int_a^b |v(t)|dt$ (항상 양수)", description: "변위는 출발점에서 도착점까지의 순수 이동, 이동 거리는 실제 움직인 총 길이이다.", example: "$v(t)=t-2$, $[0,4]$: 변위=$\\int_0^4(t-2)dt=0$, 이동거리=$\\int_0^4|t-2|dt=4$", tip: "수능에서 변위와 이동 거리를 구분하는 문제가 자주 출제된다." }
    ]
  },
  {
    category: "정적분 활용",
    formulas: [
      { name: "정적분으로 정의된 함수", formula: "$F(x) = \\int_a^x f(t)dt$이면 $F'(x) = f(x)$", description: "적분의 위끝이 변수이면 미분하면 피적분함수가 된다.", example: "$F(x) = \\int_0^x (t^2+1)dt$이면 $F'(x) = x^2+1$", tip: "아래끝이 변수이면 부호가 바뀐다: $\\frac{d}{dx}\\int_x^a f(t)dt = -f(x)$" },
      { name: "정적분 방정식", formula: "$\\int_a^b f(x)dx = k$를 만족하는 상수 구하기", description: "적분 결과가 상수와 같다는 조건에서 미정계수를 결정한다.", example: "$\\int_0^2 (ax+1)dx = 6$에서 $[\\frac{a}{2}x^2+x]_0^2 = 2a+2 = 6$, $a=2$", tip: "f(x) 안에 미지수가 있으면 정적분 후 방정식을 세운다." },
      { name: "넓이의 최솟값", formula: "넓이 $S(t) = \\int_a^b |f(x)-t|dx$의 최솟값 구하기", description: "매개변수가 포함된 넓이 함수의 최솟값을 구한다.", example: "$S(t) = \\int_0^2 |x-t|dx$의 최솟값은 $t=1$일 때", tip: "$S'(t)=0$으로 극값을 구하거나, 기하학적 직관을 활용한다." }
    ]
  }
];
