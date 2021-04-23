---
title: "오일러 경로·회로 찾기"
categories:
  - Algorithm
tags:
  - python
  - dfs
  - stack
use_math: true
---

오일러 경로(Eulerian Path)란 그래프에서 모든 간선을 한 번씩만 방문하는 경로이다. 특별히 시작점과 끝점이 같은 오일러 경로를 오일러 회로(Eulerian Circuit)라고 한다. 오일러 회로가 존재하려면 모든 정점에서 indegree와 outdegree가 동일해야 한다.  오일러 경로가 존재하려면  indegree가 1 작은 정점, outdegree가 1 작은 정점을 제외하고 모든 정점에서 indegree과 outdegree가 동일해야 하고, 이때 시작점은 indegree가 1 작은 정점, 끝점은 outdegree가 1 작은 정점으로 결정된다. DFS를 스택(stack)으로 구현하는 방식으로 주어진 그래프에서 오일러 경로를 찾을 수 있다.  

```python
def eulerian_path(adj_list, start):  # adj_list는 인접딕셔너리, start는 시작점
    stack = [start]
    path = []
    while len(stack) > 0:
        top = stack[-1]
        if top in adj_list and len(adj_list[top]) > 0:  # top에서 출발하는 간선이 있다면
            stack.append(adj_list[top].pop())  # 도착점을 stack에 넣기
        else:  # top에서 출발하는 간선이 없다면
            path.append(stack.pop())  # top을 path에 넣기
    return path[::-1]
```