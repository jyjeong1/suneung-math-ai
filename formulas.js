// 수능수학 확률과통계 공식 레퍼런스
// Korean CSAT (수학능력시험) Probability & Statistics Formula Bank

const FORMULA_BANK = [
  // ═══════════════════════════════════════════════════════════
  // 1. 순열과 조합
  // ═══════════════════════════════════════════════════════════
  {
    category: "순열과 조합",
    formulas: [
      {
        name: "순열",
        formula: "$_nP_r = \\frac{n!}{(n-r)!}$",
        description: "서로 다른 n개에서 r개를 선택하여 일렬로 나열하는 경우의 수",
        example: "$_5P_3 = \\frac{5!}{2!} = 60$",
        tip: "순서가 중요할 때 사용 (뽑아서 나열)"
      },
      {
        name: "조합",
        formula: "$_nC_r = \\frac{n!}{r!(n-r)!}$",
        description: "서로 다른 n개에서 r개를 선택하는 경우의 수 (순서 무관)",
        example: "$_5C_3 = \\frac{5!}{3! \\cdot 2!} = 10$",
        tip: "순서가 상관없을 때 사용 (뽑기만)"
      },
      {
        name: "중복순열",
        formula: "$_n\\Pi_r = n^r$",
        description: "서로 다른 n개에서 중복을 허락하여 r개를 선택해 나열하는 경우의 수",
        example: "$_3\\Pi_2 = 3^2 = 9$",
        tip: "같은 것을 여러 번 뽑을 수 있고 순서도 중요할 때"
      },
      {
        name: "중복조합",
        formula: "$_nH_r = _{n+r-1}C_r = \\frac{(n+r-1)!}{r!(n-1)!}$",
        description: "서로 다른 n개에서 중복을 허락하여 r개를 선택하는 경우의 수 (순서 무관)",
        example: "$_3H_2 = _4C_2 = 6$",
        tip: "같은 종류를 여러 개 고를 수 있을 때 (과일 고르기 등)"
      },
      {
        name: "같은 것이 있는 순열",
        formula: "$\\frac{n!}{p! \\cdot q! \\cdot r! \\cdots}$",
        description: "n개 중 같은 것이 각각 p개, q개, r개, ... 있을 때 일렬로 나열하는 경우의 수",
        example: "$\\text{aabbc를 나열} = \\frac{5!}{2! \\cdot 2! \\cdot 1!} = 30$",
        tip: "문자열 나열, 최단경로 문제에 자주 출제"
      },
      {
        name: "원순열",
        formula: "$(n-1)!$",
        description: "서로 다른 n개를 원형으로 나열하는 경우의 수",
        example: "$5\\text{명이 원탁에 앉는 경우} = (5-1)! = 24$",
        tip: "원탁 배치, 목걸이 문제. 회전하면 같은 배열은 하나로 센다"
      },
      {
        name: "이항계수의 성질",
        formula: "$$_nC_r = _nC_{n-r}$$\n$$_nC_r = _{n-1}C_{r-1} + _{n-1}C_r$$",
        description: "조합의 대칭성과 파스칼 항등식",
        example: "$_6C_4 = _6C_2 = 15$",
        tip: "대칭성: r개를 고르는 것은 (n-r)개를 제외하는 것과 같다"
      },
      {
        name: "이항정리",
        formula: "$$(a+b)^n = \\sum_{r=0}^{n} _nC_r \\, a^{n-r} b^r$$",
        description: "이항식의 거듭제곱 전개. 일반항은 $_nC_r \\, a^{n-r} b^r$",
        example: "$(x+1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$",
        tip: "특정 항의 계수 구하기, $_nC_0 + _nC_1 + \\cdots + _nC_n = 2^n$"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 2. 확률
  // ═══════════════════════════════════════════════════════════
  {
    category: "확률",
    formulas: [
      {
        name: "확률의 정의",
        formula: "$P(A) = \\frac{n(A)}{n(S)}$",
        description: "사건 A가 일어날 확률 = 사건 A의 원소의 수 / 표본공간 S의 원소의 수",
        example: "$\\text{주사위에서 짝수} = \\frac{3}{6} = \\frac{1}{2}$",
        tip: "$0 \\le P(A) \\le 1$, $P(S) = 1$, $P(\\emptyset) = 0$"
      },
      {
        name: "여사건의 확률",
        formula: "$P(A^c) = 1 - P(A)$",
        description: "사건 A가 일어나지 않을 확률",
        example: "$P(\\text{적어도 하나}) = 1 - P(\\text{하나도 아닌})$",
        tip: "'적어도', '최소' 가 나오면 여사건 활용을 먼저 생각하자"
      },
      {
        name: "합사건의 확률",
        formula: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$",
        description: "사건 A 또는 B가 일어날 확률 (포함-배제 원리)",
        example: "$P(A \\cup B) = 0.4 + 0.5 - 0.2 = 0.7$",
        tip: "벤다이어그램을 그려서 겹치는 부분을 확인하자"
      },
      {
        name: "배반사건의 확률",
        formula: "$A \\cap B = \\emptyset \\Rightarrow P(A \\cup B) = P(A) + P(B)$",
        description: "두 사건이 동시에 일어나지 않을 때 (서로 배반) 합사건의 확률",
        example: "$P(1 \\text{또는} 6) = \\frac{1}{6} + \\frac{1}{6} = \\frac{1}{3}$",
        tip: "배반이면 교집합이 공집합이므로 단순 합산 가능"
      },
      {
        name: "독립사건의 확률",
        formula: "$P(A \\cap B) = P(A) \\cdot P(B)$",
        description: "두 사건이 서로 영향을 주지 않을 때 동시에 일어날 확률",
        example: "$\\text{동전 앞면} \\times \\text{주사위 6} = \\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}$",
        tip: "독립 ↔ $P(B|A) = P(B)$. 독립과 배반은 다른 개념!"
      },
      {
        name: "종속사건",
        formula: "$P(A \\cap B) = P(A) \\cdot P(B|A)$",
        description: "사건 A가 사건 B에 영향을 줄 때 (비복원추출 등) 동시에 일어날 확률",
        example: "$\\text{비복원 2장 뽑기: 첫 번째 빨강} \\times \\text{두 번째 빨강}$",
        tip: "비복원추출은 종속, 복원추출은 독립"
      },
      {
        name: "조건부확률",
        formula: "$P(B|A) = \\frac{P(A \\cap B)}{P(A)}$",
        description: "사건 A가 일어났을 때 사건 B가 일어날 확률",
        example: "$P(B|A) = \\frac{0.3}{0.5} = 0.6$",
        tip: "조건이 주어지면 표본공간이 축소된다고 생각하자"
      },
      {
        name: "확률의 곱셈정리",
        formula: "$P(A \\cap B) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)$",
        description: "두 사건의 교집합 확률을 조건부확률로 구하는 공식",
        example: "$P(A \\cap B) = 0.5 \\times 0.6 = 0.3$",
        tip: "조건부확률 문제에서 교집합을 구할 때 핵심 공식"
      },
      {
        name: "전확률 공식과 베이즈 정리",
        formula: "$P(B) = P(A)P(B|A) + P(A^c)P(B|A^c)$\n$$P(A|B) = \\frac{P(A)P(B|A)}{P(A)P(B|A) + P(A^c)P(B|A^c)}$$",
        description: "원인의 확률을 결과의 확률로부터 역추적하는 공식",
        example: "$\\text{공장 A(60%), B(40%)에서 불량률이 각각 2%, 5%일 때 불량품이 A에서 나왔을 확률}$",
        tip: "수능에서 표/트리 다이어그램으로 자주 출제. 분모는 전체 확률"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 3. 확률분포
  // ═══════════════════════════════════════════════════════════
  {
    category: "확률분포",
    formulas: [
      {
        name: "확률변수와 확률분포",
        formula: "$\\sum_{i} P(X = x_i) = 1, \\quad P(X = x_i) \\ge 0$",
        description: "이산확률변수 X의 확률분포표에서 모든 확률의 합은 1",
        example: "$P(X=1) + P(X=2) + P(X=3) = 1$",
        tip: "확률분포표가 주어지면 합이 1인 조건으로 미지수를 구하자"
      },
      {
        name: "기댓값 (평균)",
        formula: "$E(X) = \\sum_{i} x_i \\cdot P(X = x_i)$",
        description: "확률변수 X의 기댓값 (확률가중평균)",
        example: "$E(X) = 1 \\times 0.2 + 2 \\times 0.5 + 3 \\times 0.3 = 2.1$",
        tip: "각 값에 확률을 곱해서 더한다. '평균적으로 기대되는 값'"
      },
      {
        name: "분산",
        formula: "$V(X) = E(X^2) - \\{E(X)\\}^2$",
        description: "확률변수 X의 분산 (흩어진 정도의 제곱 평균)",
        example: "$E(X^2) = 1^2 \\times 0.2 + 2^2 \\times 0.5 + 3^2 \\times 0.3 = 4.9$\n$V(X) = 4.9 - 2.1^2 = 0.49$",
        tip: "$V(X) = E(X^2) - \\{E(X)\\}^2$ 공식이 계산에 편리하다"
      },
      {
        name: "표준편차",
        formula: "$\\sigma(X) = \\sqrt{V(X)}$",
        description: "분산의 양의 제곱근. 원래 단위와 같은 단위의 산포도",
        example: "$\\sigma(X) = \\sqrt{0.49} = 0.7$",
        tip: "분산을 먼저 구한 후 제곱근을 취한다"
      },
      {
        name: "기댓값의 선형성",
        formula: "$E(aX + b) = aE(X) + b$",
        description: "확률변수의 선형 변환에서 기댓값의 성질",
        example: "$E(X) = 3 \\Rightarrow E(2X + 5) = 2 \\times 3 + 5 = 11$",
        tip: "기댓값은 상수배와 상수 더하기 모두 그대로 적용"
      },
      {
        name: "분산의 선형변환",
        formula: "$V(aX + b) = a^2 V(X)$",
        description: "분산은 상수배의 제곱만 영향. 상수 더하기는 분산에 영향 없음",
        example: "$V(X) = 4 \\Rightarrow V(3X + 2) = 9 \\times 4 = 36$",
        tip: "분산에서 +b는 사라진다! $\\sigma(aX+b) = |a|\\sigma(X)$"
      },
      {
        name: "이항분포",
        formula: "$X \\sim B(n, p)$\n$$P(X = k) = _nC_k \\, p^k (1-p)^{n-k}$$",
        description: "독립시행을 n번 반복할 때 성공 횟수 X의 확률분포",
        example: "$X \\sim B(5, 0.3) \\Rightarrow P(X=2) = _5C_2 (0.3)^2(0.7)^3 = 0.3087$",
        tip: "독립시행의 반복 + 성공/실패 2가지 결과 → 이항분포"
      },
      {
        name: "이항분포의 기댓값과 분산",
        formula: "$X \\sim B(n, p)$일 때\n$$E(X) = np, \\quad V(X) = npq \\quad (q = 1-p)$$",
        description: "이항분포의 평균과 분산 공식",
        example: "$X \\sim B(100, 0.3) \\Rightarrow E(X) = 30, \\, V(X) = 21$",
        tip: "이항분포 문제에서 E(X), V(X)는 이 공식으로 바로 계산"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 4. 정규분포
  // ═══════════════════════════════════════════════════════════
  {
    category: "정규분포",
    formulas: [
      {
        name: "정규분포",
        formula: "$X \\sim N(\\mu, \\sigma^2)$",
        description: "평균 $\\mu$, 분산 $\\sigma^2$인 정규분포. 종 모양의 대칭 곡선",
        example: "$X \\sim N(170, 25)$ → 평균 170, 표준편차 5",
        tip: "$N(\\mu, \\sigma^2)$에서 두 번째 값은 분산(σ²)임에 주의!"
      },
      {
        name: "표준정규분포",
        formula: "$Z \\sim N(0, 1)$",
        description: "평균 0, 표준편차 1인 정규분포. 모든 정규분포의 기준",
        example: "$P(0 \\le Z \\le 1.96) = 0.4750$",
        tip: "표준정규분포표는 $P(0 \\le Z \\le z)$ 값을 제공한다"
      },
      {
        name: "표준화 공식",
        formula: "$Z = \\frac{X - \\mu}{\\sigma}$",
        description: "$X \\sim N(\\mu, \\sigma^2)$를 $Z \\sim N(0,1)$로 변환하는 공식",
        example: "$X \\sim N(60, 100)$일 때 $P(X \\le 80) = P\\left(Z \\le \\frac{80-60}{10}\\right) = P(Z \\le 2)$",
        tip: "정규분포 확률 계산의 핵심. 항상 표준화 후 표에서 확률을 찾는다"
      },
      {
        name: "68-95-99.7 법칙",
        formula: "$P(\\mu - \\sigma \\le X \\le \\mu + \\sigma) \\approx 0.6827$\n$P(\\mu - 2\\sigma \\le X \\le \\mu + 2\\sigma) \\approx 0.9545$\n$P(\\mu - 3\\sigma \\le X \\le \\mu + 3\\sigma) \\approx 0.9973$",
        description: "정규분포에서 평균을 중심으로 표준편차 1배, 2배, 3배 범위 내에 포함되는 비율",
        example: "$\\text{IQ} \\sim N(100, 225) \\Rightarrow \\text{85~115 사이} \\approx 68.27\\%$",
        tip: "경험적 법칙이라고도 한다. 대략적 확률 추정에 유용"
      },
      {
        name: "정규분포의 대칭성",
        formula: "$P(Z \\ge 0) = P(Z \\le 0) = 0.5$\n$P(Z \\ge a) = 0.5 - P(0 \\le Z \\le a)$\n$P(Z \\le -a) = P(Z \\ge a)$",
        description: "표준정규분포는 Z=0에 대해 좌우대칭",
        example: "$P(Z \\ge 1.5) = 0.5 - P(0 \\le Z \\le 1.5) = 0.5 - 0.4332 = 0.0668$",
        tip: "표에 없는 음수 z값은 대칭성을 이용해 양수로 변환"
      },
      {
        name: "정규분포의 확률 계산",
        formula: "$P(a \\le Z \\le b) = P(0 \\le Z \\le b) - P(0 \\le Z \\le a)$ (단, $0 \\le a < b$)",
        description: "표준정규분포표를 이용하여 구간 확률을 구하는 방법",
        example: "$P(1 \\le Z \\le 2) = P(0 \\le Z \\le 2) - P(0 \\le Z \\le 1) = 0.4772 - 0.3413 = 0.1359$",
        tip: "구간을 0 기준으로 분해하여 표에서 값을 빼거나 더한다"
      },
      {
        name: "이항분포의 정규근사",
        formula: "$X \\sim B(n, p)$이고 $n$이 충분히 클 때\n$$X \\approx N(np, npq)$$",
        description: "시행 횟수가 충분히 크면 이항분포를 정규분포로 근사할 수 있다",
        example: "$X \\sim B(400, 0.5) \\approx N(200, 100)$",
        tip: "수능에서 n이 크고 이항분포의 확률을 구하라고 하면 정규근사 활용"
      },
      {
        name: "표준정규분포표 읽기",
        formula: "$P(0 \\le Z \\le z)$ 값을 표에서 읽는다",
        description: "주요 값: $P(0 \\le Z \\le 1) = 0.3413$, $P(0 \\le Z \\le 1.96) = 0.4750$, $P(0 \\le Z \\le 2.58) = 0.4951$",
        example: "$P(Z \\le 1.96) = 0.5 + 0.4750 = 0.9750$",
        tip: "수능 시험지에 표가 제공된다. 자주 나오는 값: 1.64(0.4495), 1.96(0.4750), 2.58(0.4951)"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 5. 통계적 추정
  // ═══════════════════════════════════════════════════════════
  {
    category: "통계적 추정",
    formulas: [
      {
        name: "모집단과 표본",
        formula: "$\\text{모평균 } \\mu, \\quad \\text{모분산 } \\sigma^2, \\quad \\text{모표준편차 } \\sigma$",
        description: "모집단: 조사 대상 전체. 표본: 모집단에서 추출한 일부",
        example: "$\\text{전교생(모집단)에서 30명(표본)을 뽑아 키를 조사}$",
        tip: "모집단의 특성값(모수)을 표본의 통계량으로 추정하는 것이 통계적 추정"
      },
      {
        name: "표본평균의 기댓값과 분산",
        formula: "$E(\\bar{X}) = \\mu, \\quad V(\\bar{X}) = \\frac{\\sigma^2}{n}$",
        description: "크기 n인 표본의 표본평균 $\\bar{X}$의 기댓값은 모평균, 분산은 모분산/n",
        example: "$\\mu = 50, \\sigma^2 = 100, n = 25 \\Rightarrow E(\\bar{X}) = 50, V(\\bar{X}) = 4$",
        tip: "n이 커질수록 표본평균의 분산은 작아진다 (더 정확한 추정)"
      },
      {
        name: "표본평균의 분포",
        formula: "$\\text{모집단이 } N(\\mu, \\sigma^2)\\text{이면}$\n$$\\bar{X} \\sim N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$$",
        description: "정규모집단에서 추출한 표본평균은 정규분포를 따른다",
        example: "$N(170, 25)$에서 $n=25 \\Rightarrow \\bar{X} \\sim N(170, 1)$",
        tip: "모집단이 정규분포가 아니어도 n이 충분히 크면 근사적으로 정규분포 (중심극한정리)"
      },
      {
        name: "표본평균의 표준화",
        formula: "$Z = \\frac{\\bar{X} - \\mu}{\\frac{\\sigma}{\\sqrt{n}}}$",
        description: "표본평균을 표준정규분포로 변환하는 공식",
        example: "$\\bar{X} = 52, \\mu = 50, \\sigma = 10, n = 25 \\Rightarrow Z = \\frac{52-50}{10/5} = 1$",
        tip: "분모는 $\\sigma/\\sqrt{n}$ (표준오차)임에 주의. $\\sigma$가 아니다!"
      },
      {
        name: "모평균의 신뢰구간",
        formula: "$$\\bar{X} - z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}$$",
        description: "모표준편차 $\\sigma$를 알 때 모평균 $\\mu$의 신뢰구간",
        example: "$\\bar{X} = 75, \\sigma = 10, n = 100, \\text{신뢰도 95\\%}$\n$75 - 1.96 \\times 1 \\le \\mu \\le 75 + 1.96 \\times 1$\n$73.04 \\le \\mu \\le 76.96$",
        tip: "수능 필수 공식! $\\bar{x} \\pm z \\cdot \\frac{\\sigma}{\\sqrt{n}}$ 로 외우자"
      },
      {
        name: "신뢰도와 z값",
        formula: "$\\text{신뢰도 95\\%} \\Rightarrow z = 1.96$\n$\\text{신뢰도 99\\%} \\Rightarrow z = 2.58$",
        description: "자주 사용되는 신뢰도와 대응하는 표준정규분포 z값",
        example: "$\\text{95\\% 신뢰구간의 길이} = 2 \\times 1.96 \\times \\frac{\\sigma}{\\sqrt{n}}$",
        tip: "신뢰도가 높아지면 z값이 커져 신뢰구간도 넓어진다"
      },
      {
        name: "표본의 크기 결정",
        formula: "$$n \\ge \\left(\\frac{z_{\\alpha/2} \\cdot \\sigma}{d}\\right)^2$$",
        description: "신뢰구간의 길이를 $2d$ 이하로 하려면 필요한 최소 표본의 크기",
        example: "$\\sigma = 10, d = 2, z = 1.96 \\Rightarrow n \\ge \\left(\\frac{1.96 \\times 10}{2}\\right)^2 = 96.04 \\Rightarrow n \\ge 97$",
        tip: "n은 자연수이므로 올림 처리. 신뢰구간 폭을 절반으로 줄이려면 n은 4배"
      },
      {
        name: "모비율의 추정",
        formula: "$\\hat{p} \\pm z_{\\alpha/2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$",
        description: "표본비율 $\\hat{p}$로 모비율 $p$를 추정하는 신뢰구간 (참고)",
        example: "$\\hat{p} = 0.6, n = 400, \\text{95\\%} \\Rightarrow 0.6 \\pm 1.96\\sqrt{\\frac{0.24}{400}} = 0.6 \\pm 0.048$",
        tip: "수능 확률과통계에서는 참고 수준. 모평균 추정이 주로 출제된다"
      }
    ]
  }
];
