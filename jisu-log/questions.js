const QUESTION_BANK = [
  {
    "_type": "exp_basic",
    "type": "기본 지수 계산",
    "problem": "$2^{2}\\cdot 2^{3}=2^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$0$",
      "$2$",
      "$11$",
      "$5$",
      "$7$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n밑이 같으므로 지수를 더한다. $k=2+3=5$.",
    "difficulty": "lv1",
    "_qid": "R-0001",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "기본 지수 계산",
    "problem": "$3^{3}\\cdot 3^{4}=3^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$13$",
      "$1$",
      "$7$",
      "$17$",
      "$4$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n밑이 같으므로 지수를 더한다. $k=3+4=7$.",
    "difficulty": "lv1",
    "_qid": "R-0002",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "기본 지수 계산",
    "problem": "$2^{4}\\cdot 2^{5}=2^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$10$",
      "$9$",
      "$4$",
      "$12$",
      "$3$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n밑이 같으므로 지수를 더한다. $k=4+5=9$.",
    "difficulty": "lv1",
    "_qid": "R-0003",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "기본 지수 계산",
    "problem": "$5^{5}\\cdot 5^{6}=5^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$21$",
      "$11$",
      "$13$",
      "$17$",
      "$12$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n밑이 같으므로 지수를 더한다. $k=5+6=11$.",
    "difficulty": "lv1",
    "_qid": "R-0004",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "기본 지수 계산",
    "problem": "$3^{6}\\cdot 3^{7}=3^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$23$",
      "$13$",
      "$20$",
      "$9$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n밑이 같으므로 지수를 더한다. $k=6+7=13$.",
    "difficulty": "lv1",
    "_qid": "R-0005",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수 분수식",
    "problem": "$\\dfrac{2^{7}}{2^{3}}=2^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$4$",
      "$9$",
      "$7$",
      "$11$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n지수의 나눗셈 법칙을 적용하면 $k=7-3=4$.",
    "difficulty": "lv1",
    "_qid": "R-0006",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수 분수식",
    "problem": "$\\dfrac{3^{8}}{3^{5}}=3^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$10$",
      "$6$",
      "$9$",
      "$3$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n지수의 나눗셈 법칙을 적용하면 $k=8-5=3$.",
    "difficulty": "lv1",
    "_qid": "R-0007",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수 분수식",
    "problem": "$\\dfrac{5^{6}}{5^{2}}=5^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$0$",
      "$14$",
      "$4$",
      "$6$",
      "$7$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n지수의 나눗셈 법칙을 적용하면 $k=6-2=4$.",
    "difficulty": "lv1",
    "_qid": "R-0008",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수 분수식",
    "problem": "$\\dfrac{2^{9}}{2^{4}}=2^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$4$",
      "$2$",
      "$6$",
      "$9$",
      "$5$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n지수의 나눗셈 법칙을 적용하면 $k=9-4=5$.",
    "difficulty": "lv1",
    "_qid": "R-0009",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수 분수식",
    "problem": "$\\dfrac{3^{7}}{3^{2}}=3^k$일 때 $k$의 값은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$15$",
      "$8$",
      "$6$",
      "$9$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n지수의 나눗셈 법칙을 적용하면 $k=7-2=5$.",
    "difficulty": "lv1",
    "_qid": "R-0010",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 정의",
    "problem": "$\\log_{2}(2^{5})+\\log_{3}(3^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$10$",
      "$7$",
      "$17$",
      "$3$",
      "$0$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$\\log_a a^t=t$이므로 값은 $5+2=7$.",
    "difficulty": "lv1",
    "_qid": "R-0011",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 정의",
    "problem": "$\\log_{3}(3^{4})+\\log_{2}(2^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$2$",
      "$0$",
      "$8$",
      "$9$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$\\log_a a^t=t$이므로 값은 $4+2=6$.",
    "difficulty": "lv1",
    "_qid": "R-0012",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 정의",
    "problem": "$\\log_{5}(5^{3})+\\log_{2}(2^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$0$",
      "$9$",
      "$5$",
      "$7$",
      "$4$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$\\log_a a^t=t$이므로 값은 $3+2=5$.",
    "difficulty": "lv1",
    "_qid": "R-0013",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 정의",
    "problem": "$\\log_{2}(2^{4})+\\log_{4}(4^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$9$",
      "$4$",
      "$16$",
      "$13$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$\\log_a a^t=t$이므로 값은 $4+2=6$.",
    "difficulty": "lv1",
    "_qid": "R-0014",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 정의",
    "problem": "$\\log_{3}(3^{5})+\\log_{3}(3^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$8$",
      "$10$",
      "$13$",
      "$2$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$\\log_a a^t=t$이므로 값은 $5+2=7$.",
    "difficulty": "lv1",
    "_qid": "R-0015",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 계산",
    "problem": "$\\log_{2}(2^{6})-\\log_{2}(2^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$4$",
      "$10$",
      "$1$",
      "$9$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n로그의 차를 계산하면 $(6)-2=4$.",
    "difficulty": "lv1",
    "_qid": "R-0016",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 계산",
    "problem": "$\\log_{3}(3^{6})-\\log_{3}(3^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$4$",
      "$8$",
      "$2$",
      "$10$",
      "$3$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n로그의 차를 계산하면 $(6)-2=4$.",
    "difficulty": "lv1",
    "_qid": "R-0017",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 계산",
    "problem": "$\\log_{5}(5^{5})-\\log_{5}(5^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$7$",
      "$5$",
      "$0$",
      "$3$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n로그의 차를 계산하면 $(5)-2=3$.",
    "difficulty": "lv1",
    "_qid": "R-0018",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 계산",
    "problem": "$\\log_{2}(2^{8})-\\log_{2}(2^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$13$",
      "$6$",
      "$1$",
      "$10$",
      "$12$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n로그의 차를 계산하면 $(8)-2=6$.",
    "difficulty": "lv1",
    "_qid": "R-0019",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 계산",
    "problem": "$\\log_{3}(3^{7})-\\log_{3}(3^2)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$11$",
      "$5$",
      "$2$",
      "$4$",
      "$12$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n로그의 차를 계산하면 $(7)-2=5$.",
    "difficulty": "lv1",
    "_qid": "R-0020",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "로그함수 좌표",
    "problem": "$y=\\log_{2}(x-1)+3$의 그래프에서 점근선 $x=c$, 점 $( 3,\\ d)$가 위에 있을 때 $c+d$의 값은?",
    "answerType": "choice",
    "choices": [
      "$15$",
      "$3$",
      "$9$",
      "$5$",
      "$1$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n점근선은 $c=1$이다. $x=3$에서 $d=\\log_{2}2+3=4$이므로 $c+d=5$.",
    "difficulty": "lv1",
    "_qid": "R-0021",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "로그함수 좌표",
    "problem": "$y=\\log_{3}(x-2)+4$의 그래프에서 점근선 $x=c$, 점 $( 5,\\ d)$가 위에 있을 때 $c+d$의 값은?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$2$",
      "$4$",
      "$1$",
      "$14$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n점근선은 $c=2$이다. $x=5$에서 $d=\\log_{3}3+4=5$이므로 $c+d=7$.",
    "difficulty": "lv1",
    "_qid": "R-0022",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "로그함수 좌표",
    "problem": "$y=\\log_{2}(x-3)+2$의 그래프에서 점근선 $x=c$, 점 $( 5,\\ d)$가 위에 있을 때 $c+d$의 값은?",
    "answerType": "choice",
    "choices": [
      "$16$",
      "$2$",
      "$12$",
      "$6$",
      "$10$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n점근선은 $c=3$이다. $x=5$에서 $d=\\log_{2}2+2=3$이므로 $c+d=6$.",
    "difficulty": "lv1",
    "_qid": "R-0023",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "로그함수 좌표",
    "problem": "$y=\\log_{5}(x-1)+5$의 그래프에서 점근선 $x=c$, 점 $( 6,\\ d)$가 위에 있을 때 $c+d$의 값은?",
    "answerType": "choice",
    "choices": [
      "$4$",
      "$0$",
      "$3$",
      "$7$",
      "$13$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n점근선은 $c=1$이다. $x=6$에서 $d=\\log_{5}5+5=6$이므로 $c+d=7$.",
    "difficulty": "lv1",
    "_qid": "R-0024",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "로그함수 좌표",
    "problem": "$y=\\log_{3}(x-3)+5$의 그래프에서 점근선 $x=c$, 점 $( 6,\\ d)$가 위에 있을 때 $c+d$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$11$",
      "$9$",
      "$10$",
      "$16$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n점근선은 $c=3$이다. $x=6$에서 $d=\\log_{3}3+5=6$이므로 $c+d=9$.",
    "difficulty": "lv1",
    "_qid": "R-0025",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수방정식 해",
    "problem": "방정식 $2^{x-3}+1=5$의 해 $x$는?",
    "answerType": "choice",
    "choices": [
      "$2$",
      "$7$",
      "$8$",
      "$5$",
      "$4$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$2^{x-3}=4=2^2$이므로 $x-3=2$, $x=5$.",
    "difficulty": "lv2",
    "_qid": "R-0026",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수방정식 해",
    "problem": "방정식 $3^{x-2}+2=11$의 해 $x$는?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$9$",
      "$4$",
      "$10$",
      "$7$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$3^{x-2}=9=3^2$이므로 $x-2=2$, $x=4$.",
    "difficulty": "lv2",
    "_qid": "R-0027",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수방정식 해",
    "problem": "방정식 $2^{x-4}+3=7$의 해 $x$는?",
    "answerType": "choice",
    "choices": [
      "$13$",
      "$7$",
      "$2$",
      "$8$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$2^{x-4}=4=2^2$이므로 $x-4=2$, $x=6$.",
    "difficulty": "lv2",
    "_qid": "R-0028",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수방정식 해",
    "problem": "방정식 $5^{x-3}+1=26$의 해 $x$는?",
    "answerType": "choice",
    "choices": [
      "$10$",
      "$5$",
      "$15$",
      "$12$",
      "$3$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$5^{x-3}=25=5^2$이므로 $x-3=2$, $x=5$.",
    "difficulty": "lv2",
    "_qid": "R-0029",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_basic",
    "type": "지수방정식 해",
    "problem": "방정식 $3^{x-4}+2=11$의 해 $x$는?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$2$",
      "$12$",
      "$9$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$3^{x-4}=9=3^2$이므로 $x-4=2$, $x=6$.",
    "difficulty": "lv2",
    "_qid": "R-0030",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 진수 조건",
    "problem": "$\\log_{2}(x-1)=4$를 만족하는 실수 $x$는?",
    "answerType": "choice",
    "choices": [
      "$19$",
      "$22$",
      "$17$",
      "$20$",
      "$21$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n진수는 양수이고 $x-1=2^4=16$이므로 $x=17$.",
    "difficulty": "lv2",
    "_qid": "R-0031",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 진수 조건",
    "problem": "$\\log_{3}(x-2)=3$를 만족하는 실수 $x$는?",
    "answerType": "choice",
    "choices": [
      "$34$",
      "$27$",
      "$30$",
      "$36$",
      "$29$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n진수는 양수이고 $x-2=3^3=27$이므로 $x=29$.",
    "difficulty": "lv2",
    "_qid": "R-0032",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 진수 조건",
    "problem": "$\\log_{2}(x-4)=5$를 만족하는 실수 $x$는?",
    "answerType": "choice",
    "choices": [
      "$36$",
      "$39$",
      "$33$",
      "$26$",
      "$43$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n진수는 양수이고 $x-4=2^5=32$이므로 $x=36$.",
    "difficulty": "lv2",
    "_qid": "R-0033",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 진수 조건",
    "problem": "$\\log_{5}(x-3)=2$를 만족하는 실수 $x$는?",
    "answerType": "choice",
    "choices": [
      "$28$",
      "$22$",
      "$31$",
      "$32$",
      "$23$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n진수는 양수이고 $x-3=5^2=25$이므로 $x=28$.",
    "difficulty": "lv2",
    "_qid": "R-0034",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 진수 조건",
    "problem": "$\\log_{3}(x-1)=6$를 만족하는 실수 $x$는?",
    "answerType": "choice",
    "choices": [
      "$720$",
      "$730$",
      "$726$",
      "$725$",
      "$724$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n진수는 양수이고 $x-1=3^6=729$이므로 $x=730$.",
    "difficulty": "lv2",
    "_qid": "R-0035",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그함수 단조성과 정수해",
    "problem": "부등식 $0&lt;\\log_{2}(x-2)&lt;3$를 만족하는 정수 $x$의 개수는?",
    "answerType": "choice",
    "choices": [
      "$11$",
      "$7$",
      "$6$",
      "$13$",
      "$5$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$1&lt;x-2&lt;8$이므로 정수 $x-2$는 $2$부터 $7$까지이다. 개수는 $6$개이다.",
    "difficulty": "lv2",
    "_qid": "R-0036",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그함수 단조성과 정수해",
    "problem": "부등식 $0&lt;\\log_{3}(x-1)&lt;2$를 만족하는 정수 $x$의 개수는?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$13$",
      "$11$",
      "$1$",
      "$9$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$1&lt;x-1&lt;9$이므로 정수 $x-1$는 $2$부터 $8$까지이다. 개수는 $7$개이다.",
    "difficulty": "lv2",
    "_qid": "R-0037",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그함수 단조성과 정수해",
    "problem": "부등식 $0&lt;\\log_{5}(x-3)&lt;2$를 만족하는 정수 $x$의 개수는?",
    "answerType": "choice",
    "choices": [
      "$24$",
      "$29$",
      "$23$",
      "$13$",
      "$27$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$1&lt;x-3&lt;25$이므로 정수 $x-3$는 $2$부터 $24$까지이다. 개수는 $23$개이다.",
    "difficulty": "lv2",
    "_qid": "R-0038",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그함수 단조성과 정수해",
    "problem": "부등식 $0&lt;\\log_{2}(x-4)&lt;4$를 만족하는 정수 $x$의 개수는?",
    "answerType": "choice",
    "choices": [
      "$14$",
      "$19$",
      "$15$",
      "$24$",
      "$13$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$1&lt;x-4&lt;16$이므로 정수 $x-4$는 $2$부터 $15$까지이다. 개수는 $14$개이다.",
    "difficulty": "lv2",
    "_qid": "R-0039",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그함수 단조성과 정수해",
    "problem": "부등식 $0&lt;\\log_{3}(x-3)&lt;3$를 만족하는 정수 $x$의 개수는?",
    "answerType": "choice",
    "choices": [
      "$31$",
      "$22$",
      "$32$",
      "$19$",
      "$25$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$1&lt;x-3&lt;27$이므로 정수 $x-3$는 $2$부터 $26$까지이다. 개수는 $25$개이다.",
    "difficulty": "lv2",
    "_qid": "R-0040",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "밑변환과 합성",
    "problem": "$\\log_{2}(2^{4})+\\log_{4}(4^{3})$의 값은?",
    "answerType": "choice",
    "choices": [
      "$1$",
      "$5$",
      "$12$",
      "$17$",
      "$7$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n각 로그를 계산하면 첫째 항은 $4$, 둘째 항은 $3$이므로 합은 $7$.",
    "difficulty": "lv2",
    "_qid": "R-0041",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "밑변환과 합성",
    "problem": "$\\log_{3}(3^{2})+\\log_{9}(9^{4})$의 값은?",
    "answerType": "choice",
    "choices": [
      "$3$",
      "$6$",
      "$9$",
      "$0$",
      "$7$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n각 로그를 계산하면 첫째 항은 $2$, 둘째 항은 $4$이므로 합은 $6$.",
    "difficulty": "lv2",
    "_qid": "R-0042",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "밑변환과 합성",
    "problem": "$\\log_{2}(2^{5})+\\log_{4}(4^{2})$의 값은?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$17$",
      "$12$",
      "$14$",
      "$3$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n각 로그를 계산하면 첫째 항은 $5$, 둘째 항은 $2$이므로 합은 $7$.",
    "difficulty": "lv2",
    "_qid": "R-0043",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "밑변환과 합성",
    "problem": "$\\log_{5}(5^{2})+\\log_{25}(25^{3})$의 값은?",
    "answerType": "choice",
    "choices": [
      "$2$",
      "$11$",
      "$5$",
      "$9$",
      "$0$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n각 로그를 계산하면 첫째 항은 $2$, 둘째 항은 $3$이므로 합은 $5$.",
    "difficulty": "lv2",
    "_qid": "R-0044",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "밑변환과 합성",
    "problem": "$\\log_{3}(3^{4})+\\log_{9}(9^{2})$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$0$",
      "$4$",
      "$10$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n각 로그를 계산하면 첫째 항은 $4$, 둘째 항은 $2$이므로 합은 $6$.",
    "difficulty": "lv2",
    "_qid": "R-0045",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수함수의 역함수",
    "problem": "$f(x)=2^{x-3}+4$의 역함수를 $g$라 할 때 $g(8)+4$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$7$",
      "$9$",
      "$10$",
      "$2$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$f(5)=2^2+4=8$이므로 $g(8)=5$. 따라서 답은 $9$.",
    "difficulty": "lv2",
    "_qid": "R-0046",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수함수의 역함수",
    "problem": "$f(x)=3^{x-2}+5$의 역함수를 $g$라 할 때 $g(14)+5$의 값은?",
    "answerType": "choice",
    "choices": [
      "$19$",
      "$9$",
      "$8$",
      "$4$",
      "$11$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$f(4)=3^2+5=14$이므로 $g(14)=4$. 따라서 답은 $9$.",
    "difficulty": "lv2",
    "_qid": "R-0047",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수함수의 역함수",
    "problem": "$f(x)=2^{x-5}+3$의 역함수를 $g$라 할 때 $g(7)+3$의 값은?",
    "answerType": "choice",
    "choices": [
      "$3$",
      "$10$",
      "$13$",
      "$15$",
      "$17$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$f(7)=2^2+3=7$이므로 $g(7)=7$. 따라서 답은 $10$.",
    "difficulty": "lv2",
    "_qid": "R-0048",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수함수의 역함수",
    "problem": "$f(x)=5^{x-3}+2$의 역함수를 $g$라 할 때 $g(27)+2$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$13$",
      "$3$",
      "$7$",
      "$17$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$f(5)=5^2+2=27$이므로 $g(27)=5$. 따라서 답은 $7$.",
    "difficulty": "lv2",
    "_qid": "R-0049",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수함수의 역함수",
    "problem": "$f(x)=3^{x-4}+3$의 역함수를 $g$라 할 때 $g(12)+3$의 값은?",
    "answerType": "choice",
    "choices": [
      "$9$",
      "$8$",
      "$4$",
      "$5$",
      "$7$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$f(6)=3^2+3=12$이므로 $g(12)=6$. 따라서 답은 $9$.",
    "difficulty": "lv2",
    "_qid": "R-0050",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "역함수 대칭·좌표·직사각형",
    "problem": "$f(x)=2^x$, $g(x)=\\log_{2}x$이다. $f$ 위의 점 $P(2,4)$를 $y=x$에 대칭시켜 $Q$를 얻는다. 점 $Q$와 원점 $O$를 대각선 양 끝점으로 하는 좌표축에 평행한 직사각형의 넓이은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$7$",
      "$20$",
      "$4$",
      "$10$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$Q=(4,2)$이고 직사각형 넓이는 $4\\cdot 2=8$이다.",
    "difficulty": "lv3",
    "_qid": "R-0051",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "두 지수함수 교점·삼각형 넓이",
    "problem": "두 곡선 $y=2^x$, $y=2^{4-x}$의 교점을 $P$라 한다. $P$에서 $x$축과 $y$축에 내린 수선의 발을 각각 $H,K$라 할 때, 점 $P$의 $y$좌표는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$1$",
      "$4$",
      "$6$",
      "$5$",
      "$16$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n단조성에 따라 $x=4-x$이므로 $x=2$, $y=2^2=4$이다.",
    "difficulty": "lv3",
    "_qid": "R-0052",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그 대칭축·교점·좌표조건",
    "problem": "두 곡선 $y=\\log_{2}(x-1)$, $y=\\log_{2}(9-x)$의 교점을 $P(u,v)$라 한다. $u+v$의 값은?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$19$",
      "$4$",
      "$7$",
      "$15$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n진수 조건에서 $1&lt;x&lt;9$. 두 로그가 같으므로 $x-1=9-x$, $u=5$. $v=\\log_{2}4=2$이므로 답은 $7$.",
    "difficulty": "lv3",
    "_qid": "R-0053",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "수평선과 지수그래프·넓이",
    "problem": "수평선 $y=8$이 두 곡선 $y=2^x$, $y=2^{x-1}$와 만나는 점을 각각 $A,B$라 한다. 두 점 $A,B$의 $x$좌표의 합은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$6$",
      "$1$",
      "$10$",
      "$7$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n첫 번째 교점은 $2^x=8=2^3$에서 $A=(3,8)$이다. 두 번째 교점은 $2^{x-1}=8=2^3$에서 $x-1=3$, 즉 $B=(4,8)$이다. 따라서 두 점의 $x$좌표의 합은 $3+4=7$이다.",
    "difficulty": "lv3",
    "_qid": "R-0054",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "두 지수함수 점의 할선 기울기",
    "problem": "곡선 $y=2^x$ 위의 두 점 $A(0,1)$, $B(2,4)$를 지나는 직선의 기울기를 $m$이라 한다. $2m$의 값은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$7$",
      "$2$",
      "$6$",
      "$3$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$m=\\dfrac{4-1}{2}=\\frac{3}{2}$이므로 답은 $3$.",
    "difficulty": "lv3",
    "_qid": "R-0055",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그함수 그래프·거리 조건",
    "problem": "점 $P$는 곡선 $y=\\log_{2}(x-1)$ 위의 제1사분면 점이다. $P$에서 $x$축까지의 거리가 $3$이고, $P$의 $x$좌표가 $u$일 때 $u$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$9$",
      "$7$",
      "$3$",
      "$5$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$P$의 $y$좌표가 $3$이므로 $\\log_{2}(u-1)=3$, $u=1+8=9$. 따라서 답은 $9$.",
    "difficulty": "lv3",
    "_qid": "R-0056",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그합·이차부등식·정수해",
    "problem": "정수 $x$가 $\\log_{2}(x-1)+\\log_{2}(9-x)\\ge \\log_{2}12$를 만족한다. 가능한 정수 $x$의 개수은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$13$",
      "$9$",
      "$10$",
      "$15$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$u=x-1$로 놓으면 $u(8-u)\\ge 12$, 즉 $2\\le u\\le 6$이다. 따라서  개수는 $5$개이다.",
    "difficulty": "lv3",
    "_qid": "R-0057",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그함수 평행이동·점 간 거리합",
    "problem": "자연수 $j=1,2,\\ldots,3$에 대하여 $x=2^j$인 직선이 $y=\\log_{2}x$, $y=\\log_{2}x+2$와 만나는 점을 각각 $P_j,Q_j$라 한다. $\\sum_{j=1}^{3} P_jQ_j$의 값은?",
    "answerType": "choice",
    "choices": [
      "$1$",
      "$16$",
      "$10$",
      "$6$",
      "$4$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n모든 $j$에 대하여 세로거리 $P_jQ_j=2$이다. 합은 $3\\cdot2=6$.",
    "difficulty": "lv3",
    "_qid": "R-0058",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "지수함수 평행이동·직선 절편",
    "problem": "곡선 $y=2^x-1$ 위의 점 $A(0,0)$, $B(1,1)$를 잇는 직선의 $x$절편을 $t$라 한다. $t$의 값은?",
    "answerType": "choice",
    "choices": [
      "$3$",
      "$2$",
      "$0$",
      "$8$",
      "$1$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n직선 기울기는 $1$, 방정식은 $y=(1)x+(0)$. 따라서 $t=\\frac{0}{1}=0$이고 구하는 값은 $0$.",
    "difficulty": "lv3",
    "_qid": "R-0059",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "합성함수·역함수·정의역",
    "problem": "$f(x)=\\log_{2}(x-1)$, $g(x)=2^x+1$이다. $f(g(2))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$3$",
      "$5$",
      "$1$",
      "$2$",
      "$6$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$f$와 $g$는 서로 역함수이다. 따라서 답은 $2$. 정의역 $x&gt;1$도 만족한다.",
    "difficulty": "lv3",
    "_qid": "R-0060",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_log",
    "type": "지수치환·두 근·좌표거리",
    "problem": "방정식 $2^{2x}-10\\cdot 2^x+16=0$의 서로 다른 두 실근을 $\\alpha&lt;\\beta$라 한다. $x$축 위의 점 $A(\\alpha,0)$, $B(\\beta,0)$에 대하여 $AB$의 값은?",
    "answerType": "choice",
    "choices": [
      "$1$",
      "$6$",
      "$10$",
      "$7$",
      "$2$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$t=2^x&gt;0$으로 치환하면 $(t-2)(t-8)=0$이므로 $\\alpha=1$, $\\beta=3$. 따라서 답은 $2$.",
    "difficulty": "lv3",
    "_qid": "R-0061",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "지수그래프 두 점·기하평균",
    "problem": "$y=2^x$의 그래프 위의 점 $A(1,2)$, $B(3,8)$에 대하여 두 점의 $y$좌표의 기하평균을 $M$이라 한다. $\\log_{2} M$의 값은?",
    "answerType": "choice",
    "choices": [
      "$2$",
      "$7$",
      "$4$",
      "$0$",
      "$1$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$M=\\sqrt{2\\cdot 8}=2^{(1+3)/2}=4$이므로 답은 $2$.",
    "difficulty": "lv3",
    "_qid": "R-0062",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그그래프 두 점·중점 좌표",
    "problem": "$y=\\log_{2}x$ 위의 두 점 $P(2,1)$, $Q(8,3)$의 중점을 $M(u,v)$라 한다. $v$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$2$",
      "$7$",
      "$1$",
      "$0$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n중점은 $u=(2+8)/2$, $v=(1+3)/2$이다. 따라서 답은 $2$.",
    "difficulty": "lv3",
    "_qid": "R-0063",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수·로그 역함수·좌표 차",
    "problem": "$f(x)=2^x$와 그 역함수 $g$에 대하여 $P(3,8)$는 $f$ 위의 점이고 $Q$는 $P$를 직선 $y=x$에 대칭시킨 점이다. $P,Q$의 가로 거리는?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$3$",
      "$6$",
      "$1$",
      "$0$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$Q=(8,3)$이므로 가로거리는 $|8-3|=5$, 세로거리도 $5$이다. 답은 $5$.",
    "difficulty": "lv3",
    "_qid": "R-0064",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "composite_func",
    "type": "구간별 지수·로그 합성함수",
    "problem": "$f(x)=\\begin{cases}2^x &amp;(x\\le 3)\\\\ \\log_{2}x &amp;(x&gt;3)\\end{cases}$이다. $f(f(1))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$4$",
      "$16$",
      "$14$",
      "$7$",
      "$6$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n먼저 $f(1)=2$이고 $2\\le3$이므로 $f(2)=2^2=4$.",
    "difficulty": "lv3",
    "_qid": "R-0065",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 방정식·두 해·비에타",
    "problem": "방정식 $\\log_{2}(x-1)+\\log_{2}(9-x)=\\log_{2}12$의 두 실근을 $\\alpha&lt;\\beta$라 한다. $\\alpha+\\beta$의 값은?",
    "answerType": "choice",
    "choices": [
      "$16$",
      "$15$",
      "$11$",
      "$9$",
      "$10$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n정의역 $1&lt;x&lt;9$에서 $(x-1)(9-x)=12$. 두 해는 $3,7$이며 구하는 값은 $10$.",
    "difficulty": "lv3",
    "_qid": "R-0066",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "지수 평행이동·삼각형 넓이",
    "problem": "$y=2^{x-1}$ 위의 점 $A$의 $x$좌표가 $4$이다. $A$에서 두 좌표축에 내린 수선의 발을 $H,K$라 할 때 점 $A$의 두 좌표의 합는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$24$",
      "$10$",
      "$18$",
      "$17$",
      "$12$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$A=(4,8)$이고 답은 $12$.",
    "difficulty": "lv3",
    "_qid": "R-0067",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그 진수 동치·교점의 기하",
    "problem": "두 곡선 $y=\\log_{2}(x-1)$, $y=\\log_{2}(7-x)$의 교점 $P$에서 $x$축에 내린 수선의 발을 $H$라 한다. $OH$는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$0$",
      "$9$",
      "$14$",
      "$1$",
      "$4$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n두 로그의 진수가 같아야 하므로 $x-1=7-x$, $x=4$. 따라서 $H=(4,0)$, 답은 $4$.",
    "difficulty": "lv3",
    "_qid": "R-0068",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그함수 그래프·넓이 역추적",
    "problem": "$y=\\log_{2}x$의 그래프 위의 점 $P(u,v)$에서 $u=2^v$, $v$는 양의 정수이다. $O$와 $P$를 대각선으로 하는 직사각형 넓이가 $24$이고 $v\\le 5$일 때 $v$는?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$3$",
      "$8$",
      "$9$",
      "$15$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n넓이는 $uv=v\\cdot 2^v$이며 양의 정수에서 엄격히 증가한다. $v=3$일 때 넓이 $24$가 되므로 $u=8$, 답은 $3$.",
    "difficulty": "lv3",
    "_qid": "R-0069",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "밑변환·서로 다른 로그그래프 거리",
    "problem": "직선 $x=16$가 두 곡선 $y=\\log_{2}x$, $y=\\log_{4}x$와 만나는 점을 $A,B$라 한다. $AB$의 값은?",
    "answerType": "choice",
    "choices": [
      "$3$",
      "$2$",
      "$8$",
      "$7$",
      "$10$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n두 함수값은 각각 $4$과 $2$이므로 $AB=2$, 구하는 값은 $2$.",
    "difficulty": "lv3",
    "_qid": "R-0070",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그 그래프·절편·삼각형 넓이",
    "problem": "곡선 $y=\\log_{2}(x-1)$의 $x$절편을 $A$라 하고, 곡선 위의 점 $B$의 $x$좌표가 $9$라 한다. $B$에서 $x$축에 내린 수선의 발을 $H$라 할 때 선분 $AH$의 길이는?",
    "answerType": "choice",
    "choices": [
      "$8$",
      "$19$",
      "$7$",
      "$10$",
      "$5$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$A=(2,0)$, $B=(9,3)$, $AH=7$이고 높이는 $3$이다. 따라서 답은 $7$.",
    "difficulty": "lv3",
    "_qid": "R-0071",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그부등식·정수 격자·양끝값",
    "problem": "정수 $x$가 $0\\le \\log_{2}(x-1)\\le 4$를 만족한다. 가능한 $x$의 개수은?",
    "answerType": "choice",
    "choices": [
      "$16$",
      "$28$",
      "$15$",
      "$19$",
      "$18$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n밑 $2&gt;1$이므로 $1\\le x-1\\le 16$. 따라서 $2\\le x\\le 17$이고 답은 $16$.",
    "difficulty": "lv3",
    "_qid": "R-0072",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수·로그 역함수·합성 관계",
    "problem": "$f(x)=2^{x-1}+3$, $g(x)=\\log_{2}(x-3)+1$이다. $g(f(3))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$11$",
      "$7$",
      "$13$",
      "$8$",
      "$3$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$f,g$는 서로 역함수이다. $g(f(3))=3$.",
    "difficulty": "lv3",
    "_qid": "R-0073",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "역함수 대칭·행렬식·삼각형 넓이",
    "problem": "$y=2^x$의 점 $P(2,4)$와 역함수 $y=\\log_{2}x$의 점 $Q(4,2)$ 및 원점 $O$로 만든 삼각형의 넓이는?",
    "answerType": "choice",
    "choices": [
      "$10$",
      "$8$",
      "$4$",
      "$2$",
      "$6$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n삼각형 넓이는 $\\frac12|2\\cdot2-4\\cdot4|=6$이므로 답은 $6$.",
    "difficulty": "lv3",
    "_qid": "R-0074",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "평행이동 역함수·좌표거리",
    "problem": "$f(x)=2^{x-1}$의 역함수를 $g$라 한다. $f$ 위의 점 $P(3,4)$를 $y=x$에 대칭한 점 $Q$에 대하여 두 점 사이의 가로 거리는?",
    "answerType": "choice",
    "choices": [
      "$1$",
      "$11$",
      "$9$",
      "$7$",
      "$2$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$Q=(4,3)$이다. 가로 거리는 $|4-3|=1$이고 세로 거리도 같다. 답은 $1$.",
    "difficulty": "lv3",
    "_qid": "R-0075",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "매개변수 결정·역함수 합성",
    "problem": "$f(x)=2^{x-a}+b$에 대하여 $f(1)=5$, $f(3)=8$이고 $g$는 $f$의 역함수이다. $a+b+g(12)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$17$",
      "$5$",
      "$12$",
      "$9$",
      "$3$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$3\\cdot2^{1-a}=f(3)-f(1)=3$이므로 $a=1$, $b=4$. $g(12)=4$이므로 합은 $1+4+4=9$.",
    "difficulty": "lv4",
    "_qid": "R-0076",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "두 지수함수 교점·삼각형 넓이",
    "problem": "두 곡선 $y=3^x$, $y=3^{4-x}$의 교점을 $P$라 한다. $P$에서 $x$축과 $y$축에 내린 수선의 발을 각각 $H,K$라 할 때, 삼각형 $OPH$의 넓이의 2배는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$17$",
      "$30$",
      "$12$",
      "$10$",
      "$18$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n단조성에 따라 $x=4-x$이므로 $x=2$, $y=3^2=9$이다. $OPH$ 넓이는 $18/2$이므로 답은 $18$.",
    "difficulty": "lv4",
    "_qid": "R-0077",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "서로 다른 로그곡선·수평선·삼각형",
    "problem": "두 곡선 $y=\\log_2(x-1)$과 $y=\\log_2(9-x)$의 교점을 $P$라 한다. 직선 $y=1$과 두 곡선이 만나는 점을 각각 $A,B$라 하자. 삼각형 $PAB$의 넓이의 2배와 $P$의 $x$좌표의 합은?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$10$",
      "$5$",
      "$9$",
      "$13$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n교점은 $x-1=9-x$에서 $P=(5,2)$. 수평선과의 교점은 $A=(3,1)$, $B=(7,1)$. 삼각형 넓이는 $\\frac12\\cdot4\\cdot1=2$이므로 $2\\cdot2+5=9$.",
    "difficulty": "lv4",
    "_qid": "R-0078",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "수평선과 지수그래프·넓이",
    "problem": "수평선 $y=27$가 두 곡선 $y=3^x$, $y=3^{x-2}$와 만나는 점을 각각 $A,B$라 한다. 삼각형 $OAB$의 넓이의 2배는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$46$",
      "$48$",
      "$56$",
      "$50$",
      "$54$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n두 교점은 $A=(3,27), B=(5,27)$이고 수평 거리 $AB=2$이다. 높이가 $27$이므로 삼각형 넓이의 2배는 $2\\cdot 27=54$.",
    "difficulty": "lv4",
    "_qid": "R-0079",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "지수그래프 할선·로그함수 교차",
    "problem": "$y=3^x$ 위의 두 점 $A(0,1)$, $B(2,9)$을 지나는 직선의 기울기를 $m$이라 한다. $g(x)=\\log_3x$일 때 $m+g(9)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$9$",
      "$14$",
      "$16$",
      "$5$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$m=(9-1)/(2-0)=4$, $g(9)=2$이므로 합은 $6$이다.",
    "difficulty": "lv4",
    "_qid": "R-0080",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그함수 그래프·거리 조건",
    "problem": "점 $P$는 곡선 $y=\\log_{3}(x-2)$ 위의 제1사분면 점이다. $P$에서 $x$축까지의 거리가 $3$이고, $P$의 $x$좌표가 $u$일 때 $u+3$의 값은?",
    "answerType": "choice",
    "choices": [
      "$28$",
      "$29$",
      "$32$",
      "$40$",
      "$27$"
    ],
    "answer": 2,
    "explanation": "**[풀이]**\n\n$P$의 $y$좌표가 $3$이므로 $\\log_{3}(u-2)=3$, $u=2+27=29$. 따라서 답은 $32$.",
    "difficulty": "lv4",
    "_qid": "R-0081",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그부등식·근 범위·짝수 조건",
    "problem": "정수 $x$가 $\\log_2(x-1)+\\log_2(9-x)\\ge\\log_2 12$를 만족한다. 가능한 짝수 $x$의 합은?",
    "answerType": "choice",
    "choices": [
      "$14$",
      "$9$",
      "$12$",
      "$10$",
      "$16$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$1&lt;x&lt;9$에서 $(x-1)(9-x)\\ge12$를 풀면 $3\\le x\\le7$이다. 가능한 짝수는 $4,6$이므로 합은 $10$이다.",
    "difficulty": "lv4",
    "_qid": "R-0082",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그함수 평행이동·점 간 거리합",
    "problem": "자연수 $j=1,2,\\ldots,3$에 대하여 $x=3^j$인 직선이 $y=\\log_{3}x$, $y=\\log_{3}x+3$와 만나는 점을 각각 $P_j,Q_j$라 한다. $\\sum_{j=1}^{3} P_jQ_j+3$의 값은?",
    "answerType": "choice",
    "choices": [
      "$12$",
      "$4$",
      "$14$",
      "$16$",
      "$9$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n모든 $j$에 대하여 세로거리 $P_jQ_j=3$이다. 합은 $3\\cdot3=9$이고 $3$를 더하면 $12$.",
    "difficulty": "lv4",
    "_qid": "R-0083",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "지수·로그그래프·공통 수평선·삼각형",
    "problem": "두 곡선 $y=2^{x-1}+2$, $y=\\log_2(x-2)+4$가 직선 $y=6$과 만나는 점을 각각 $A,B$라 한다. 원점 $O$에 대하여 삼각형 $OAB$의 넓이와 $AB$의 길이의 합은?",
    "answerType": "choice",
    "choices": [
      "$13$",
      "$12$",
      "$20$",
      "$16$",
      "$6$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$A=(3,6)$, $B=(6,6)$이다. 따라서 $AB=3$, 삼각형 넓이는 $\\frac12\\cdot3\\cdot6=9$이므로 답은 $12$이다.",
    "difficulty": "lv4",
    "_qid": "R-0084",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "합성함수·역함수·정의역",
    "problem": "$f(x)=\\log_{3}(x-2)$, $g(x)=3^x+2$이다. $g(f(29))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$29$",
      "$41$",
      "$24$",
      "$28$",
      "$30$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$f$와 $g$는 서로 역함수이다. 따라서 답은 $29$. 정의역 $x&gt;2$도 만족한다.",
    "difficulty": "lv4",
    "_qid": "R-0085",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_log",
    "type": "지수방정식 두 근·지수그래프·삼각형",
    "problem": "방정식 $2^{2x}-20\\cdot2^x+64=0$의 두 근을 $\\alpha&lt;\\beta$라 한다. $P=(\\alpha,2^\\alpha)$, $Q=(\\beta,2^\\beta)$와 원점 $O$로 만든 삼각형의 넓이는?",
    "answerType": "choice",
    "choices": [
      "$12$",
      "$6$",
      "$14$",
      "$9$",
      "$8$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$t=2^x$라 두면 $(t-4)(t-16)=0$이므로 $\\alpha=2$, $\\beta=4$. $P=(2,4)$, $Q=(4,16)$, 넓이는 $\\frac12|2\\cdot16-4\\cdot4|=8$이다.",
    "difficulty": "lv4",
    "_qid": "R-0086",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "graph_func",
    "type": "지수그래프 두 점·기하평균",
    "problem": "$y=3^x$의 그래프 위의 점 $A(2,9)$, $B(4,81)$에 대하여 두 점의 $y$좌표의 기하평균을 $M$이라 한다. $M$의 값은?",
    "answerType": "choice",
    "choices": [
      "$27$",
      "$32$",
      "$23$",
      "$19$",
      "$26$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$M=\\sqrt{9\\cdot 81}=3^{(2+4)/2}=27$이므로 답은 $27$.",
    "difficulty": "lv4",
    "_qid": "R-0087",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그그래프 두 점·좌표기하",
    "problem": "$y=\\log_2x$ 위의 두 점 $P(2,1)$, $Q(8,3)$을 잇는 선분이 있다. 삼각형 $OPQ$의 넓이와 $P,Q$의 $x$좌표 차의 합은? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$6$",
      "$8$",
      "$15$",
      "$13$",
      "$7$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$\\triangle OPQ$의 넓이는 $\\frac12|2\\cdot3-8\\cdot1|=1$이다. 가로 거리 $8-2=6$이므로 합은 $7$이다.",
    "difficulty": "lv4",
    "_qid": "R-0088",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수·로그 역함수·좌표 차",
    "problem": "$f(x)=3^x$와 그 역함수 $g$에 대하여 $P(2,9)$는 $f$ 위의 점이고 $Q$는 $P$를 직선 $y=x$에 대칭시킨 점이다. $P,Q$의 가로 거리와 세로 거리의 합는?",
    "answerType": "choice",
    "choices": [
      "$14$",
      "$19$",
      "$6$",
      "$22$",
      "$20$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$Q=(9,2)$이므로 가로거리는 $|9-2|=7$, 세로거리도 $7$이다. 답은 $14$.",
    "difficulty": "lv4",
    "_qid": "R-0089",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "composite_func",
    "type": "조각함수·삼중 합성·분기 조건",
    "problem": "$f(x)=\\begin{cases}2^{x-2}&amp;(x\\le3)\\\\ \\log_2(x-2)+2&amp;(x&gt;3)\\end{cases}$일 때 $f(f(f(4)))+f(f(3))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$5$",
      "$12$",
      "$3$",
      "$10$",
      "$2$"
    ],
    "answer": 4,
    "explanation": "**[풀이]**\n\n$f(4)=3$, $f(3)=2$, $f(2)=1$이므로 $f(f(f(4)))=1$, $f(f(3))=f(2)=1$. 합은 $2$이다.",
    "difficulty": "lv4",
    "_qid": "R-0090",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그 방정식·두 해·비에타",
    "problem": "방정식 $\\log_{3}(x-2)+\\log_{3}(12-x)=\\log_{3}16$의 두 실근을 $\\alpha&lt;\\beta$라 한다. $\\alpha\\beta$의 값은?",
    "answerType": "choice",
    "choices": [
      "$35$",
      "$46$",
      "$38$",
      "$40$",
      "$28$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n정의역 $2&lt;x&lt;12$에서 $(x-2)(12-x)=16$. 두 해는 $4,10$이며 구하는 값은 $40$.",
    "difficulty": "lv4",
    "_qid": "R-0091",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "exp_func",
    "type": "지수함수 매개변수·역함수·연립 조건",
    "problem": "$f(x)=2^{x-p}+q$에 대하여 $f(2)=5$, $f(4)=8$이다. $g$가 $f$의 역함수일 때 $p+q+g(12)$의 값은?",
    "answerType": "choice",
    "choices": [
      "$10$",
      "$11$",
      "$13$",
      "$15$",
      "$14$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$3\\cdot2^{2-p}=f(4)-f(2)=3$이므로 $p=2$, $q=4$이다. $f(5)=12$이므로 $g(12)=5$. 답은 $11$이다.",
    "difficulty": "lv4",
    "_qid": "R-0092",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그 진수 동치·교점의 기하",
    "problem": "두 곡선 $y=\\log_{3}(x-2)$, $y=\\log_{3}(10-x)$의 교점 $P$에서 $x$축에 내린 수선의 발을 $H$라 한다. $OH$의 2배는? (단, $O$는 원점)",
    "answerType": "choice",
    "choices": [
      "$12$",
      "$14$",
      "$10$",
      "$2$",
      "$20$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n두 로그의 진수가 같아야 하므로 $x-2=10-x$, $x=6$. 따라서 $H=(6,0)$, 답은 $12$.",
    "difficulty": "lv4",
    "_qid": "R-0093",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "밑변환·로그 그래프·삼각형",
    "problem": "직선 $x=64$가 곡선 $y=\\log_2x$, $y=\\log_4x$와 만나는 점을 각각 $A,B$라 한다. 원점 $O$에 대하여 삼각형 $OAB$의 넓이는?",
    "answerType": "choice",
    "choices": [
      "$92$",
      "$96$",
      "$94$",
      "$106$",
      "$98$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n$A=(64,6)$, $B=(64,3)$이다. $AB=3$이고 원점에서 직선 $x=64$까지의 거리는 $64$이므로 넓이는 $\\frac12\\cdot3\\cdot64=96$이다.",
    "difficulty": "lv4",
    "_qid": "R-0094",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "밑변환·서로 다른 로그그래프 거리",
    "problem": "직선 $x=729$가 두 곡선 $y=\\log_{3}x$, $y=\\log_{9}x$와 만나는 점을 $A,B$라 한다. $AB^2$의 값은?",
    "answerType": "choice",
    "choices": [
      "$7$",
      "$19$",
      "$1$",
      "$9$",
      "$6$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n두 함수값은 각각 $6$과 $3$이므로 $AB=3$, 구하는 값은 $9$.",
    "difficulty": "lv4",
    "_qid": "R-0095",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_func",
    "type": "로그 그래프·절편·삼각형 넓이",
    "problem": "곡선 $y=\\log_{3}(x-2)$의 $x$절편을 $A$라 하고, 곡선 위의 점 $B$의 $x$좌표가 $29$라 한다. $B$에서 $x$축에 내린 수선의 발을 $H$라 할 때 삼각형 $ABH$의 넓이의 2배는?",
    "answerType": "choice",
    "choices": [
      "$75$",
      "$84$",
      "$76$",
      "$78$",
      "$82$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$A=(3,0)$, $B=(29,3)$, $AH=26$이고 높이는 $3$이다. 따라서 답은 $78$.",
    "difficulty": "lv4",
    "_qid": "R-0096",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "log_basic",
    "type": "로그부등식·정수 격자·양끝값",
    "problem": "정수 $x$가 $0\\le \\log_{3}(x-2)\\le 4$를 만족한다. 가능한 $x$의 최솟값과 최댓값의 합은?",
    "answerType": "choice",
    "choices": [
      "$90$",
      "$86$",
      "$84$",
      "$88$",
      "$82$"
    ],
    "answer": 1,
    "explanation": "**[풀이]**\n\n밑 $3&gt;1$이므로 $1\\le x-2\\le 81$. 따라서 $3\\le x\\le 83$이고 답은 $86$.",
    "difficulty": "lv4",
    "_qid": "R-0097",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "지수·로그 역함수·합성 관계",
    "problem": "$f(x)=3^{x-2}+4$, $g(x)=\\log_{3}(x-4)+2$이다. $g(f(4))+f(g(13))$의 값은?",
    "answerType": "choice",
    "choices": [
      "$17$",
      "$22$",
      "$20$",
      "$5$",
      "$29$"
    ],
    "answer": 0,
    "explanation": "**[풀이]**\n\n$f,g$는 서로 역함수이다. $g(f(4))=4$, $f(g(13))=13$이므로 답은 $17$.",
    "difficulty": "lv4",
    "_qid": "R-0098",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "역함수 대칭·행렬식·삼각형 넓이",
    "problem": "$y=3^x$의 점 $P(2,9)$와 역함수 $y=\\log_{3}x$의 점 $Q(9,2)$ 및 원점 $O$로 만든 삼각형의 넓이의 2배는?",
    "answerType": "choice",
    "choices": [
      "$81$",
      "$74$",
      "$79$",
      "$77$",
      "$85$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n삼각형 넓이는 $\\frac12|2\\cdot2-9\\cdot9|=\\frac{77}{2}$이므로 답은 $77$.",
    "difficulty": "lv4",
    "_qid": "R-0099",
    "_reviewed": true,
    "_source": "original"
  },
  {
    "_type": "inverse_func",
    "type": "평행이동 역함수·좌표거리",
    "problem": "$f(x)=3^{x-2}$의 역함수를 $g$라 한다. $f$ 위의 점 $P(4,9)$를 $y=x$에 대칭한 점 $Q$에 대하여 두 점의 가로 거리와 세로 거리의 합는?",
    "answerType": "choice",
    "choices": [
      "$12$",
      "$15$",
      "$20$",
      "$10$",
      "$5$"
    ],
    "answer": 3,
    "explanation": "**[풀이]**\n\n$Q=(9,4)$이다. 가로 거리는 $|9-4|=5$이고 세로 거리도 같다. 답은 $10$.",
    "difficulty": "lv4",
    "_qid": "R-0100",
    "_reviewed": true,
    "_source": "original"
  }
];
