// 수능 수학 - 지수와 로그 공식 레퍼런스
const FORMULA_BANK = [
  // ───────────────────────────────────────
  // 1. 지수법칙
  // ───────────────────────────────────────
  {
    category: "지수법칙",
    formulas: [
      {
        name: "지수의 곱셈",
        formula: "$a^m \\times a^n = a^{m+n}$",
        description: "밑이 같은 거듭제곱의 곱은 지수를 더한다.",
        example: "$2^3 \\times 2^4 = 2^{3+4} = 2^7 = 128$",
        tip: "밑이 같을 때만 적용 가능하다."
      },
      {
        name: "지수의 나눗셈",
        formula: "$a^m \\div a^n = a^{m-n}$",
        description: "밑이 같은 거듭제곱의 나눗셈은 지수를 뺀다.",
        example: "$3^5 \\div 3^2 = 3^{5-2} = 3^3 = 27$",
        tip: "분수 형태로 바꾸면 약분 원리와 같다."
      },
      {
        name: "거듭제곱의 거듭제곱",
        formula: "$(a^m)^n = a^{mn}$",
        description: "거듭제곱을 다시 거듭제곱하면 지수를 곱한다.",
        example: "$(2^3)^4 = 2^{12} = 4096$",
        tip: "$a^{m^n}$과 $(a^m)^n$은 다르다. 전자는 위에서 아래로 계산한다."
      },
      {
        name: "지수가 0인 경우",
        formula: "$a^0 = 1 \\quad (a \\neq 0)$",
        description: "0이 아닌 모든 수의 0제곱은 1이다.",
        example: "$5^0 = 1, \\quad (-3)^0 = 1$",
        tip: "$a^m \\div a^m = a^{m-m} = a^0 = 1$로 유도할 수 있다."
      },
      {
        name: "음의 정수 지수",
        formula: "$a^{-n} = \\dfrac{1}{a^n} \\quad (a \\neq 0)$",
        description: "음의 지수는 역수를 의미한다.",
        example: "$2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8}$",
        tip: "분모의 음의 지수는 분자로 올릴 수 있다: $\\dfrac{1}{a^{-n}} = a^n$"
      },
      {
        name: "유리수 지수 (거듭제곱근)",
        formula: "$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$",
        description: "분수 지수는 거듭제곱근으로 표현된다.",
        example: "$8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$",
        tip: "분모가 근호의 차수, 분자가 거듭제곱의 지수이다."
      },
      {
        name: "곱의 거듭제곱",
        formula: "$(ab)^n = a^n b^n$",
        description: "곱의 거듭제곱은 각각의 거듭제곱의 곱이다.",
        example: "$(2 \\times 3)^4 = 2^4 \\times 3^4 = 16 \\times 81 = 1296$",
        tip: "나눗셈도 마찬가지: $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$"
      },
      {
        name: "거듭제곱근의 성질",
        formula: "$\\sqrt[n]{a} \\times \\sqrt[n]{b} = \\sqrt[n]{ab}$",
        description: "같은 차수의 거듭제곱근은 곱하여 합칠 수 있다.",
        example: "$\\sqrt[3]{4} \\times \\sqrt[3]{2} = \\sqrt[3]{8} = 2$",
        tip: "차수가 다르면 유리수 지수로 변환 후 통분한다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 2. 로그 기본
  // ───────────────────────────────────────
  {
    category: "로그 기본",
    formulas: [
      {
        name: "로그의 정의",
        formula: "$\\log_a b = c \\iff a^c = b \\quad (a > 0,\\; a \\neq 1,\\; b > 0)$",
        description: "로그는 '밑 a를 몇 제곱하면 b가 되는가'를 나타낸다.",
        example: "$\\log_2 8 = 3 \\iff 2^3 = 8$",
        tip: "밑 조건(양수, 1이 아님)과 진수 조건(양수)을 항상 확인하라."
      },
      {
        name: "로그의 곱셈 법칙",
        formula: "$\\log_a (MN) = \\log_a M + \\log_a N$",
        description: "진수의 곱은 로그의 합이다.",
        example: "$\\log_2 (4 \\times 8) = \\log_2 4 + \\log_2 8 = 2 + 3 = 5$",
        tip: "역으로 로그의 합을 진수의 곱으로 합칠 수 있다."
      },
      {
        name: "로그의 나눗셈 법칙",
        formula: "$\\log_a \\dfrac{M}{N} = \\log_a M - \\log_a N$",
        description: "진수의 나눗셈은 로그의 차이다.",
        example: "$\\log_3 \\dfrac{81}{3} = \\log_3 81 - \\log_3 3 = 4 - 1 = 3$",
        tip: "로그의 뺄셈은 진수의 나눗셈으로 변환하여 정리한다."
      },
      {
        name: "로그의 거듭제곱 법칙",
        formula: "$\\log_a M^k = k \\log_a M$",
        description: "진수의 지수는 로그 앞으로 내린다.",
        example: "$\\log_2 8^3 = 3 \\log_2 8 = 3 \\times 3 = 9$",
        tip: "밑의 지수도 내릴 수 있다: $\\log_{a^m} b = \\dfrac{1}{m} \\log_a b$"
      },
      {
        name: "밑변환 공식",
        formula: "$\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$",
        description: "밑을 임의의 양수 c로 바꿀 수 있다.",
        example: "$\\log_4 8 = \\dfrac{\\log_2 8}{\\log_2 4} = \\dfrac{3}{2}$",
        tip: "수능에서 밑 통일할 때 가장 많이 쓰이는 공식이다."
      },
      {
        name: "기본 로그값",
        formula: "$\\log_a 1 = 0, \\quad \\log_a a = 1$",
        description: "1의 로그는 항상 0이고, 밑과 진수가 같으면 1이다.",
        example: "$\\log_5 1 = 0, \\quad \\log_7 7 = 1$",
        tip: "$a^0 = 1$이므로 $\\log_a 1 = 0$이다."
      },
      {
        name: "로그의 역수 관계",
        formula: "$\\log_a b = \\dfrac{1}{\\log_b a}$",
        description: "밑과 진수를 바꾸면 역수가 된다.",
        example: "$\\log_2 8 = 3, \\quad \\log_8 2 = \\dfrac{1}{3}$",
        tip: "밑변환 공식에서 직접 유도된다."
      },
      {
        name: "로그의 연쇄 법칙",
        formula: "$\\log_a b \\times \\log_b c = \\log_a c$",
        description: "중간 밑이 약분되어 사라진다.",
        example: "$\\log_2 3 \\times \\log_3 16 = \\log_2 16 = 4$",
        tip: "여러 로그의 곱이 연쇄적으로 이어지면 처음과 끝만 남는다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 3. 지수함수
  // ───────────────────────────────────────
  {
    category: "지수함수",
    formulas: [
      {
        name: "지수함수의 정의",
        formula: "$y = a^x \\quad (a > 0,\\; a \\neq 1)$",
        description: "밑이 양수이고 1이 아닌 실수일 때의 함수이다.",
        example: "$y = 2^x, \\quad y = \\left(\\dfrac{1}{3}\\right)^x$",
        tip: "밑이 1이면 상수함수 $y=1$이 되어 지수함수가 아니다."
      },
      {
        name: "a > 1일 때 그래프",
        formula: "$a > 1 \\Rightarrow x \\uparrow \\text{이면 } y \\uparrow \\text{ (증가함수)}$",
        description: "밑이 1보다 크면 x가 커질수록 y도 커진다.",
        example: "$y = 2^x$: $x = -1 \\to \\frac{1}{2},\\; x = 0 \\to 1,\\; x = 3 \\to 8$",
        tip: "오른쪽으로 갈수록 급격히 증가하는 곡선이다."
      },
      {
        name: "0 < a < 1일 때 그래프",
        formula: "$0 < a < 1 \\Rightarrow x \\uparrow \\text{이면 } y \\downarrow \\text{ (감소함수)}$",
        description: "밑이 0과 1 사이이면 x가 커질수록 y는 줄어든다.",
        example: "$y = \\left(\\dfrac{1}{2}\\right)^x$: $x = -2 \\to 4,\\; x = 0 \\to 1,\\; x = 3 \\to \\frac{1}{8}$",
        tip: "$\\left(\\frac{1}{a}\\right)^x = a^{-x}$이므로 $y = a^x$를 y축 대칭한 것과 같다."
      },
      {
        name: "점근선과 공통점",
        formula: "\\text{점근선: } y = 0, \\quad \\text{y절편: } (0, 1)$",
        description: "모든 지수함수는 x축을 점근선으로 갖고, (0, 1)을 지난다.",
        example: "$y = 3^x$도 $y = 0.5^x$도 모두 점 $(0, 1)$을 지난다.",
        tip: "점근선은 $y = 0$ (x축)이고, 함수값은 항상 양수이다."
      },
      {
        name: "평행이동",
        formula: "$y = a^{x-p} + q$",
        description: "x방향으로 p만큼, y방향으로 q만큼 평행이동한다.",
        example: "$y = 2^{x-1} + 3$: 오른쪽 1, 위 3 이동. 점근선: $y = 3$",
        tip: "점근선이 $y = q$로 바뀌고, y절편은 $(0, a^{-p} + q)$이다."
      },
      {
        name: "대칭 변환",
        formula: "$y = a^{-x}$: y축 대칭, \\quad $y = -a^x$: x축 대칭$",
        description: "지수에 -를 붙이면 y축, 함수에 -를 붙이면 x축 대칭이다.",
        example: "$y = 2^{-x} = \\left(\\dfrac{1}{2}\\right)^x$",
        tip: "x축 대칭 시 점근선도 $y = 0$으로 유지되지만 함수값이 음수가 된다."
      },
      {
        name: "지수함수의 대소 비교",
        formula: "$a > 1$: $a^p > a^q \\iff p > q$",
        description: "밑이 1보다 크면 지수가 클수록 함수값이 크다.",
        example: "$2^5 > 2^3$ (밑 2 > 1이므로 지수 비교)",
        tip: "$0 < a < 1$이면 부등호 방향이 반대가 된다."
      },
      {
        name: "지수함수의 치역",
        formula: "$y = a^x$의 치역: $\\{y \\mid y > 0\\}$",
        description: "지수함수의 함수값은 항상 양수이다.",
        example: "$2^x > 0$이므로 $2^x = -1$인 $x$는 존재하지 않는다.",
        tip: "지수방정식에서 $a^x = k$의 해가 존재하려면 $k > 0$이어야 한다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 4. 로그함수
  // ───────────────────────────────────────
  {
    category: "로그함수",
    formulas: [
      {
        name: "로그함수의 정의",
        formula: "$y = \\log_a x \\quad (a > 0,\\; a \\neq 1,\\; x > 0)$",
        description: "지수함수 $y = a^x$의 역함수이다.",
        example: "$y = \\log_2 x, \\quad y = \\log_{\\frac{1}{3}} x$",
        tip: "정의역은 양의 실수 전체, 치역은 모든 실수이다."
      },
      {
        name: "역함수 관계",
        formula: "$y = a^x \\iff x = \\log_a y$",
        description: "지수함수와 로그함수는 $y = x$ 직선에 대해 대칭이다.",
        example: "$y = 2^x$의 역함수는 $y = \\log_2 x$",
        tip: "그래프를 그릴 때 $y = x$에 대칭시키면 된다."
      },
      {
        name: "a > 1일 때 그래프",
        formula: "$a > 1 \\Rightarrow x \\uparrow \\text{이면 } y \\uparrow \\text{ (증가함수)}$",
        description: "밑이 1보다 크면 x가 커질수록 y도 커진다.",
        example: "$y = \\log_2 x$: $x = \\frac{1}{4} \\to -2,\\; x = 1 \\to 0,\\; x = 8 \\to 3$",
        tip: "x축 양의 방향으로 천천히 증가하는 곡선이다."
      },
      {
        name: "0 < a < 1일 때 그래프",
        formula: "$0 < a < 1 \\Rightarrow x \\uparrow \\text{이면 } y \\downarrow \\text{ (감소함수)}$",
        description: "밑이 0과 1 사이이면 x가 커질수록 y는 줄어든다.",
        example: "$y = \\log_{\\frac{1}{2}} x$: $x = \\frac{1}{4} \\to 2,\\; x = 1 \\to 0,\\; x = 8 \\to -3$",
        tip: "$\\log_{\\frac{1}{a}} x = -\\log_a x$이므로 x축 대칭이다."
      },
      {
        name: "점근선과 공통점",
        formula: "\\text{점근선: } x = 0, \\quad \\text{x절편: } (1, 0)$",
        description: "모든 로그함수는 y축을 점근선으로 갖고, (1, 0)을 지난다.",
        example: "$\\log_5 1 = 0$이므로 $y = \\log_5 x$는 $(1, 0)$을 지난다.",
        tip: "지수함수의 점근선 $y = 0$이 역함수에서 $x = 0$이 된다."
      },
      {
        name: "평행이동",
        formula: "$y = \\log_a (x - p) + q$",
        description: "x방향으로 p만큼, y방향으로 q만큼 평행이동한다.",
        example: "$y = \\log_2 (x - 3) + 1$: 점근선 $x = 3$, x절편 $(3 + \\frac{1}{2}, 0)$",
        tip: "점근선이 $x = p$로 바뀌고, 정의역이 $x > p$가 된다."
      },
      {
        name: "로그함수의 대소 비교",
        formula: "$a > 1$: $\\log_a p > \\log_a q \\iff p > q > 0$",
        description: "밑이 1보다 크면 진수가 클수록 로그값이 크다.",
        example: "$\\log_3 9 > \\log_3 3$ (밑 3 > 1이므로 진수 비교)",
        tip: "$0 < a < 1$이면 부등호 방향이 반대가 된다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 5. 지수방정식
  // ───────────────────────────────────────
  {
    category: "지수방정식",
    formulas: [
      {
        name: "밑 통일법",
        formula: "$a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)$",
        description: "밑이 같으면 지수끼리 비교한다.",
        example: "$2^{3x-1} = 2^5 \\Rightarrow 3x - 1 = 5 \\Rightarrow x = 2$",
        tip: "양변을 같은 밑으로 표현하는 것이 핵심이다."
      },
      {
        name: "치환법 (t = a^x)",
        formula: "$a^{2x} + a^x - 6 = 0 \\xrightarrow{t = a^x} t^2 + t - 6 = 0$",
        description: "$a^x = t$로 치환하면 이차방정식으로 변환된다.",
        example: "$4^x - 3 \\cdot 2^x + 2 = 0$에서 $t = 2^x$로 놓으면 $t^2 - 3t + 2 = 0$",
        tip: "치환 후 $t > 0$ 조건을 반드시 확인하라."
      },
      {
        name: "지수부등식 (a > 1)",
        formula: "$a > 1$: $a^{f(x)} > a^{g(x)} \\iff f(x) > g(x)$",
        description: "밑이 1보다 크면 부등호 방향이 유지된다.",
        example: "$3^{2x} > 3^5 \\Rightarrow 2x > 5 \\Rightarrow x > \\dfrac{5}{2}$",
        tip: "밑이 1보다 클 때는 지수의 대소 관계가 그대로 보존된다."
      },
      {
        name: "지수부등식 (0 < a < 1)",
        formula: "$0 < a < 1$: $a^{f(x)} > a^{g(x)} \\iff f(x) < g(x)$",
        description: "밑이 1보다 작으면 부등호 방향이 반대가 된다.",
        example: "$\\left(\\dfrac{1}{2}\\right)^x > \\left(\\dfrac{1}{2}\\right)^3 \\Rightarrow x < 3$",
        tip: "감소함수이므로 부등호가 뒤집힌다."
      },
      {
        name: "양변에 로그 취하기",
        formula: "$a^x = b \\Rightarrow x = \\log_a b = \\dfrac{\\ln b}{\\ln a}$",
        description: "밑 통일이 어려울 때 양변에 로그를 취한다.",
        example: "$3^x = 7 \\Rightarrow x = \\log_3 7 = \\dfrac{\\ln 7}{\\ln 3}$",
        tip: "자연로그나 상용로그 아무것이나 사용 가능하다."
      },
      {
        name: "밑이 다른 지수방정식",
        formula: "$a^x = b^x \\Rightarrow \\left(\\dfrac{a}{b}\\right)^x = 1 \\Rightarrow x = 0$",
        description: "양변을 나누어 하나의 밑으로 통일한다.",
        example: "$2^x = 5^x \\Rightarrow \\left(\\dfrac{2}{5}\\right)^x = 1 \\Rightarrow x = 0$",
        tip: "$a \\neq b$일 때 유일한 해는 $x = 0$이다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 6. 로그방정식
  // ───────────────────────────────────────
  {
    category: "로그방정식",
    formulas: [
      {
        name: "진수 조건",
        formula: "$\\log_a f(x)$가 정의되려면 $f(x) > 0$",
        description: "로그의 진수는 반드시 양수여야 한다.",
        example: "$\\log_2 (x - 3)$: $x - 3 > 0 \\Rightarrow x > 3$",
        tip: "로그방정식/부등식 풀 때 가장 먼저 진수 조건을 구하라."
      },
      {
        name: "밑 조건",
        formula: "$\\log_a x$: $a > 0,\\; a \\neq 1$",
        description: "로그의 밑은 양수이면서 1이 아니어야 한다.",
        example: "$\\log_{x-1} 5$: $x - 1 > 0$이고 $x - 1 \\neq 1$ → $x > 1$이고 $x \\neq 2$",
        tip: "밑에 변수가 있으면 밑 조건도 확인해야 한다."
      },
      {
        name: "밑 통일 후 진수 비교",
        formula: "$\\log_a f(x) = \\log_a g(x) \\Rightarrow f(x) = g(x)$",
        description: "밑이 같으면 진수끼리 비교한다.",
        example: "$\\log_3 (2x+1) = \\log_3 7 \\Rightarrow 2x + 1 = 7 \\Rightarrow x = 3$",
        tip: "풀고 난 뒤 진수 조건 검증을 반드시 하라."
      },
      {
        name: "로그를 지수로 변환",
        formula: "$\\log_a x = b \\Rightarrow x = a^b$",
        description: "로그 정의를 이용하여 지수 형태로 바꾼다.",
        example: "$\\log_2 x = 5 \\Rightarrow x = 2^5 = 32$",
        tip: "가장 기본적인 로그방정식 풀이법이다."
      },
      {
        name: "치환법 (t = log_a x)",
        formula: "$(\\log_a x)^2 + \\log_a x - 2 = 0 \\xrightarrow{t = \\log_a x} t^2 + t - 2 = 0$",
        description: "$\\log_a x = t$로 치환하면 이차방정식이 된다.",
        example: "$(\\log_2 x)^2 - 3\\log_2 x + 2 = 0$ → $t = 1, 2$ → $x = 2, 4$",
        tip: "치환 후 구한 $t$ 값에 대해 $x = a^t$로 원래 변수를 구한다."
      },
      {
        name: "로그부등식 (a > 1)",
        formula: "$a > 1$: $\\log_a f(x) > \\log_a g(x) \\iff f(x) > g(x) > 0$",
        description: "밑이 1보다 크면 부등호 방향이 유지된다.",
        example: "$\\log_2 (x+1) > \\log_2 5 \\Rightarrow x + 1 > 5 \\Rightarrow x > 4$",
        tip: "진수 조건 $f(x) > 0$, $g(x) > 0$을 함께 고려하라."
      },
      {
        name: "로그부등식 (0 < a < 1)",
        formula: "$0 < a < 1$: $\\log_a f(x) > \\log_a g(x) \\iff 0 < f(x) < g(x)$",
        description: "밑이 1보다 작으면 부등호 방향이 반대가 된다.",
        example: "$\\log_{\\frac{1}{2}} x > \\log_{\\frac{1}{2}} 4 \\Rightarrow 0 < x < 4$",
        tip: "감소함수이므로 부등호가 뒤집히고, 진수 조건도 확인한다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 7. 지수로그 계산
  // ───────────────────────────────────────
  {
    category: "지수로그 계산",
    formulas: [
      {
        name: "지수와 로그의 상쇄",
        formula: "$a^{\\log_a x} = x \\quad (x > 0)$",
        description: "밑이 같은 지수와 로그는 상쇄된다.",
        example: "$3^{\\log_3 5} = 5, \\quad 2^{\\log_2 7} = 7$",
        tip: "역함수 관계에서 $f(f^{-1}(x)) = x$와 같은 원리이다."
      },
      {
        name: "로그와 지수의 상쇄",
        formula: "$\\log_a (a^x) = x$",
        description: "로그 안에 같은 밑의 거듭제곱이 있으면 지수만 남는다.",
        example: "$\\log_2 (2^5) = 5, \\quad \\log_{10} (10^3) = 3$",
        tip: "$f^{-1}(f(x)) = x$와 같은 원리이다."
      },
      {
        name: "밑변환 + 계산",
        formula: "$\\log_a b \\times \\log_b c \\times \\log_c d = \\log_a d$",
        description: "연쇄적인 로그의 곱은 처음과 끝만 남는다.",
        example: "$\\log_2 3 \\times \\log_3 5 \\times \\log_5 8 = \\log_2 8 = 3$",
        tip: "중간 밑과 진수가 약분된다고 생각하면 쉽다."
      },
      {
        name: "로그합 계산 (같은 밑)",
        formula: "$\\log_a M + \\log_a N = \\log_a(MN)$로 합친 후 계산",
        description: "같은 밑의 로그는 합쳐서 한 번에 계산한다.",
        example: "$\\log_2 6 + \\log_2 \\dfrac{8}{3} = \\log_2 \\left(6 \\times \\dfrac{8}{3}\\right) = \\log_2 16 = 4$",
        tip: "분수와 곱을 적절히 조합하면 깔끔한 값이 나온다."
      },
      {
        name: "지수 형태로 변환하여 계산",
        formula: "$\\log_a b = c \\Rightarrow$ 지수 관계로 바꾸어 계산",
        description: "로그값을 모를 때 문자로 놓고 지수로 변환한다.",
        example: "$\\log_2 3 = a$이면 $\\log_4 27 = \\dfrac{\\log_2 27}{\\log_2 4} = \\dfrac{3a}{2}$",
        tip: "수능에서 자주 나오는 유형이다. 밑변환 후 기존 문자로 정리한다."
      },
      {
        name: "복합 식의 값",
        formula: "$a^{\\log_a b + \\log_a c} = a^{\\log_a(bc)} = bc$",
        description: "지수 부분의 로그를 먼저 정리한 뒤 상쇄시킨다.",
        example: "$2^{1 + \\log_2 3} = 2^1 \\times 2^{\\log_2 3} = 2 \\times 3 = 6$",
        tip: "지수법칙과 로그의 상쇄를 결합하여 풀어야 한다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 8. 지수로그 응용
  // ───────────────────────────────────────
  {
    category: "지수로그 응용",
    formulas: [
      {
        name: "지수 성장 모델",
        formula: "$N(t) = N_0 \\cdot a^t \\quad (a > 1)$",
        description: "시간 $t$에 따라 일정 비율로 증가하는 모델이다.",
        example: "세균이 매 시간 2배: $N(t) = 100 \\cdot 2^t$, 3시간 후 800마리",
        tip: "매 단위시간마다 $a$배씩 증가한다."
      },
      {
        name: "지수 감소 모델",
        formula: "$N(t) = N_0 \\cdot a^t \\quad (0 < a < 1)$",
        description: "시간 $t$에 따라 일정 비율로 감소하는 모델이다.",
        example: "매년 10% 감소: $N(t) = N_0 \\cdot 0.9^t$",
        tip: "$a = 1 - r$ (감소율 $r$)로 설정한다."
      },
      {
        name: "반감기",
        formula: "$N(t) = N_0 \\cdot \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{T}}$",
        description: "반감기 $T$마다 절반으로 줄어드는 모델이다.",
        example: "반감기 5년: $N(10) = N_0 \\cdot \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{N_0}{4}$",
        tip: "$t = T$일 때 $N = \\dfrac{N_0}{2}$가 되는지 확인하라."
      },
      {
        name: "복리 계산",
        formula: "$A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$",
        description: "원금 $P$, 연이율 $r$, 연 $n$회 복리, $t$년 후 원리합계이다.",
        example: "원금 100만원, 연 5%, 분기복리, 2년: $A = 100 \\cdot (1.0125)^8$",
        tip: "연복리면 $n = 1$, 월복리면 $n = 12$이다."
      },
      {
        name: "pH (산도)",
        formula: "$\\text{pH} = -\\log_{10} [\\text{H}^+]$",
        description: "수소 이온 농도의 상용로그의 음수값이다.",
        example: "$[\\text{H}^+] = 10^{-3}$이면 pH $= -\\log_{10} 10^{-3} = 3$",
        tip: "pH가 1 낮아지면 수소 이온 농도는 10배 증가한다."
      },
      {
        name: "데시벨 (소리 크기)",
        formula: "$L = 10 \\log_{10} \\dfrac{I}{I_0}$ (dB)",
        description: "소리의 세기 $I$를 기준값 $I_0$에 대한 로그 스케일로 나타낸다.",
        example: "세기가 100배이면 $L = 10 \\log_{10} 100 = 20$ dB",
        tip: "10 dB 증가는 소리 세기 10배 증가를 의미한다."
      },
      {
        name: "리히터 규모 (지진)",
        formula: "$M = \\log_{10} \\dfrac{A}{A_0}$",
        description: "지진파의 진폭 비율을 로그로 나타낸 것이다.",
        example: "규모 1 차이 → 진폭 10배 → 에너지 약 31.6배 차이",
        tip: "규모 2 차이는 진폭 100배, 에너지 약 1000배 차이이다."
      }
    ]
  },

  // ───────────────────────────────────────
  // 9. 상용로그
  // ───────────────────────────────────────
  {
    category: "상용로그",
    formulas: [
      {
        name: "상용로그의 정의",
        formula: "$\\log_{10} x = \\log x$",
        description: "밑이 10인 로그를 상용로그라 하고, 밑 10을 생략한다.",
        example: "$\\log 100 = \\log_{10} 100 = 2$",
        tip: "수능에서 $\\log$로만 쓰면 상용로그($\\log_{10}$)이다."
      },
      {
        name: "정수 부분과 소수 부분",
        formula: "$\\log x = n + \\alpha \\quad (n \\in \\mathbb{Z},\\; 0 \\leq \\alpha < 1)$",
        description: "상용로그를 정수 부분 $n$과 소수 부분 $\\alpha$로 나눈다.",
        example: "$\\log 500 = 2.699$에서 정수 부분 $= 2$, 소수 부분 $= 0.699$",
        tip: "음수인 경우 주의: $\\log 0.005 = -2.301$에서 정수 부분 $= -3$, 소수 부분 $= 0.699$"
      },
      {
        name: "자릿수 구하기",
        formula: "$n$자리 양의 정수 $N$ $\\iff$ $n - 1 \\leq \\log N < n$",
        description: "상용로그의 정수 부분이 $n-1$이면 $n$자리 수이다.",
        example: "$\\log 2 = 0.301$이면 $2^{10}$의 자릿수: $10 \\times 0.301 = 3.01$ → 4자리",
        tip: "정수 부분 + 1 = 자릿수이다."
      },
      {
        name: "소수 첫째 자리에서 처음 나타나는 숫자",
        formula: "$0 < N < 1$일 때, 소수점 아래 처음 0이 아닌 숫자의 위치: $|n|$번째",
        description: "상용로그의 정수 부분이 $-n$이면 소수점 아래 $n$번째에 처음 유효숫자가 나온다.",
        example: "$\\log N = -3.5$이면 $N = 0.000\\cdots$에서 소수점 아래 4번째 자리에 처음 나타남",
        tip: "정수 부분이 $-k$이면 소수점 아래 $k$번째 자리에 처음 유효숫자가 나온다."
      },
      {
        name: "최고자리 숫자",
        formula: "소수 부분 $\\alpha$에서 $10^\\alpha$의 정수 부분이 최고자리 숫자",
        description: "상용로그의 소수 부분으로 최고자리 숫자를 결정한다.",
        example: "$\\log 2 = 0.301$이므로 소수 부분 $0.301$, $10^{0.301} \\approx 2$ → 최고자리 숫자 2",
        tip: "같은 소수 부분을 가진 수들은 최고자리 숫자가 같다."
      },
      {
        name: "상용로그표 활용",
        formula: "$\\log 2 \\approx 0.3010, \\quad \\log 3 \\approx 0.4771$",
        description: "이 두 값만 알면 대부분의 상용로그를 구할 수 있다.",
        example: "$\\log 6 = \\log 2 + \\log 3 \\approx 0.7781$",
        tip: "$\\log 5 = \\log \\dfrac{10}{2} = 1 - \\log 2 \\approx 0.6990$"
      },
      {
        name: "10의 거듭제곱 판별",
        formula: "$\\log N$이 정수 $\\iff$ $N$은 $10$의 거듭제곱",
        description: "상용로그값이 딱 정수가 되는 경우는 10의 거듭제곱뿐이다.",
        example: "$\\log 1000 = 3$ (정수), $\\log 500 = 2.699\\cdots$ (정수 아님)",
        tip: "수능에서 '상용로그가 정수'인 조건이 나오면 $10^k$ 꼴을 떠올려라."
      }
    ]
  },

  // ───────────────────────────────────────
  // 10. 복합 킬러 참고
  // ───────────────────────────────────────
  {
    category: "복합 킬러 참고",
    formulas: [
      {
        name: "지수+로그 복합 함수",
        formula: "$f(x) = a^{\\log_a g(x)} = g(x)$",
        description: "지수와 로그가 같은 밑이면 상쇄시켜 정리한다.",
        example: "$f(x) = 3^{\\log_3 (x^2 + 1)} = x^2 + 1$",
        tip: "복잡해 보여도 밑이 같으면 로그와 지수가 소거된다."
      },
      {
        name: "역함수 활용",
        formula: "$f(a) = b \\iff f^{-1}(b) = a$",
        description: "지수함수와 로그함수의 역함수 관계를 이용한다.",
        example: "$f(x) = 2^{x+1}$이고 $f(a) = 8$이면 $2^{a+1} = 8$ → $a = 2$",
        tip: "$f(f^{-1}(x)) = x$, $f^{-1}(f(x)) = x$를 활용한다."
      },
      {
        name: "함수 합성과 역함수",
        formula: "$(f \\circ g)(x) = f(g(x))$, $\\quad (f \\circ f^{-1})(x) = x$",
        description: "지수함수와 로그함수를 합성하면 항등함수가 된다.",
        example: "$f(x) = 2^x$, $g(x) = \\log_2 x$이면 $f(g(x)) = 2^{\\log_2 x} = x$",
        tip: "역함수끼리의 합성은 항등함수 $y = x$이다."
      },
      {
        name: "그래프 교점 (지수 = 로그)",
        formula: "$a^x = \\log_a x$의 해 → $y = x$ 위의 점",
        description: "$y = a^x$와 $y = \\log_a x$의 교점은 $y = x$ 직선 위에 있다.",
        example: "$2^x = \\log_2 x$의 교점에서 $y = 2^x = x$이므로 $2^x = x$",
        tip: "역함수 관계인 두 그래프의 교점은 $y = x$ 위에 존재한다."
      },
      {
        name: "밑에 변수가 있는 문제",
        formula: "$\\log_{f(x)} g(x) = k$ → $g(x) = [f(x)]^k$",
        description: "밑에 변수가 있으면 로그 정의로 돌아가 지수로 바꾼다.",
        example: "$\\log_{x+1} (3x-2) = 2$ → $3x-2 = (x+1)^2$, 밑 조건: $x > -1$, $x \\neq 0$",
        tip: "밑 조건($f(x) > 0$, $f(x) \\neq 1$)과 진수 조건($g(x) > 0$)을 모두 확인하라."
      },
      {
        name: "지수로그 + 이차함수",
        formula: "$\\log_a f(x) = g(x)$ 꼴에서 $f(x)$가 이차식",
        description: "진수가 이차식이면 이차함수의 성질과 결합된다.",
        example: "$\\log_2 (x^2 - 4x + 5) \\geq 0$ → $x^2 - 4x + 5 \\geq 1$ → $x \\leq 1$ 또는 $x \\geq 3$",
        tip: "이차식의 판별식, 꼭짓점, 부호까지 종합적으로 분석한다."
      },
      {
        name: "절대부등식과 최솟값",
        formula: "$\\log_a x + \\log_x a \\geq 2$ ($a > 1$, $x > 0$, $x \\neq 1$)",
        description: "산술-기하 평균 부등식(AM-GM)을 로그에 적용한다.",
        example: "$t + \\dfrac{1}{t} \\geq 2$ ($t > 0$)에서 $t = \\log_a x$로 치환",
        tip: "등호 조건: $\\log_a x = 1$, 즉 $x = a$일 때 최솟값 2이다."
      },
      {
        name: "지수와 로그의 대소 비교 전략",
        formula: "서로 다른 밑의 지수/로그 → 공통 기준값으로 비교",
        description: "직접 비교가 어려우면 0, 1, 특정 값을 기준으로 크기를 판별한다.",
        example: "$\\log_3 5$와 $\\log_5 3$ 비교: 전자 $> 1$, 후자 $< 1$ → $\\log_3 5 > \\log_5 3$",
        tip: "$\\log_a b > 1 \\iff b > a$ ($a > 1$일 때)를 활용하라."
      }
    ]
  }
];
