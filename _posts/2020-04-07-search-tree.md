---
title: "파이썬 자료구조: 탐색트리"
categories:
  - Data Structure
tags:
  - python
---

이진탐색트리(binary search tree)는 정렬된 값들이 리스트에 존재할 때 주어진 값을 빠르게 찾는 방법인 이진탐색(binary tree)을 트리에 접목한 자료구조이다. 단순연결리스트에 비해, 저장된 값을 탐색하거나 임의의 값을 삽입하고 삭제하는 연산을 수행하는 데에 시간이 훨씬 적게 걸린다는 장점이 있다. 이진탐색트리를 직접 구현해본 다음, 이진탐색트리에 기반한 자료구조인 AVL 트리, 2-3 트리, 레드블랙트리(red-black tree), 좌편향 레드블랙트리(left-leaning red-black tree), B-트리의 개념에 대해서도 간단히 정리했다.
- TABLE OF CONTENTS
{:toc}

## 이진탐색(binary search)
```python
# 정수들이 정렬된 리스트 a에서 t라는 값이 존재하는 index를 탐색하기
def binary_search(a, left, right, t):
    if left > right:
        return None
    mid = (left + right)//2
    if a[mid] == t:
        return mid
    if a[mid] > t:
        binary_search(a, left, mid - 1, t)
    else:
        binary_search(a, mid + 1, right, t)
```
리스트 `a`가 정렬되어 있었다면 탐색에 걸리는 시간은 $$O(log N)$$이다. 만일 정렬되어 있지 않았다면, 순차탐색(sequential search)을 수행해야 하기 때문에 $$O(N)$$의 시간이 걸린다.

## 이진탐색트리(binary search tree)
```python
class Node:
    
    def __init__(self, key, value, left=None, right=None):
        self.key = key
        self.value = value
        self.left = left
        self.right = right
        
class BST:
    
    class EmptyError(Exception):
        pass
    
    def __init__(self):
        self.root = None
```

이진탐색트리(binary search tree)는 각 노드 `node`의 키값이 `node`의 왼쪽 서브트리에 있는 노드들의 키값들보다 크고, `n`의 오른쪽 서브트리에 있는 노드의 키값들보다 작은 이진트리이다. 그래서 이진탐색트리에서 중위순회를 수행하면 정렬된 출력을 얻게 된다.

### 키(key) 탐색하기
```
    # key를 키값으로 가지는 노드의 항목 반환하기
    def get(self, key):
        return self.get_item(self.root, key)  
        
    def get_item(self, node, key):
        if node == None:
            return None
        if node.key > key:
            return self.get_item(node.left, key)  # 왼쪽 서브트리 탐색하기
        elif node.key < key:
            return self.get_item(node.right, key)  # 오른쪽 서브트리 탐색하기
        else:
            return node.value
```

### 키(key) 중 최솟값 찾기

```python
    # 가장 작은 키값을 가진 노드 반환하기
    def min(self):
        if self.root == None:
            return None
        return self.minimum(self.root)
    
    def minimum(self, node):
        if node.left == None:  # node 왼쪽 자식이 없다면 그 노드의 키값이 가장 작은 것임
            return node
        return self.minimum(node.left)  # 왼쪽 자식으로 내려가기
```

### 키(key)가 최솟값인 노드 삭제하기
```python
    def delete_min(self):
        if self.root == None:
            raise EmptyError('Underflow')
        self.root = self.del_min(self.root)
   
   def del_min(self, node):
        if node.left == None:
            return node.right
        node.left = self.del_min(node.left)
        return node
```

![(1)]({{ '/images/2020-04-07-(1).png' }}){: .align-center}

### 임의의 키(key)를 가지는 노드 삭제하기
```python
    def delete(self, key):
        self.root = self.del_node(self.root, key)
        
    def del_node(self, node, key):
        if node == None:
            return None
        if node.key > key:
            node.left = self.del_node(node.left, key)
        elif node.key < key:
            node.right = self.del_node(node.right, key)
        else:  # 키값이 key인 노드를 찾음
            if node.right == None:  # 노드의 오른쪽 자식이 없는 경우
                return node.left  # 노드의 왼쪽 자식이 없다면 None을 반환하고 있다면 노드의 왼쪽 자식을 반환함
            if node.left == None:  # 노드의 오른쪽 자식은 있지만 왼쪽 자식이 없는 경우
                return node.right  # 노드의 오른쪽 자식을 반환함
            target = node  # 삭제될 노드
            node = self.minimum(target.right)  # target의 중위후속자는 target의 오른쪽 서브트리에서 가장 키값이 작은 노드인 minimum(target.right)임
            # node를 target이 있던 자리로 올리기 위해서는
            node.right = self.del_min(target.right)  # node가 삭제된 target의 오른쪽 서브트리가 node의 오른쪽 서브트리가 되어야 하며
            node.left = target.left  # target의 왼쪽 서브트리가 그대로 node의 왼쪽 서브트리가 되어야 함
        return node
```

삭제되는 노드 `node`의 자식 수에 따라 처리 방법이 달라진다.
|자식 수|삭제 방법|
|---|---|
|0      |`node`의 부모에 `node` 대신에 `None`을 연결함|
|1      |`node`의 부모와 `node`의 자식을 직접 연결함|
|2      |이진탐색트리를 중위순회할 때 `node`를 방문한 직후에 방문하게 되는 노드(`node`의 중위후속자)를 `node`자리로 옮김|

![(1)]({{ '/images/2020-04-07-(2).png' }}){: .align-center}

### 연산의 수행시간 계산하기 
탐색, 삽입, 삭제 연산의 수행시간은 이진탐색트리의 높이에 비례한다. 따라서 최악의 경우에 수행시간은  $$O(N)$$이다. 하지만 빈 이진탐색트리에 랜덤하게 선택된 $$N$$개의 키를 삽입할 때 트리의 높이는 약 $$1.39logN$$임이 알려져 있기에 평균 수행시간은 $$O(N)$$보다 작다.

## AVL 트리

## 2-3 트리

## 레드블랙트리(red-black tree)

### 좌편향 레드블랙트리(left-leaning red-black tree)

## B-트리

## 출처
파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
