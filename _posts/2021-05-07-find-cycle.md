---
title: "그래프에서 사이클의 존재 여부"
categories:
  - Algorithm
tags:
  - python
  - union-find
  - dfs
use_math: true
---

# 무향 그래프

union-find를 활용해 무향 그래프에서 사이클의 존재 여부를 반환하는 함수를 작성했다.

```python
def has_cycle(pairs):
    
    def find(v):  # find
        if v == parent[v]:
            return v
        else:
            parent[v] = find(parent[v])
            return parent[v]
    
    parent = dict()
    
    for v1, v2 in pairs:
        
        if v1 not in parent:
            parent[v1] = v1
        
        if v2 not in parent:
            parent[v2] = v2
        
        root1, root2 = find(v1), find(v2)
        if root1 == root2:
            return True
        else:
            parent[root2] = root1  # union
            
    return False
```
union-find를 활용해 무향 그래프에서 사이클의 존재 여부를 반환하는 함수를 작성했다.



# 유향 그래프
dfs를 활용한다.
```python
```