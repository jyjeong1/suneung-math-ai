// 수능 수학 수열 공식 레퍼런스
const FORMULA_BANK = [
  // ─────────────────────────────────────────────
  // 1. 등차수열
  // ─────────────────────────────────────────────
  {
    category: "등차수열",
    formulas: [
      {
        name: "일반항",
        formula: "$a_n = a_1 + (n-1)d$",
        description: "첫째항 $a_1$, 공차 $d$일 때 제$n$항",
        example: "$a_1=3,\\; d=2 \\Rightarrow a_{10}=3+9\\times2=21$",
        tip: "공차 d = a_{n+1} - a_n 으로 먼저 구한다."
      },
      {
        name: "공차 구하기",
        formula: "$d = a_{n} - a_{n-1}$",
        description: "연속 두 항의 차이가 일정",
        example: "$a_3=7,\\; a_5=13 \\Rightarrow 2d=6,\\; d=3$",
        tip: "떨어진 두 항이면 d = (a_m - a_n) / (m - n)."
      },
      {
        name: "등차중항",
        formula: "$b = \\dfrac{a+c}{2}$",
        description: "$a, b, c$가 등차수열이면 $b$는 $a$와 $c$의 산술평균",
        example: "$a=4,\\; c=10 \\Rightarrow b=7$",
        tip: "세 수가 등차수열 ⟺ 2b = a + c."
      },
      {
        name: "첫째항과 공차로 특정 항",
        formula: "$a_n = a_m + (n-m)d$",
        description: "임의의 항 $a_m$에서 출발하여 $a_n$을 구할 때",
        example: "$a_5=11,\\; d=3 \\Rightarrow a_8=11+3\\times3=20$",
        tip: "a_1을 구하지 않고 바로 계산 가능."
      },
      {
        name: "항의 개수",
        formula: "$n = \\dfrac{a_n - a_1}{d} + 1$",
        description: "첫째항부터 마지막 항까지 몇 개인지",
        example: "$a_1=2,\\; a_n=20,\\; d=3 \\Rightarrow n=7$",
        tip: "양 끝 항 모두 포함하므로 +1을 잊지 말 것."
      },
      {
        name: "세 수가 등차수열 조건",
        formula: "$a + c = 2b$",
        description: "$a, b, c$가 이 순서로 등차수열이 되는 필요충분조건",
        example: "$x-1,\\; x+1,\\; 3x-1$ 등차 \\Rightarrow 2(x+1)=(x-1)+(3x-1)$",
        tip: "미지수 포함 등차 조건 문제에 자주 출제."
      },
      {
        name: "등차수열의 성질",
        formula: "$a_p + a_q = a_r + a_s \\;(p+q=r+s)$",
        description: "첨자의 합이 같으면 항의 합도 같다",
        example: "$a_3 + a_7 = a_4 + a_6 = a_1 + a_9$",
        tip: "수능에서 조건 2개로 합을 구할 때 핵심 성질."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 2. 등비수열
  // ─────────────────────────────────────────────
  {
    category: "등비수열",
    formulas: [
      {
        name: "일반항",
        formula: "$a_n = a_1 \\cdot r^{n-1}$",
        description: "첫째항 $a_1$, 공비 $r$일 때 제$n$항",
        example: "$a_1=2,\\; r=3 \\Rightarrow a_5=2\\cdot3^4=162$",
        tip: "지수가 n-1임에 주의. a_1에는 r^0=1."
      },
      {
        name: "공비 구하기",
        formula: "$r = \\dfrac{a_{n+1}}{a_n}$",
        description: "연속 두 항의 비가 일정",
        example: "$a_2=6,\\; a_3=18 \\Rightarrow r=3$",
        tip: "a_n ≠ 0 확인 필수. 떨어진 항이면 r^{m-n} = a_m / a_n."
      },
      {
        name: "등비중항",
        formula: "$b^2 = ac \\;(b \\neq 0)$",
        description: "$a, b, c$가 등비수열이면 $b^2 = ac$",
        example: "$a=3,\\; c=12 \\Rightarrow b=\\pm6$",
        tip: "부호 주의: b = ±√(ac). 문맥에서 양수/음수 결정."
      },
      {
        name: "임의의 항에서 출발",
        formula: "$a_n = a_m \\cdot r^{n-m}$",
        description: "임의의 항 $a_m$에서 $a_n$을 구할 때",
        example: "$a_3=12,\\; r=2 \\Rightarrow a_6=12\\cdot2^3=96$",
        tip: "a_1을 경유하지 않아 계산이 빠르다."
      },
      {
        name: "세 수가 등비수열 조건",
        formula: "$b^2 = ac$",
        description: "$a, b, c$가 이 순서로 등비수열이 되는 필요충분조건",
        example: "$2,\\; x,\\; 8$ 등비 \\Rightarrow x^2=16,\\; x=\\pm4$",
        tip: "등비중항과 동일. 부호 확인 문제가 수능 단골."
      },
      {
        name: "등비수열의 성질",
        formula: "$a_p \\cdot a_q = a_r \\cdot a_s \\;(p+q=r+s)$",
        description: "첨자의 합이 같으면 항의 곱도 같다",
        example: "$a_2 \\cdot a_8 = a_4 \\cdot a_6 = a_1 \\cdot a_9$",
        tip: "등차는 합, 등비는 곱으로 대응."
      },
      {
        name: "교대 부호 등비수열",
        formula: "$r < 0 \\Rightarrow a_n$의 부호가 번갈아 변함",
        description: "공비가 음수이면 홀수 항과 짝수 항의 부호가 다르다",
        example: "$a_1=1,\\; r=-2: 1, -2, 4, -8, \\ldots$",
        tip: "급수 수렴 조건에서 |r| < 1만 보면 r < 0도 포함."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 3. 수열의 합
  // ─────────────────────────────────────────────
  {
    category: "수열의 합",
    formulas: [
      {
        name: "등차수열의 합 (1)",
        formula: "$S_n = \\dfrac{n(a_1 + a_n)}{2}$",
        description: "첫째항과 마지막 항을 알 때",
        example: "$a_1=1,\\; a_{10}=19 \\Rightarrow S_{10}=\\dfrac{10\\times20}{2}=100$",
        tip: "(첫째항+끝항)×항의개수÷2 — 가우스 공식."
      },
      {
        name: "등차수열의 합 (2)",
        formula: "$S_n = \\dfrac{n\\{2a_1 + (n-1)d\\}}{2}$",
        description: "첫째항과 공차를 알 때",
        example: "$a_1=3,\\; d=2 \\Rightarrow S_5=\\dfrac{5(6+8)}{2}=35$",
        tip: "전개하면 S_n = An² + Bn (이차식). 최댓값 문제에 활용."
      },
      {
        name: "등비수열의 합",
        formula: "$S_n = \\dfrac{a_1(r^n - 1)}{r - 1} \\quad (r \\neq 1)$",
        description: "공비 $r \\neq 1$일 때 처음 $n$항까지의 합",
        example: "$a_1=2,\\; r=3,\\; n=4 \\Rightarrow S_4=\\dfrac{2(81-1)}{2}=80$",
        tip: "r = 1이면 S_n = n·a_1. 분모가 0이 되지 않게 주의."
      },
      {
        name: "등차수열 합의 최대·최소",
        formula: "$S_n \\text{ 최대} \\Leftrightarrow a_n \\geq 0 \\text{이고 } a_{n+1} \\leq 0$",
        description: "공차 d < 0인 등차수열에서 부분합의 최댓값 조건",
        example: "$a_1=10,\\; d=-3: a_4=1>0,\\; a_5=-2<0 \\Rightarrow S_4$ 최대",
        tip: "a_n=0인 경우 S_n = S_{n-1} (같은 값). 부등식으로 n 범위를 구한다."
      },
      {
        name: "자연수 거듭제곱 합",
        formula: "$\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$",
        description: "1부터 n까지의 자연수의 합",
        example: "$\\sum_{k=1}^{100} k = \\dfrac{100 \\times 101}{2} = 5050$",
        tip: "시그마 계산의 기본. 모든 수열 문제의 출발점."
      },
      {
        name: "등비수열 합의 비",
        formula: "$\\dfrac{S_{2n}}{S_n} = 1 + r^n$",
        description: "등비수열에서 $S_n \\neq 0$일 때 부분합의 비",
        example: "$r=2,\\; n=3 \\Rightarrow S_6/S_3 = 1+8=9$",
        tip: "S_n, S_{2n}, S_{3n} 관계: S_{3n}-S_{2n} = r^n(S_{2n}-S_n)."
      },
      {
        name: "등비수열 구간합",
        formula: "$S_{3n} - S_{2n} = (S_{2n} - S_n) \\cdot r^n$",
        description: "$S_n,\\; S_{2n}-S_n,\\; S_{3n}-S_{2n}$도 등비수열",
        example: "$S_3=7,\\; S_6-S_3=56 \\Rightarrow r^3=8,\\; r=2$",
        tip: "등비급수 구간합은 그 자체가 등비수열을 이룬다."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 4. 점화식
  // ─────────────────────────────────────────────
  {
    category: "점화식",
    formulas: [
      {
        name: "등차형 점화식",
        formula: "$a_{n+1} = a_n + d$",
        description: "$\\{a_n\\}$은 공차 $d$인 등차수열",
        example: "$a_1=2,\\; a_{n+1}=a_n+3 \\Rightarrow a_n=3n-1$",
        tip: "일반항: a_n = a_1 + (n-1)d."
      },
      {
        name: "등비형 점화식",
        formula: "$a_{n+1} = r \\cdot a_n$",
        description: "$\\{a_n\\}$은 공비 $r$인 등비수열",
        example: "$a_1=1,\\; a_{n+1}=2a_n \\Rightarrow a_n=2^{n-1}$",
        tip: "일반항: a_n = a_1 · r^{n-1}."
      },
      {
        name: "계차수열형",
        formula: "$a_{n+1} = a_n + b_n$",
        description: "$b_n = a_{n+1} - a_n$이 알려진 수열일 때",
        example: "$b_n=n \\Rightarrow a_n = a_1 + \\sum_{k=1}^{n-1} k = a_1 + \\dfrac{n(n-1)}{2}$",
        tip: "a_n = a_1 + Σ_{k=1}^{n-1} b_k (n ≥ 2). n=1 대입 확인 필수."
      },
      {
        name: "특성방정식 (일차형)",
        formula: "$a_{n+1} = pa_n + q \\Rightarrow \\alpha = \\dfrac{q}{1-p}$",
        description: "$a_{n+1} - \\alpha = p(a_n - \\alpha)$로 변환하여 등비수열화",
        example: "$a_{n+1}=2a_n+3: \\alpha=-3,\\; a_n+3=(a_1+3)\\cdot2^{n-1}$",
        tip: "α = q/(1-p)를 특성근이라 한다. p=1이면 등차형."
      },
      {
        name: "이계 점화식",
        formula: "$a_{n+2} + pa_{n+1} + qa_n = 0$",
        description: "특성방정식 $x^2 + px + q = 0$의 근 $\\alpha, \\beta$로 일반항 결정",
        example: "$a_{n+2} = 5a_{n+1} - 6a_n: x^2-5x+6=0,\\; \\alpha=2,\\; \\beta=3$",
        tip: "일반항: a_n = A·α^n + B·β^n. 초기 조건 2개로 A, B 결정."
      },
      {
        name: "점화식과 합의 관계",
        formula: "$S_{n+1} - S_n = a_{n+1}$",
        description: "부분합의 점화식에서 일반항을 추출",
        example: "$S_n = 2a_n - 1 \\Rightarrow S_{n+1}-S_n = 2a_{n+1}-2a_n$",
        tip: "S_n과 a_n의 관계식이 주어지면 이 성질로 점화식 유도."
      },
      {
        name: "a_{n+1} = pa_n + f(n) 형",
        formula: "양변을 $p^{n+1}$로 나누어 새 수열 치환",
        description: "$b_n = \\dfrac{a_n}{p^n}$으로 놓으면 $b_{n+1} = b_n + \\dfrac{f(n)}{p^{n+1}}$",
        example: "$a_{n+1}=3a_n+2^n: b_n=a_n/3^n,\\; b_{n+1}=b_n+(2/3)^n/3$",
        tip: "나누는 수는 동차 부분의 공비(p). 변환 후 시그마로 합산."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 5. 수학적 귀납법
  // ─────────────────────────────────────────────
  {
    category: "수학적 귀납법",
    formulas: [
      {
        name: "기본 원리",
        formula: "$\\text{(i) } n=1 \\text{ 참} \\quad \\text{(ii) } n=k \\Rightarrow n=k+1 \\text{ 참}$",
        description: "두 단계를 보이면 모든 자연수 $n$에서 성립",
        example: "$1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$ 증명",
        tip: "(i)을 반드시 먼저 확인. (ii)에서 가정을 반드시 사용해야 한다."
      },
      {
        name: "증명 구조 (등식)",
        formula: "$P(k+1)$의 좌변 $= P(k)$의 좌변 $+ a_{k+1}$",
        description: "귀납 가정 $P(k)$를 대입하여 $P(k+1)$의 우변과 같음을 보임",
        example: "$\\sum_{i=1}^{k+1} i = \\dfrac{k(k+1)}{2} + (k+1) = \\dfrac{(k+1)(k+2)}{2}$",
        tip: "좌변에 가정을 대입 → 정리 → 우변과 일치 확인."
      },
      {
        name: "증명 구조 (부등식)",
        formula: "$P(k) \\text{ 가정 후 } P(k+1) \\text{에서 부등식 변형}$",
        description: "가정에서 얻은 부등식을 이용해 $k+1$일 때도 성립함을 보임",
        example: "$2^n > n: 2^{k+1}=2\\cdot2^k > 2k \\geq k+1\\;(k \\geq 1)$",
        tip: "부등식 귀납에서는 가정과 추가 조건을 동시에 사용."
      },
      {
        name: "강한 귀납법",
        formula: "$n \\leq k \\text{ 모두 참} \\Rightarrow n=k+1 \\text{ 참}$",
        description: "$n=k$뿐 아니라 $1$부터 $k$까지 모두 가정",
        example: "피보나치: $F_{k+1}$은 $F_k$와 $F_{k-1}$ 모두 필요",
        tip: "이계 점화식이나 여러 이전 항을 참조할 때 사용."
      },
      {
        name: "n=1 확인 (기저 단계)",
        formula: "$P(1)$이 참인지 직접 대입하여 확인",
        description: "귀납법의 출발점. 이것이 없으면 증명이 성립하지 않음",
        example: "$P(1): 1 = \\dfrac{1 \\cdot 2}{2} = 1$ \\;\\checkmark",
        tip: "기저가 n=0이나 n=2인 경우도 있다. 문제 조건 확인."
      },
      {
        name: "귀납 가정의 활용",
        formula: "$n=k$일 때 $P(k)$가 참이라 가정",
        description: "가정을 반드시 증명 과정에서 사용해야 올바른 귀납법",
        example: "가정: $1+2+\\cdots+k = \\dfrac{k(k+1)}{2}$를 대입",
        tip: "가정을 사용하지 않으면 순환논법이거나 증명이 아님."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 6. 시그마 계산
  // ─────────────────────────────────────────────
  {
    category: "시그마 계산",
    formulas: [
      {
        name: "자연수의 합",
        formula: "$\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$",
        description: "1부터 n까지의 합",
        example: "$\\sum_{k=1}^{20} k = \\dfrac{20 \\times 21}{2} = 210$",
        tip: "가장 기본. 이것만 외워도 많은 문제를 풀 수 있다."
      },
      {
        name: "제곱의 합",
        formula: "$\\sum_{k=1}^{n} k^2 = \\dfrac{n(n+1)(2n+1)}{6}$",
        description: "1²+2²+···+n²",
        example: "$\\sum_{k=1}^{10} k^2 = \\dfrac{10 \\times 11 \\times 21}{6} = 385$",
        tip: "분모 6 기억. 인수: n, n+1, 2n+1."
      },
      {
        name: "세제곱의 합",
        formula: "$\\sum_{k=1}^{n} k^3 = \\left\\{\\dfrac{n(n+1)}{2}\\right\\}^2$",
        description: "1³+2³+···+n³ = (1+2+···+n)²",
        example: "$\\sum_{k=1}^{5} k^3 = 15^2 = 225$",
        tip: "세제곱의 합 = 자연수 합의 제곱. 아름다운 공식."
      },
      {
        name: "상수배",
        formula: "$\\sum_{k=1}^{n} ca_k = c\\sum_{k=1}^{n} a_k$",
        description: "상수는 시그마 밖으로 뺄 수 있다",
        example: "$\\sum_{k=1}^{10} 3k = 3 \\cdot \\dfrac{10 \\times 11}{2} = 165$",
        tip: "분배법칙의 시그마 버전."
      },
      {
        name: "합의 분배",
        formula: "$\\sum_{k=1}^{n} (a_k \\pm b_k) = \\sum_{k=1}^{n} a_k \\pm \\sum_{k=1}^{n} b_k$",
        description: "시그마는 덧셈/뺄셈에 대해 분배 가능",
        example: "$\\sum(k^2+k) = \\sum k^2 + \\sum k$",
        tip: "곱셈에는 분배 불가: Σ(a_k · b_k) ≠ Σa_k · Σb_k."
      },
      {
        name: "상수의 합",
        formula: "$\\sum_{k=1}^{n} c = nc$",
        description: "상수를 n번 더하면 nc",
        example: "$\\sum_{k=1}^{50} 3 = 150$",
        tip: "시그마 안에 k가 없으면 상수. n을 곱하면 끝."
      },
      {
        name: "시그마 범위 분할",
        formula: "$\\sum_{k=1}^{n} a_k = \\sum_{k=1}^{m} a_k + \\sum_{k=m+1}^{n} a_k$",
        description: "합의 범위를 나누어 계산",
        example: "$\\sum_{k=1}^{100} a_k = \\sum_{k=1}^{50} a_k + \\sum_{k=51}^{100} a_k$",
        tip: "조건에 따라 수열이 달라지는 경우(조건부 수열) 필수."
      },
      {
        name: "시그마 인덱스 치환",
        formula: "$\\sum_{k=1}^{n} a_k = \\sum_{k=0}^{n-1} a_{k+1}$",
        description: "인덱스를 평행이동하여 다른 시그마와 맞출 수 있다",
        example: "$\\sum_{k=2}^{n} a_k = \\sum_{k=1}^{n-1} a_{k+1}$ (k→k+1 치환)",
        tip: "점화식과 시그마를 결합할 때 인덱스 맞추기에 활용."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 7. 급수의 수렴
  // ─────────────────────────────────────────────
  {
    category: "급수의 수렴",
    formulas: [
      {
        name: "무한등비급수",
        formula: "$\\sum_{n=1}^{\\infty} a_1 r^{n-1} = \\dfrac{a_1}{1-r} \\quad (|r|<1)$",
        description: "공비의 절댓값이 1보다 작을 때 수렴",
        example: "$a_1=6,\\; r=\\dfrac{1}{3} \\Rightarrow S=\\dfrac{6}{1-\\frac{1}{3}}=9$",
        tip: "수렴 조건 |r| < 1 확인이 최우선. r ≥ 1이면 발산."
      },
      {
        name: "수렴 조건",
        formula: "$|r| < 1$",
        description: "무한등비급수가 수렴할 필요충분조건",
        example: "$r = -\\dfrac{1}{2}: |r|=\\dfrac{1}{2}<1$ \\Rightarrow 수렴",
        tip: "r < 0도 수렴 가능. |r|로 판단한다."
      },
      {
        name: "급수 수렴의 필요조건",
        formula: "$\\sum a_n \\text{ 수렴} \\Rightarrow \\lim_{n \\to \\infty} a_n = 0$",
        description: "급수가 수렴하면 일반항은 반드시 0에 수렴",
        example: "$a_n = \\dfrac{1}{n}$: $a_n \\to 0$이지만 $\\sum \\dfrac{1}{n}$은 발산(역은 성립 안 함)",
        tip: "필요조건이지 충분조건이 아님! 역은 거짓."
      },
      {
        name: "부분분수 분해 (텔레스코핑)",
        formula: "$\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}$",
        description: "인접 항이 소거되어 첫 항과 끝 항만 남음",
        example: "$\\sum_{k=1}^{n} \\dfrac{1}{k(k+1)} = 1 - \\dfrac{1}{n+1}$",
        tip: "망원경(telescoping) 급수. 수능 단골 유형."
      },
      {
        name: "일반 부분분수",
        formula: "$\\dfrac{1}{k(k+d)} = \\dfrac{1}{d}\\left(\\dfrac{1}{k} - \\dfrac{1}{k+d}\\right)$",
        description: "분모의 차이가 $d$인 부분분수 분해",
        example: "$\\dfrac{1}{k(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{k} - \\dfrac{1}{k+2}\\right)$",
        tip: "d=1이면 기본형. d=2,3인 경우 1/d를 앞에 곱한다."
      },
      {
        name: "무한급수와 부분합",
        formula: "$\\sum_{n=1}^{\\infty} a_n = \\lim_{n \\to \\infty} S_n$",
        description: "무한급수의 값은 부분합의 극한",
        example: "$S_n = 1 - \\dfrac{1}{n+1} \\Rightarrow \\sum = \\lim S_n = 1$",
        tip: "부분합 S_n을 먼저 구한 뒤 극한을 취한다."
      },
      {
        name: "순환소수와 등비급수",
        formula: "$0.\\overline{ab} = \\dfrac{ab}{99}$",
        description: "순환소수는 무한등비급수로 표현 가능",
        example: "$0.\\overline{3} = \\dfrac{3}{10} + \\dfrac{3}{100} + \\cdots = \\dfrac{3/10}{1-1/10} = \\dfrac{1}{3}$",
        tip: "실생활 응용 문제에서 등비급수 개념 확인용으로 출제."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 8. 부분합과 일반항
  // ─────────────────────────────────────────────
  {
    category: "부분합과 일반항",
    formulas: [
      {
        name: "기본 관계 (n ≥ 2)",
        formula: "$a_n = S_n - S_{n-1} \\quad (n \\geq 2)$",
        description: "부분합에서 일반항을 구하는 핵심 공식",
        example: "$S_n = n^2 + n \\Rightarrow a_n = (n^2+n)-((n-1)^2+(n-1)) = 2n$",
        tip: "n ≥ 2에서 구한 뒤 반드시 n=1도 따로 확인."
      },
      {
        name: "n=1일 때 확인",
        formula: "$a_1 = S_1$",
        description: "$n=1$은 $S_0$이 정의되지 않으므로 별도 확인",
        example: "$S_n = n^2+n \\Rightarrow a_1 = S_1 = 2,\\; a_n=2n$에 $n=1$ 대입 $\\to 2$ \\checkmark",
        tip: "일치하면 a_n 하나로 통합. 불일치하면 조각함수로 표현."
      },
      {
        name: "조각함수 표현",
        formula: "$a_n = \\begin{cases} S_1 & (n=1) \\\\ S_n - S_{n-1} & (n \\geq 2) \\end{cases}$",
        description: "$n=1$이 일반항 공식에 맞지 않을 때",
        example: "$S_n=n^2: a_1=1,\\; a_n=2n-1\\;(n \\geq 2)$. $n=1$: $2(1)-1=1$ \\checkmark (이 경우 통합)",
        tip: "수능에서 n=1 불일치를 놓치면 오답. 항상 검증할 것."
      },
      {
        name: "S_n이 a_n을 포함할 때",
        formula: "$S_n = f(a_n) \\Rightarrow S_{n-1} = f(a_{n-1})$ 빼서 점화식 유도",
        description: "$S_n$과 $a_n$의 관계식에서 점화식을 얻는 방법",
        example: "$S_n = 2a_n - 1: S_{n-1}=2a_{n-1}-1 \\Rightarrow a_n = 2a_n - 2a_{n-1} \\Rightarrow a_n = 2a_{n-1}$",
        tip: "등비수열이 되는 경우가 많다. a_1 = S_1으로 초기값 확인."
      },
      {
        name: "S_n이 이차식일 때",
        formula: "$S_n = An^2 + Bn \\Rightarrow \\text{등차수열}$",
        description: "$S_n$이 $n$에 대한 이차식(상수항 0)이면 등차수열",
        example: "$S_n = 3n^2 + 2n \\Rightarrow a_n = 6n - 1,\\; d=6$",
        tip: "상수항이 0이 아니면 a_1 ≠ 일반항 공식. 등차 아닐 수 있다."
      },
      {
        name: "S_n이 지수함수일 때",
        formula: "$S_n = A \\cdot r^n + C \\Rightarrow a_n = A(r^n - r^{n-1}) = Ar^{n-1}(r-1)$",
        description: "부분합이 지수형이면 일반항도 지수형(등비 가능)",
        example: "$S_n = 3^n - 1: a_n = 3^n - 3^{n-1} = 2 \\cdot 3^{n-1}$",
        tip: "C ≠ 0이면 a_1 = S_1 = A·r + C를 별도 확인."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 9. 수열 응용
  // ─────────────────────────────────────────────
  {
    category: "수열 응용",
    formulas: [
      {
        name: "계차수열",
        formula: "$b_n = a_{n+1} - a_n \\Rightarrow a_n = a_1 + \\sum_{k=1}^{n-1} b_k$",
        description: "인접 항의 차이로 이루어진 수열 $\\{b_n\\}$을 이용",
        example: "$a_n: 1, 2, 4, 7, 11, \\ldots \\Rightarrow b_n: 1, 2, 3, 4, \\ldots$",
        tip: "n ≥ 2에서 성립. n=1은 a_1 자체로 확인."
      },
      {
        name: "군수열 — 제k군의 항 수",
        formula: "제$k$군에 $f(k)$개의 항이 있을 때, $n$번째 항이 속하는 군 찾기",
        description: "$\\sum_{k=1}^{m-1} f(k) < n \\leq \\sum_{k=1}^{m} f(k)$이면 제$m$군",
        example: "제$k$군에 $k$개: $1|2,3|4,5,6|\\ldots$ → 10번째 항은 제4군",
        tip: "군의 누적 항 수를 구해 n이 어디에 속하는지 판단."
      },
      {
        name: "군수열 — 제k군의 첫째항",
        formula: "제$k$군의 첫 항 = 전체 수열의 $\\left(\\sum_{i=1}^{k-1} f(i) + 1\\right)$번째 항",
        description: "이전 군까지의 총 항 수 + 1이 현재 군의 시작 위치",
        example: "제$k$군에 $k$개: 제4군 첫 항 = (1+2+3)+1 = 7번째",
        tip: "전체 수열의 일반항을 먼저 파악한 후 위치를 대입."
      },
      {
        name: "규칙 찾기 (주기수열)",
        formula: "$a_{n+p} = a_n$ (주기 $p$)",
        description: "일정 간격으로 같은 값이 반복되는 수열",
        example: "$a_n: 1, 3, 5, 1, 3, 5, \\ldots$ (주기 3) → $a_{100} = a_1 = 1$",
        tip: "나머지 연산: a_{100} = a_{100 mod 3} = a_1."
      },
      {
        name: "피보나치형 수열",
        formula: "$a_{n+2} = a_{n+1} + a_n$",
        description: "앞의 두 항을 더해 다음 항을 만드는 점화식",
        example: "$1, 1, 2, 3, 5, 8, 13, 21, \\ldots$",
        tip: "직접 나열이 가장 빠르다. 일반항보다 직접 계산이 효율적."
      },
      {
        name: "조건부 점화식",
        formula: "$a_{n+1} = \\begin{cases} f(a_n) & (\\text{조건 A}) \\\\ g(a_n) & (\\text{조건 B}) \\end{cases}$",
        description: "조건에 따라 점화식이 달라지는 수열",
        example: "$a_{n+1} = \\begin{cases} a_n/2 & (a_n \\text{ 짝수}) \\\\ 3a_n+1 & (a_n \\text{ 홀수}) \\end{cases}$",
        tip: "직접 나열하여 주기를 발견하는 것이 정석."
      },
      {
        name: "수열의 귀납적 정의와 표",
        formula: "점화식 + 초기조건 → 직접 나열",
        description: "복잡한 점화식은 처음 몇 항을 나열하여 규칙 파악",
        example: "$a_1=1,\\; a_{n+1}=a_n^2-2a_n+2: 1, 1, 1, \\ldots$ (상수열)",
        tip: "수능에서는 5~6항 나열하면 패턴이 보이는 경우가 대부분."
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
        name: "수열 + 함수 (합성)",
        formula: "$a_n = f(n)$ 또는 $f(a_n) = g(n)$",
        description: "수열의 항이 함수값으로 정의되거나, 함수 안에 수열이 들어가는 유형",
        example: "$f(x) = x^2 - 3x,\\; a_{n+1} = f(a_n)$: 점화식으로 변환",
        tip: "함수의 고정점(f(α) = α)을 찾으면 수렴값 파악 가능."
      },
      {
        name: "수열 + 부등식",
        formula: "$a_n \\leq M \\text{ 또는 } S_n > k$의 조건을 만족하는 $n$ 찾기",
        description: "수열의 크기 비교와 범위 문제",
        example: "$S_n = n^2 - 10n > 0 \\Rightarrow n(n-10) > 0 \\Rightarrow n \\geq 11$",
        tip: "이차부등식을 풀되, n은 자연수임을 잊지 말 것."
      },
      {
        name: "점화식 + 급수",
        formula: "$\\sum_{n=1}^{\\infty} a_n$ where $a_{n+1} = f(a_n)$",
        description: "점화식으로 정의된 수열의 무한급수",
        example: "$a_{n+1} = \\dfrac{a_n}{2},\\; a_1=4 \\Rightarrow \\sum = \\dfrac{4}{1-\\frac{1}{2}} = 8$",
        tip: "점화식을 풀어 일반항을 구한 뒤 급수 공식 적용."
      },
      {
        name: "수열 + 정수 조건",
        formula: "$a_n \\in \\mathbb{Z}$인 조건 활용",
        description: "일반항이 정수가 되는 $n$의 조건 또는 범위",
        example: "$a_n = \\dfrac{n^2+1}{n-1}$: $n-1 | n^2+1$이면 정수",
        tip: "나머지 정리, 약수 조건을 활용. 수능 고난도 유형."
      },
      {
        name: "로그 + 수열",
        formula: "$\\log a_n$ 또는 $a_n = b^{f(n)}$",
        description: "등비수열에 로그를 씌우면 등차수열이 됨",
        example: "$a_n = 2 \\cdot 3^n: \\log a_n = \\log 2 + n\\log 3$ (등차)",
        tip: "등비 → 로그 → 등차 변환은 킬러 문항의 핵심 기법."
      },
      {
        name: "절댓값 + 수열",
        formula: "$|a_n - L| < \\epsilon$ 또는 $|S_n|$ 최솟값",
        description: "수열의 수렴/극한과 절댓값 조건 결합",
        example: "$a_n = (-1)^n \\cdot \\dfrac{1}{n}$: $|a_n| = \\dfrac{1}{n} \\to 0$",
        tip: "교대 수열은 |a_n|으로 크기를 먼저 파악."
      },
      {
        name: "수열의 최대·최소",
        formula: "$a_n$의 최댓값: $a_{n+1} - a_n$의 부호 변화 지점",
        description: "일반항의 증가/감소를 판단하여 극값을 찾는 방법",
        example: "$a_n = n(10-n): a_{n+1}-a_n = 9-2n = 0 \\Rightarrow n=4.5 \\Rightarrow a_5$ 최대",
        tip: "수열은 이산적이므로 부등식으로 범위를 구한 뒤 자연수 n 선택."
      },
      {
        name: "다중 조건 점화식",
        formula: "조건 여러 개가 동시에 주어지는 점화식",
        description: "$a_{n+1}$이 $a_n$과 $n$의 조건에 따라 다르게 정의",
        example: "$a_1=5,\\; a_{n+1}=a_n+n\\;(a_n<20),\\; a_{n+1}=a_n-10\\;(a_n \\geq 20)$",
        tip: "직접 나열 → 주기 발견이 핵심. 대부분 5~8항 내에 반복."
      }
    ]
  }
];
