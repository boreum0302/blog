---
title: "파이썬 자료구조: 탐색트리"
categories:
  - Data Structure
tags:
  - python
---

이진탐색트리(binary search tree)는 정렬된 값들이 리스트에 존재할 때 주어진 값을 빠르게 찾는 방법인 이진탐색(binary tree)을 트리에 접목한 자료구조이다. 단순연결리스트에 비해, 저장된 값을 탐색하거나 임의의 값을 삽입하고 삭제하는 연산을 수행하는 데에 시간이 훨씬 적게 걸린다는 장점이 있다. 이진탐색트리를 직접 구현해본 다음, 유사한 자료구조인 AVL 트리, 2-3 트리, 레드블랙트리(red-black tree), 좌편향 레드블랙트리(left-leaning red-black tree), B-트리의 개념에 대해서도 정리했다.
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
리스트 `a`가 정렬되어 있었다면 탐색에 걸리는 시간은 $$O(log N)$$이다. 정렬되어 있지 않았다면, 순차탐색(sequential search)을 수행해야 하기 때문에 $$O(N)$$의 시간이 걸린다.

## 이진탐색트리(binary search tree)

### 키(key) 탐색하기

### 키(key) 중 최솟값 찾기

### 임의의 키(key)를 가지는 노드 삭제하기

## AVL 트리

## 2-3 트리

## 레드블랙트리(red-black tree)

### 좌편향 레드블랙트리(left-leaning red-black tree)

## B-트리

## 출처
파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
