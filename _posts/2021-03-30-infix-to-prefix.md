---
title: "중위 표기를 후위 표기로 변환하기"
categories:
  - Algorithm
tags:
  - python
use_math: true
---

스택(stack) 자료구조를 활용하면 일반적인 중위 표기(infix notation)를 후위 표기(postfix)로 변환하여 컴퓨터가 계산하기 편리하게 만들어줄 수 있다.  

방법은 다음과 같다.  
1. `e`가 피연산자인  경우 `result`에 `append`한다.  
2. `e`가 연산자인 경우 `e`보다 우선순위가 같거나 높은  연산자들을 `stack`에서 `pop`하여 `result`에 `append` 한다.  

반복이 끝나면 `stack`에 남은 연산자들을 하나씩 `pop`하여 `result`에 `append`한다. 


```python
def infix_to_postfix(expression, operator):
    
    rank = {}
    for i in range(len(operator)):
        rank[operator[i]] = i
    
    result = []; stack = [];
    for e in expression:
        if e in operator:
            while len(stack) > 0 and rank[stack[-1]] <= rank[e]:
                result.append(stack.pop())
            stack.append(e)
        else:
            result.append(e)
    
    while len(stack) > 0:
        result.append(stack.pop())
        
    return result
```