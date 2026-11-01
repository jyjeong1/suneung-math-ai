// 수능 수학 함수의 극한과 연속 공식 레퍼런스
const FORMULA_BANK = [
  // ─────────────────────────────────────────────
  // 1. 함수의 극한 기본
  // ─────────────────────────────────────────────
  {
    category: "함수의 극한 기본",
    formulas: [
      {
        name: "극한의 정의",
        formula: "$\\lim_{x \\to a} f(x) = L$",
        description: "$x$가 $a$에 한없이 가까워질 때 $f(x)$가 $L$에 한없이 가까워지면 극한값은 $L$",
        example: "$\\lim_{x \\to 2} (3x+1) = 7$",
        tip: "x = a에서의 함수값 f(a)와 극한값은 다를 수 있다."
      },
      {
        name: "좌극한",
        formula: "$\\lim_{x \\to a^-} f(x) = L$",
        description: "$x$가 $a$보다 작은 쪽에서 $a$에 접근할 때의 극한",
        example: "$\\lim_{x \\to 0^-} \\dfrac{|x|}{x} = -1$",
        tip: "좌극한은 x < a인 영역에서 접근. 그래프 왼쪽에서 읽는다."
      },
      {
        name: "우극한",
        formula: "$\\lim_{x \\to a^+} f(x) = L$",
        description: "$x$가 $a$보다 큰 쪽에서 $a$에 접근할 때의 극한",
        example: "$\\lim_{x \\to 0^+} \\dfrac{|x|}{x} = 1$",
        tip: "우극한은 x > a인 영역에서 접근. 그래프 오른쪽에서 읽는다."
      },
      {
        name: "극한의 존재 조건",
        formula: "$\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$",
        description: "좌극한과 우극한이 같을 때만 극한이 존재한다",
        example: "$f(x) = \\begin{cases} x+1 & (x<1) \\\\ 3-x & (x \\geq 1) \\end{cases}$: 좌극한=2, 우극한=2 → 극한=2",
        tip: "수능 단골: 좌극한 ≠ 우극한이면 극한 존재하지 않음."
      },
      {
        name: "극한값과 함수값의 관계",
        formula: "$\\lim_{x \\to a} f(x) = L \\text{이더라도 } f(a) \\neq L \\text{일 수 있음}$",
        description: "극한값은 $x = a$에서의 함수값과 무관하게 결정된다",
        example: "$f(x) = \\begin{cases} x^2 & (x \\neq 1) \\\\ 5 & (x = 1) \\end{cases}$: $\\lim_{x \\to 1} f(x) = 1 \\neq f(1) = 5$",
        tip: "극한은 '가까이 갈 때'의 경향이지, 해당 점의 값이 아니다."
      },
      {
        name: "극한의 대소 관계",
        formula: "$f(x) \\leq g(x) \\Rightarrow \\lim_{x \\to a} f(x) \\leq \\lim_{x \\to a} g(x)$",
        description: "부등식 관계는 극한에서도 보존된다 (단, 등호 포함)",
        example: "$x^2 \\geq 0 \\Rightarrow \\lim_{x \\to 0} x^2 \\geq 0$",
        tip: "엄격 부등식(<)은 극한에서 등호(≤)로 바뀔 수 있다."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 2. 극한값 계산
  // ─────────────────────────────────────────────
  {
    category: "극한값 계산",
    formulas: [
      {
        name: "직접 대입법",
        formula: "$\\lim_{x \\to a} f(x) = f(a)$",
        description: "$f(x)$가 $x=a$에서 연속이면 직접 대입으로 극한값을 구한다",
        example: "$\\lim_{x \\to 3} (x^2 - 2x + 1) = 9 - 6 + 1 = 4$",
        tip: "대입해서 부정형이 아니면 바로 답이다. 가장 먼저 시도할 것."
      },
      {
        name: "극한의 사칙연산",
        formula: "$\\lim_{x \\to a} [f(x) \\pm g(x)] = L \\pm M$",
        description: "$\\lim f(x) = L,\\; \\lim g(x) = M$일 때 합·차·곱·몫의 극한",
        example: "$\\lim_{x \\to 1} (x^2 + 3x) = 1 + 3 = 4$",
        tip: "몫의 극한에서 분모의 극한값이 0이면 사용 불가."
      },
      {
        name: "인수분해 후 약분",
        formula: "$\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = \\lim_{x \\to a} \\dfrac{f(x)/(x-a)}{g(x)/(x-a)}$",
        description: "분자·분모가 모두 0이 되는 $\\dfrac{0}{0}$형일 때 $(x-a)$를 약분",
        example: "$\\lim_{x \\to 2} \\dfrac{x^2-4}{x-2} = \\lim_{x \\to 2} \\dfrac{(x-2)(x+2)}{x-2} = 4$",
        tip: "0/0 꼴이 나오면 반드시 인수분해를 시도한다."
      },
      {
        name: "유리화",
        formula: "$\\dfrac{\\sqrt{A}-\\sqrt{B}}{C} \\times \\dfrac{\\sqrt{A}+\\sqrt{B}}{\\sqrt{A}+\\sqrt{B}}$",
        description: "무리식이 포함된 극한에서 분자 또는 분모를 유리화",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sqrt{x+1}-1}{x} = \\lim_{x \\to 0} \\dfrac{1}{\\sqrt{x+1}+1} = \\dfrac{1}{2}$",
        tip: "√A - √B 형태가 보이면 √A + √B를 곱하여 유리화."
      },
      {
        name: "다항식의 극한",
        formula: "$\\lim_{x \\to a} (c_n x^n + \\cdots + c_0) = c_n a^n + \\cdots + c_0$",
        description: "다항함수는 모든 점에서 연속이므로 직접 대입 가능",
        example: "$\\lim_{x \\to -1} (2x^3 + x - 3) = -2 - 1 - 3 = -6$",
        tip: "다항함수, 지수함수, 삼각함수 등 연속함수는 대입이 정석."
      },
      {
        name: "분수식의 극한",
        formula: "$\\lim_{x \\to a} \\dfrac{p(x)}{q(x)} = \\dfrac{p(a)}{q(a)} \\quad (q(a) \\neq 0)$",
        description: "분모가 0이 아니면 직접 대입",
        example: "$\\lim_{x \\to 1} \\dfrac{x^2+1}{x+2} = \\dfrac{2}{3}$",
        tip: "분모 = 0이면 부정형 또는 발산. 분자도 0인지 확인."
      },
      {
        name: "곱의 극한 (0 × 유계)",
        formula: "$\\lim_{x \\to a} f(x) = 0,\\; |g(x)| \\leq M \\Rightarrow \\lim_{x \\to a} f(x)g(x) = 0$",
        description: "0에 수렴하는 함수와 유계인 함수의 곱은 0으로 수렴",
        example: "$\\lim_{x \\to 0} x\\sin\\dfrac{1}{x} = 0$ ($|\\sin\\frac{1}{x}| \\leq 1$)",
        tip: "0 × ∞ 형태에서도 유계 조건이 있으면 0으로 수렴."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 3. 부정형의 극한
  // ─────────────────────────────────────────────
  {
    category: "부정형의 극한",
    formulas: [
      {
        name: "0/0형 기본",
        formula: "$\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} \\quad (f(a)=0,\\; g(a)=0)$",
        description: "분자와 분모가 모두 0이 되는 부정형. 인수분해·유리화로 해결",
        example: "$\\lim_{x \\to 1} \\dfrac{x^2-1}{x-1} = \\lim_{x \\to 1} (x+1) = 2$",
        tip: "0/0은 '결정 불가'를 뜻하지 '0'이 아니다. 반드시 변형 후 계산."
      },
      {
        name: "0/0형에서 인수정리 활용",
        formula: "$f(a) = 0 \\Rightarrow f(x) = (x-a)Q(x)$",
        description: "$f(a) = 0$이면 $f(x)$는 $(x-a)$를 인수로 가진다",
        example: "$\\lim_{x \\to 2} \\dfrac{x^3-8}{x^2-4} = \\lim_{x \\to 2} \\dfrac{(x-2)(x^2+2x+4)}{(x-2)(x+2)} = 3$",
        tip: "고차다항식은 조립제법으로 빠르게 인수분해."
      },
      {
        name: "∞/∞형",
        formula: "$\\lim_{x \\to \\infty} \\dfrac{f(x)}{g(x)} \\quad (f, g \\to \\infty)$",
        description: "분자·분모가 모두 무한대로 발산하는 부정형",
        example: "$\\lim_{x \\to \\infty} \\dfrac{3x^2+x}{x^2-1} = 3$",
        tip: "최고차항으로 나누어 정리하는 것이 기본 전략."
      },
      {
        name: "∞ - ∞형",
        formula: "$\\lim_{x \\to a} [f(x) - g(x)] \\quad (f, g \\to \\infty)$",
        description: "두 무한대의 차. 통분이나 유리화로 해결",
        example: "$\\lim_{x \\to \\infty} (\\sqrt{x^2+x} - x) = \\lim \\dfrac{x}{\\sqrt{x^2+x}+x} = \\dfrac{1}{2}$",
        tip: "무리식이면 유리화, 분수식이면 통분이 핵심."
      },
      {
        name: "0 × ∞형",
        formula: "$\\lim_{x \\to a} f(x) \\cdot g(x) \\quad (f \\to 0,\\; g \\to \\infty)$",
        description: "0과 ∞의 곱. 분수 형태로 변환하여 0/0 또는 ∞/∞형으로 바꿈",
        example: "$\\lim_{x \\to 0^+} x \\ln x = \\lim_{x \\to 0^+} \\dfrac{\\ln x}{1/x}$ (∞/∞형으로 변환)",
        tip: "f·g = f/(1/g) 또는 g/(1/f)로 변환. 더 다루기 쉬운 쪽을 선택."
      },
      {
        name: "부정형 판별 요약",
        formula: "$\\dfrac{0}{0},\\; \\dfrac{\\infty}{\\infty},\\; 0 \\times \\infty,\\; \\infty - \\infty,\\; 1^\\infty,\\; 0^0,\\; \\infty^0$",
        description: "7가지 부정형. 수능에서는 주로 $\\dfrac{0}{0}$과 $\\dfrac{\\infty}{\\infty}$가 출제",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}$: $\\dfrac{0}{0}$형 → 답은 1",
        tip: "부정형이 아닌 경우: 0/∞ = 0, ∞/0 = ±∞ (발산), 상수/0 = 발산."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 4. 무한대에서의 극한
  // ─────────────────────────────────────────────
  {
    category: "무한대에서의 극한",
    formulas: [
      {
        name: "최고차항 비교 (차수 같을 때)",
        formula: "$\\lim_{x \\to \\infty} \\dfrac{a_n x^n + \\cdots}{b_n x^n + \\cdots} = \\dfrac{a_n}{b_n}$",
        description: "분자·분모의 최고차항의 차수가 같으면 최고차항 계수의 비",
        example: "$\\lim_{x \\to \\infty} \\dfrac{3x^2+x+1}{2x^2-5} = \\dfrac{3}{2}$",
        tip: "가장 기본적인 유형. 최고차항만 남기면 끝."
      },
      {
        name: "분자 차수 > 분모 차수",
        formula: "$\\lim_{x \\to \\infty} \\dfrac{a_m x^m + \\cdots}{b_n x^n + \\cdots} = \\pm\\infty \\quad (m > n)$",
        description: "분자의 차수가 더 높으면 발산",
        example: "$\\lim_{x \\to \\infty} \\dfrac{x^3+1}{x^2+2} = \\infty$",
        tip: "발산 방향(+∞ or -∞)은 최고차항 계수의 부호로 결정."
      },
      {
        name: "분자 차수 < 분모 차수",
        formula: "$\\lim_{x \\to \\infty} \\dfrac{a_m x^m + \\cdots}{b_n x^n + \\cdots} = 0 \\quad (m < n)$",
        description: "분자의 차수가 더 낮으면 0으로 수렴",
        example: "$\\lim_{x \\to \\infty} \\dfrac{2x+1}{x^2-3} = 0$",
        tip: "분모가 더 빨리 커지므로 전체는 0으로 간다."
      },
      {
        name: "무리식의 극한 (x → ∞)",
        formula: "$\\lim_{x \\to \\infty} (\\sqrt{ax^2+bx+c} - dx)$: 유리화 후 계산",
        description: "∞ - ∞ 형태의 무리식. 유리화하여 유한한 값을 구한다",
        example: "$\\lim_{x \\to \\infty} (\\sqrt{x^2+3x} - x) = \\lim \\dfrac{3x}{\\sqrt{x^2+3x}+x} = \\dfrac{3}{2}$",
        tip: "√(ax²+bx)에서 x > 0이면 √(x²) = x로 처리."
      },
      {
        name: "x → -∞에서의 처리",
        formula: "$x \\to -\\infty$일 때 $\\sqrt{x^2} = |x| = -x$",
        description: "$x < 0$이면 $\\sqrt{x^2} = -x$임에 주의",
        example: "$\\lim_{x \\to -\\infty} \\dfrac{\\sqrt{4x^2+1}}{x} = \\dfrac{-2x}{x} = -2$",
        tip: "x → -∞에서 √(x²) = -x. 부호 실수가 잦으니 주의."
      },
      {
        name: "1/x 치환",
        formula: "$x \\to \\infty$일 때 $t = \\dfrac{1}{x}$로 치환하면 $t \\to 0^+$",
        description: "무한대 극한을 0에서의 극한으로 변환하는 기법",
        example: "$\\lim_{x \\to \\infty} x\\sin\\dfrac{1}{x} = \\lim_{t \\to 0^+} \\dfrac{\\sin t}{t} = 1$",
        tip: "삼각함수 + 무한대 문제에서 매우 유용한 치환."
      },
      {
        name: "지수함수의 극한",
        formula: "$\\lim_{x \\to \\infty} a^x = \\begin{cases} \\infty & (a > 1) \\\\ 0 & (0 < a < 1) \\end{cases}$",
        description: "밑이 1보다 크면 발산, 1보다 작으면 0으로 수렴",
        example: "$\\lim_{x \\to \\infty} 2^x = \\infty,\\; \\lim_{x \\to \\infty} \\left(\\dfrac{1}{2}\\right)^x = 0$",
        tip: "밑 a의 크기에 따라 결과가 완전히 달라진다."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 5. 삼각함수의 극한
  // ─────────────────────────────────────────────
  {
    category: "삼각함수의 극한",
    formulas: [
      {
        name: "기본 공식",
        formula: "$\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1$",
        description: "삼각함수 극한의 가장 핵심적인 공식 ($x$는 라디안)",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sin 3x}{3x} = 1$",
        tip: "sin 안의 식과 분모가 같아야 1이 된다. 다르면 비율을 맞춘다."
      },
      {
        name: "역수 형태",
        formula: "$\\lim_{x \\to 0} \\dfrac{x}{\\sin x} = 1$",
        description: "기본 공식의 역수",
        example: "$\\lim_{x \\to 0} \\dfrac{2x}{\\sin 2x} = 1$",
        tip: "분자·분모 뒤집어도 극한값은 1의 역수 = 1."
      },
      {
        name: "계수 조정",
        formula: "$\\lim_{x \\to 0} \\dfrac{\\sin ax}{bx} = \\dfrac{a}{b}$",
        description: "$\\sin$ 안의 계수와 분모의 계수가 다를 때",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sin 5x}{3x} = \\dfrac{5}{3}$",
        tip: "sin(ax)/(bx) = (a/b) · sin(ax)/(ax)로 변형."
      },
      {
        name: "탄젠트 극한",
        formula: "$\\lim_{x \\to 0} \\dfrac{\\tan x}{x} = 1$",
        description: "$\\tan x = \\dfrac{\\sin x}{\\cos x}$이고 $\\cos 0 = 1$이므로",
        example: "$\\lim_{x \\to 0} \\dfrac{\\tan 2x}{x} = 2$",
        tip: "tan x/x = (sin x/x) · (1/cos x) → 1 · 1 = 1."
      },
      {
        name: "sin끼리의 비",
        formula: "$\\lim_{x \\to 0} \\dfrac{\\sin ax}{\\sin bx} = \\dfrac{a}{b}$",
        description: "두 사인함수의 비에서 각각의 계수비가 극한값",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sin 3x}{\\sin 7x} = \\dfrac{3}{7}$",
        tip: "sin(ax)/sin(bx) = (sin(ax)/(ax)) · (bx/sin(bx)) · (a/b)."
      },
      {
        name: "합성함수 치환",
        formula: "$\\lim_{x \\to a} \\dfrac{\\sin f(x)}{f(x)} = 1 \\quad (f(a)=0)$",
        description: "$f(x) \\to 0$이면 $t = f(x)$로 치환하여 기본 공식 적용",
        example: "$\\lim_{x \\to 1} \\dfrac{\\sin(x^2-1)}{x-1} = \\lim_{x \\to 1} \\dfrac{\\sin(x^2-1)}{x^2-1} \\cdot (x+1) = 1 \\cdot 2 = 2$",
        tip: "sin(□)/□ 형태를 만드는 것이 핵심. □ = f(x) → 0."
      },
      {
        name: "1 - cos x 공식",
        formula: "$\\lim_{x \\to 0} \\dfrac{1 - \\cos x}{x^2} = \\dfrac{1}{2}$",
        description: "$1 - \\cos x = 2\\sin^2\\dfrac{x}{2}$를 이용하여 유도",
        example: "$\\lim_{x \\to 0} \\dfrac{1 - \\cos 2x}{x^2} = \\lim \\dfrac{2\\sin^2 x}{x^2} = 2$",
        tip: "1 - cos x ≈ x²/2 (x → 0). 이 근사를 기억하면 빠르다."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 6. 함수의 연속
  // ─────────────────────────────────────────────
  {
    category: "함수의 연속",
    formulas: [
      {
        name: "연속의 정의",
        formula: "$f(x)\\text{가 }x=a\\text{에서 연속} \\iff \\lim_{x \\to a} f(x) = f(a)$",
        description: "세 조건을 모두 만족: ① $f(a)$ 존재 ② 극한 존재 ③ 극한값 = 함수값",
        example: "$f(x) = x^2$은 모든 실수에서 연속",
        tip: "연속 = '그래프를 끊지 않고 그릴 수 있다'는 직관."
      },
      {
        name: "연속의 3조건",
        formula: "$\\text{(i) } f(a) \\text{ 정의됨} \\quad \\text{(ii) } \\lim_{x \\to a} f(x) \\text{ 존재} \\quad \\text{(iii) } \\lim_{x \\to a} f(x) = f(a)$",
        description: "하나라도 불만족이면 불연속. 수능에서 조건 판별이 자주 출제",
        example: "$f(x) = \\dfrac{x^2-1}{x-1}$은 $x=1$에서 (i) 불만족 → 불연속",
        tip: "조건별로 불연속 유형이 다르다: 정의 안 됨, 극한 없음, 값 불일치."
      },
      {
        name: "제거 가능한 불연속",
        formula: "$\\lim_{x \\to a} f(x) = L \\text{ 존재하지만 } f(a) \\neq L \\text{ 또는 } f(a) \\text{ 미정의}$",
        description: "$f(a) = L$로 재정의하면 연속이 되는 불연속",
        example: "$f(x) = \\dfrac{x^2-4}{x-2}$: $x=2$에서 재정의 $f(2)=4$로 연속화",
        tip: "수능에서 미정계수 문제의 핵심. 극한값으로 함수값을 결정."
      },
      {
        name: "점프 불연속 (비약 불연속)",
        formula: "$\\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x)$",
        description: "좌극한과 우극한이 다른 불연속. 재정의로 해결 불가",
        example: "$f(x) = [x]$ (가우스 함수)는 정수점에서 점프 불연속",
        tip: "그래프에서 '계단'이 보이면 점프 불연속."
      },
      {
        name: "구간에서의 연속",
        formula: "$f(x)\\text{가 개구간 }(a, b)\\text{의 모든 점에서 연속}$",
        description: "열린 구간에서의 연속. 닫힌 구간 $[a, b]$에서는 양 끝점에서 편측 연속 추가",
        example: "$f(x) = \\sqrt{x}$는 $(0, \\infty)$에서 연속, $[0, \\infty)$에서도 연속",
        tip: "닫힌 구간 연속: x=a에서 우연속, x=b에서 좌연속 포함."
      },
      {
        name: "연속함수의 사칙연산",
        formula: "$f, g \\text{ 연속} \\Rightarrow f \\pm g,\\; f \\cdot g,\\; \\dfrac{f}{g}\\;(g \\neq 0) \\text{ 연속}$",
        description: "연속함수의 합·차·곱·몫도 연속 (분모 ≠ 0)",
        example: "$f(x) = x^2 + \\sin x$는 연속 (다항 + 삼각함수)",
        tip: "합성함수도 연속: f, g 연속이면 f(g(x))도 연속."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 7. 연속함수의 성질
  // ─────────────────────────────────────────────
  {
    category: "연속함수의 성질",
    formulas: [
      {
        name: "중간값 정리",
        formula: "$f\\text{가 }[a,b]\\text{에서 연속이고 }f(a) \\neq f(b)\\text{이면, }f(a)\\text{와 }f(b)\\text{ 사이 모든 값을 가진다}$",
        description: "닫힌 구간에서 연속인 함수는 중간값을 반드시 지난다",
        example: "$f(x) = x^3 - 2$: $f(1)=-1<0,\\; f(2)=6>0$ → $(1,2)$에서 근 존재",
        tip: "방정식의 근의 존재성 증명에 핵심적으로 사용."
      },
      {
        name: "사잇값 정리 (근의 존재)",
        formula: "$f(a) \\cdot f(b) < 0 \\Rightarrow f(c) = 0$인 $c \\in (a,b)$ 존재",
        description: "연속함수에서 양 끝값의 부호가 다르면 그 사이에 근이 존재",
        example: "$f(x) = x^2 - 2$: $f(1)=-1,\\; f(2)=2$ → $f(1) \\cdot f(2) < 0$ → 근 존재",
        tip: "f(a)·f(b) < 0 확인이 핵심. 수능에서 근의 개수 문제에 활용."
      },
      {
        name: "최대·최소 정리",
        formula: "$f\\text{가 }[a,b]\\text{에서 연속} \\Rightarrow \\text{최댓값 }M\\text{과 최솟값 }m\\text{이 존재}$",
        description: "닫힌 구간에서 연속인 함수는 반드시 최대·최소를 가진다",
        example: "$f(x) = x^2$은 $[-1, 2]$에서 최솟값 $0$, 최댓값 $4$",
        tip: "열린 구간 (a,b)에서는 최대·최소가 존재하지 않을 수 있다."
      },
      {
        name: "중간값 정리의 활용 (해의 개수)",
        formula: "구간을 분할하여 부호 변화를 확인 → 근의 개수 파악",
        description: "각 구간에서 $f(a) \\cdot f(b) < 0$이면 최소 1개의 근 존재",
        example: "$f(x) = x^3 - 3x + 1$: $f(-2)=-1,\\; f(-1)=3,\\; f(0)=1,\\; f(1)=-1,\\; f(2)=3$ → 3개 근",
        tip: "부호 변화 횟수 = 근의 최소 개수. 정확한 개수는 도함수로 확인."
      },
      {
        name: "연속함수의 합성",
        formula: "$f, g \\text{ 연속} \\Rightarrow f \\circ g \\text{ 연속}$",
        description: "연속함수의 합성도 연속이다",
        example: "$f(x) = \\sin x,\\; g(x) = x^2 \\Rightarrow \\sin(x^2)$ 연속",
        tip: "합성 순서 주의: f(g(x))에서 g의 치역이 f의 정의역에 포함되어야 한다."
      },
      {
        name: "연속함수와 방정식",
        formula: "$f(x) = g(x) \\iff h(x) = f(x) - g(x) = 0$의 근 존재",
        description: "두 연속함수의 교점을 $h(x) = 0$의 근으로 변환하여 중간값 정리 적용",
        example: "$\\cos x = x$ → $h(x) = \\cos x - x$: $h(0)=1>0,\\; h(\\pi/2)=-\\pi/2<0$ → 근 존재",
        tip: "교점 존재 증명 = h(x)의 부호 변화 확인."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 8. 미정계수 결정
  // ─────────────────────────────────────────────
  {
    category: "미정계수 결정",
    formulas: [
      {
        name: "연속 조건으로 미정계수",
        formula: "$\\lim_{x \\to a} f(x) = f(a)$에서 미지수를 결정",
        description: "조각함수가 $x=a$에서 연속이 되도록 상수를 구한다",
        example: "$f(x) = \\begin{cases} x^2+a & (x<1) \\\\ 2x+b & (x \\geq 1) \\end{cases}$: $1+a = 2+b$",
        tip: "좌극한 = 우극한 = f(a) 세 값을 일치시킨다."
      },
      {
        name: "0/0형에서 미정계수",
        formula: "$\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = L$ (유한)이고 $g(a)=0$이면 $f(a)=0$",
        description: "분모가 0이 되는데 극한이 존재(유한)하면 분자도 반드시 0",
        example: "$\\lim_{x \\to 1} \\dfrac{x^2+ax+b}{x-1} = 3$: 분자도 $x=1$에서 0 → $1+a+b=0$",
        tip: "핵심 원리: '유한/0 = ∞'이므로, 유한한 극한이 되려면 분자도 0."
      },
      {
        name: "극한의 존재 조건으로 미정계수",
        formula: "$\\lim_{x \\to a} f(x)$ 존재 $\\Rightarrow$ 좌극한 = 우극한",
        description: "좌극한과 우극한을 같게 놓아 미지수를 결정",
        example: "$f(x) = \\begin{cases} ax+1 & (x<2) \\\\ x^2-b & (x>2) \\end{cases}$: $2a+1 = 4-b$",
        tip: "극한 존재와 연속은 다른 조건. 극한 존재만으로는 함수값과 같다는 보장이 없다."
      },
      {
        name: "다항식 나눗셈 조건",
        formula: "$\\lim_{x \\to a} \\dfrac{f(x)}{(x-a)^n} = L$ (유한) $\\Rightarrow$ $f(x)$는 $(x-a)^n$을 인수로 가짐",
        description: "극한이 유한하려면 분자가 분모의 인수를 포함해야 한다",
        example: "$\\lim_{x \\to 1} \\dfrac{x^3+ax^2+bx+c}{(x-1)^2} = 2$: $f(1)=0,\\; f'(1)=0$ 조건 사용",
        tip: "분모가 (x-a)²이면 f(a) = 0과 f'(a) = 0 두 조건을 얻는다."
      },
      {
        name: "연속 + 극한 연립",
        formula: "여러 점에서의 연속/극한 조건을 연립하여 미지수 결정",
        description: "2개 이상의 조건이 주어질 때 연립방정식으로 해결",
        example: "$x=1$에서 연속, $x=2$에서 연속 → 두 식으로 $a, b$ 결정",
        tip: "조건 수 ≥ 미지수 수인지 확인. 부족하면 추가 조건을 찾는다."
      },
      {
        name: "무한대 극한에서 미정계수",
        formula: "$\\lim_{x \\to \\infty} (\\sqrt{ax^2+bx} - cx) = d$ (유한)에서 $a, c$ 결정",
        description: "무한대 극한이 유한한 값을 가지려면 발산 부분이 상쇄되어야 한다",
        example: "$\\lim_{x \\to \\infty} (\\sqrt{4x^2+3x} - 2x) = \\dfrac{3}{4}$: $a=4, c=2$여야 유한",
        tip: "√(ax²) = √a · x이므로 c = √a여야 ∞ - ∞가 유한해진다."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 9. 극한의 활용
  // ─────────────────────────────────────────────
  {
    category: "극한의 활용",
    formulas: [
      {
        name: "샌드위치 정리 (조임 정리)",
        formula: "$g(x) \\leq f(x) \\leq h(x)\\text{이고 }\\lim g(x) = \\lim h(x) = L \\Rightarrow \\lim f(x) = L$",
        description: "위아래에서 조여오는 두 함수가 같은 극한을 가지면 가운데 함수도 같은 극한",
        example: "$-|x| \\leq x\\sin\\dfrac{1}{x} \\leq |x|$ → $\\lim_{x \\to 0} x\\sin\\dfrac{1}{x} = 0$",
        tip: "직접 극한을 구하기 어려울 때 위아래 경계를 잡는다."
      },
      {
        name: "합성함수의 극한",
        formula: "$\\lim_{x \\to a} f(g(x))$: $g(x) \\to b$이면 $\\lim_{x \\to a} f(g(x)) = \\lim_{t \\to b} f(t)$",
        description: "내부 함수의 극한을 먼저 구한 후 외부 함수에 적용",
        example: "$\\lim_{x \\to 0} \\sin(x^2+x) = \\sin(0) = 0$",
        tip: "외부 함수 f가 b에서 연속이면 바로 대입 가능."
      },
      {
        name: "절댓값 함수의 극한",
        formula: "$\\lim_{x \\to a} |f(x)| = |\\lim_{x \\to a} f(x)| = |L|$",
        description: "절댓값은 극한 밖으로 뺄 수 있다",
        example: "$\\lim_{x \\to 0} |x\\sin\\dfrac{1}{x}| = |0| = 0$",
        tip: "역은 성립하지 않음: |f(x)| → 0이면 f(x) → 0이지만, |f(x)| → L ≠ 0이면 f(x) → ±L."
      },
      {
        name: "가우스 함수와 극한",
        formula: "$\\lim_{x \\to n^-} [x] = n-1,\\; \\lim_{x \\to n^+} [x] = n \\quad (n \\in \\mathbb{Z})$",
        description: "가우스 함수 $[x]$는 정수점에서 좌극한 ≠ 우극한 (불연속)",
        example: "$\\lim_{x \\to 3^-} [x] = 2,\\; \\lim_{x \\to 3^+} [x] = 3$",
        tip: "정수점에서는 극한이 존재하지 않음. 비정수점에서는 연속."
      },
      {
        name: "극한의 귀류법 활용",
        formula: "극한이 존재한다고 가정 → 모순 도출 → 극한 부존재 증명",
        description: "극한이 존재하지 않음을 보이는 방법",
        example: "$\\lim_{x \\to 0} \\sin\\dfrac{1}{x}$: $x_n=\\dfrac{1}{2n\\pi} \\to 0$이면 $\\sin 2n\\pi=0$, $x_n=\\dfrac{2}{(4n+1)\\pi}$이면 $\\sin=1$",
        tip: "서로 다른 수열로 접근했을 때 극한이 다르면 극한 부존재."
      },
      {
        name: "극한값의 부호 판정",
        formula: "$\\lim_{x \\to a} f(x) = L > 0 \\Rightarrow x \\approx a$ 근방에서 $f(x) > 0$",
        description: "극한값이 양수이면 $a$ 근방에서 함수값도 양수",
        example: "$\\lim_{x \\to 0} (1+x) = 1 > 0$ → $|x| < 1$에서 $1+x > 0$",
        tip: "부등식 증명이나 부호 판정에서 극한의 부호 보존 성질 활용."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 10. 복합 킬러 참고
  // ─────────────────────────────────────────────
  {
    category: "복합 킬러 참고",
    formulas: [
      {
        name: "극한 + 다항식 조건",
        formula: "$\\lim_{x \\to a} \\dfrac{f(x)}{(x-a)^n}$이 존재할 때 $f(x)$의 구조 결정",
        description: "극한 조건에서 다항식의 인수와 계수를 역으로 결정하는 유형",
        example: "$\\lim_{x \\to 1} \\dfrac{f(x)}{(x-1)^2} = 3$이면 $f(x) = 3(x-1)^2 + \\text{고차항}$",
        tip: "f(a) = 0, f'(a) = 0 조건을 순차적으로 적용. 킬러 문항 단골."
      },
      {
        name: "극한 + 연속 복합",
        formula: "연속 조건과 극한 조건을 동시에 사용하여 함수 결정",
        description: "여러 점에서의 연속/극한 조건이 함께 주어지는 복합 문제",
        example: "$f$가 $x=1$에서 연속, $\\lim_{x \\to 2} \\dfrac{f(x)}{x-2} = 5$ → $f(1), f(2)$ 결정",
        tip: "각 조건에서 얻는 방정식을 정리하여 연립. 조건 누락 주의."
      },
      {
        name: "조각함수 + 합성함수의 극한",
        formula: "$\\lim_{x \\to a} f(g(x))$에서 $g(x)$의 값에 따라 $f$의 식이 달라지는 유형",
        description: "$g(x)$가 조각함수의 경계를 넘나들 때 좌극한·우극한 분리 필요",
        example: "$f(x) = \\begin{cases} x+1 & (x<2) \\\\ x^2 & (x \\geq 2) \\end{cases},\\; g(x) \\to 2$이면 $f(g(x))$의 좌우극한 확인",
        tip: "g(x) → b일 때 g(x)가 b 위/아래 어느 쪽에서 접근하는지가 핵심."
      },
      {
        name: "극한 + 절댓값 조합",
        formula: "$\\lim_{x \\to a} \\dfrac{|f(x)|}{g(x)}$: $f(x)$의 부호 변화에 따라 경우 분리",
        description: "절댓값 내부의 부호가 $a$ 좌우에서 달라질 수 있는 유형",
        example: "$\\lim_{x \\to 1} \\dfrac{|x^2-1|}{x-1}$: $x \\to 1^+$이면 $(x+1)=2$, $x \\to 1^-$이면 $-(x+1)=-2$",
        tip: "|f(x)|는 f(x) ≥ 0이면 f(x), f(x) < 0이면 -f(x). 구간별 부호 확인."
      },
      {
        name: "삼각함수 + 미정계수",
        formula: "$\\lim_{x \\to 0} \\dfrac{\\sin(ax+b) - c}{x} = d$ 형태에서 상수 결정",
        description: "삼각함수 극한과 미정계수 결정이 결합된 유형",
        example: "$\\lim_{x \\to 0} \\dfrac{\\sin(x+a) - \\sin a}{x} = \\cos a$ → $a$ 결정 문제",
        tip: "분자 → 0 조건에서 c 결정 후, 0/0 극한에서 나머지 계수 결정."
      },
      {
        name: "그래프 해석 + 극한",
        formula: "함수의 그래프가 주어지고 극한값·연속성을 판단하는 유형",
        description: "그래프에서 좌극한·우극한·함수값을 읽어내는 시각적 판단 문제",
        example: "빈 동그라미(○) = 함수값 없음, 채운 동그라미(●) = 함수값 있음",
        tip: "그래프 문제에서는 점의 유형(○ vs ●)과 화살표 방향을 정확히 읽는다."
      },
      {
        name: "극한과 수열의 연결",
        formula: "$\\lim_{n \\to \\infty} f\\left(\\dfrac{1}{n}\\right)$ 형태: 수열의 극한으로 변환",
        description: "함수의 극한과 수열의 극한을 연결하는 복합 문제",
        example: "$\\lim_{n \\to \\infty} n\\sin\\dfrac{1}{n} = \\lim_{t \\to 0^+} \\dfrac{\\sin t}{t} = 1$",
        tip: "1/n = t로 치환하면 t → 0⁺. 함수 극한 공식을 그대로 적용."
      },
      {
        name: "다중 조건 함수 결정",
        formula: "극한·연속·함수값 조건이 3개 이상 주어져 함수 자체를 결정하는 유형",
        description: "주어진 조건들을 연립하여 $f(x)$의 모든 계수를 결정",
        example: "$f(x) = ax^2+bx+c$, $f(1)=2$, $x=0$에서 연속, $\\lim_{x \\to -1}\\dfrac{f(x)}{x+1}=3$ → $a, b, c$ 결정",
        tip: "조건 하나당 방정식 하나. 미지수와 조건 수를 먼저 세고 전략을 세운다."
      }
    ]
  }
];
