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

무향 그래프와 유향 그래프에서 사이클의 존재 여부를 파악하는 방법을 정리했다. 

- TABLE OF CONTENTS
{:toc}

# 무향 그래프

union-find를 활용하면 간단하다. 같은 subset에 들어 있던 두 vertex들이 연결되는 순간 사이클이 생겨나기 때문이다. 

```python
def has_cycle(pairs):  # pairs는 (정점1, 정점2)의 리스트
    
    def find(v):
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
            parent[root2] = root1
            
    return False
```

이전에 방문한 정점을 다시 방문하는 순간 사이클이 생긴다는 것을 이용하면 dfs로도 해결할 수 있다. 

```python
flag = False

def has_cycle(adj_list, n):  # adj_list는 인접리스트, n은 정점의 수
    
    distance = [0 for _ in range(n)]
    
    def dfs(parent, node):
        
        global flag
        
        for child in adj_list[node]:
            
            if child != parent:
                
                if distance[child] == 0:  # 방문하지 않은 정점이면
                    distance[child] = distance[node] + 1  # 방문한 뒤 방문 순서를 기록
                    dfs(node, child)
                
                elif distance[child] < distance[node]:  # 이전에 방문한 정점인 경우
                    flag = True  # 사이클 생김
    
    for i in range(n):
        if distance[i] == 0:
            dfs(None, i)
            
    return flag
```

# 유향 그래프

union-find는 사용할 수 없지만 dfs는 사용할 수 있다. dfs가 아직 끝나지 않았는데 이미 방문했던 정점을 방문하는 순간 사이클이 생겨난다. 

```python
flag = False

def has_cycle(adj_list, n):  # adj_list는 인접리스트, n은 정점의 수
    
    visited = [False for _ in range(n)]
    finished = [False for _ in range(n)]
    
    def dfs(node):
        
        global flag
        
        visited[node] = True
        
        for child in adj_list[node]:
            
            if not visited[child]:
                dfs(child)
            elif finished[child] == False:
                flag = True
                
        finished[node] = True
    
    dfs(0)
    
    return flag
```