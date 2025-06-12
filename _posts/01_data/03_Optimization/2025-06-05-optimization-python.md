---
layout: post
title: "최적화 문제를 위한 파이썬 라이브러리"
date: 2025-06-05
categories: [Optimization, Python]
---

최적화 문제를 풀기 위해서는 크게 두가지 방법이 있는 것 같습니다.

1. 최적화 문제 풀이를 위해 만들어진 <mark>python-library</mark> 활용하기
2. 최적화 문제 풀이에 특화된 <mark>Solver</mark> 활용하기

무료로 제공하는 [2] 또한 가능하지만 최적화를 처음 공부하는 상황에서는 [1]이 저에게는 더 적절한 방식이라고 생각했습니다.

# 최적화를 위한 파이썬 라이브러리

아래는 제가 이해한 바를 바탕으로 간단히 특징을 정리해본 테이블입니다.

![optimzation_libs](/assets/images/posts/2025_06_05_optimzation_libs.png)

간단한 문제를 다양한 라이브러리로 풀이해보며 예시코드를 한번 보겠습니다.

```plaintext
물류 최소비용 문제 (선형계획)

A창고에서 100개의 제품을, B, C, D 세 개의 도시로 운송해야 한다.
각 도시의 수요는 각각 30, 40, 30개이고, A → 도시별 운송 단가는 각각 2, 4, 3원이다.

운송 비용을 최소화하는 물량 배분을 결정하라.
```

## scipy-optimize

```py
# scipy - optimize

from scipy.optimize import linprog
# 1. 목적함수 계수
# (2x_1 + 4x_2 + 3x_3)
c = [2, 4, 3]

# 2. 제약 조건
# x_1 + x_2 + x_3 = 100
A_eq = [[1, 1, 1]]
b_eq = [100]

# 3. 수요 조건 (scipy는 <= 방향만 받음)
A_ub = [
    [-1, 0, 0],  # 30 <= x_1  <-> -x_1 <= -30
    [0, -1, 0],  # 40 <= x_2  <-> -x_2 <= -40
    [0, 0, -1],  # 30 <= x_3  <-> -x_3 <= -30
]
b_ub = [-30, -40, -30]

# 4. 변수 경계
bounds = [(0, None), (0, None), (0, None)]

# 5. linprog 실행
result = linprog(
    c=c,
    A_ub=A_ub, b_ub=b_ub,
    A_eq=A_eq, b_eq=b_eq,
    bounds=bounds,
    method='highs'
)

# 결과 출력
if result.success:
    print("Optimal solution found:")
    print(f"B: {result.x[0]:.1f}개, C: {result.x[1]:.1f}개, D: {result.x[2]:.1f}개")
    print(f"총 비용: {result.fun:.1f}원")
else:
    print("No solution found.")
```

## pulp

```py
# Pulp
from pulp import LpProblem, LpMinimize, LpVariable, value

# 1. 문제 정의
prob = LpProblem("물류_최소비용", LpMinimize)

# 2. 변수 정의 (0 이상)
x1 = LpVariable("x_B", lowBound=0)
x2 = LpVariable("x_C", lowBound=0)
x3 = LpVariable("x_D", lowBound=0)

# 3. 목적함수
prob += 2 * x1 + 4 * x2 + 3 * x3, "총비용"

# 4. 제약조건
prob += x1 + x2 + x3 == 100, "총공급량"
prob += x1 >= 30, "B_수요"
prob += x2 >= 40, "C_수요"
prob += x3 >= 30, "D_수요"

# 5. 풀기
prob.solve()

# 6. 결과 출력
print("최적 운송 계획:")
print(f"B: {x1.varValue}개")
print(f"C: {x2.varValue}개")
print(f"D: {x3.varValue}개")
print(f"총 비용: {value(prob.objective)}원")
```

## ortools

```py
# ortools
from ortools.linear_solver import pywraplp

# 1. Solver 정의
solver = pywraplp.Solver.CreateSolver("GLOP")  # LP 문제

# 2. 변수 정의 (연속 변수, 0 이상)
x_b = solver.NumVar(0, solver.infinity(), "x_b")  # A → B
x_c = solver.NumVar(0, solver.infinity(), "x_c")  # A → C
x_d = solver.NumVar(0, solver.infinity(), "x_d")  # A → D

# 3. 제약조건
solver.Add(x_b + x_c + x_d == 100)   # 총 100개 운송
solver.Add(x_b >= 30)                # B 수요
solver.Add(x_c >= 40)                # C 수요
solver.Add(x_d >= 30)                # D 수요

# 4. 목적함수 (비용 최소화)
solver.Minimize(2 * x_b + 4 * x_c + 3 * x_d)

# 5. 문제 풀기
status = solver.Solve()

# 6. 결과 출력
if status == pywraplp.Solver.OPTIMAL:
    print("최적 운송 계획:")
    print(f"B: {x_b.solution_value():.1f}개")
    print(f"C: {x_c.solution_value():.1f}개")
    print(f"D: {x_d.solution_value():.1f}개")
    print(f"총 비용: {solver.Objective().Value():.1f}원")
else:
    print("최적해를 찾을 수 없습니다.")
```

## cvxpy

```py
# cvxpv
import cvxpy as cp

# 1. 변수 정의
x = cp.Variable(3, nonneg=True)  # [x1, x2, x3]

# 2. 목적함수: 비용 최소화
cost = cp.Minimize(2 * x[0] + 4 * x[1] + 3 * x[2])

# 3. 제약조건 리스트
constraints = [
    x[0] + x[1] + x[2] == 100,  # 총 운송량
    x[0] >= 30,  # B 수요
    x[1] >= 40,  # C 수요
    x[2] >= 30   # D 수요
]

# 4. 문제 정의 및 풀기
prob = cp.Problem(cost, constraints)
prob.solve()

# 5. 결과 출력
print("최적 운송 계획:")
print(f"B: {x[0].value:.1f}개")
print(f"C: {x[1].value:.1f}개")
print(f"D: {x[2].value:.1f}개")
print(f"총 비용: {prob.value:.1f}원")
```

---

> 개인적인 취향은 <mark>ortools</mark>와 <mark>cvxpy</mark> 입니다.
>
> 다만, 각 라이브러리가 강한 문제가 있기 때문에 문제의 특성에 따라 적절히 활용할 수 있는 것이 중요한 것 같습니다.
