---
title: "이진탐색으로 상한과 하한 찾기"
categories:
  - Algorithm
tags:
  - python
  - binary search
use_math: true
---

이진탐색(binary search)은 오름차순으로 정렬된 리스트에서 $$O(log N)$$ 시간 안에 특정 값의 위치를 찾을 수 있는 알고리즘이다.  

## 기본

`list_`에 중복된 값들이 없을 때만 사용할 수 있다. `list_`에 `key` 값이 존재하면 그 위치를, 아니면 `None`을 반환한다.

```python
def binary_search(list_, key):
	
	l = 0; r = len(list_) - 1;
	
	while l <= r:
		m = (l + r)//2
		if key > list_[m]:
			l = m + 1
		elif key < list_[m]:
			r = m - 1
		else:
			return m
			
	return None
```

## 상한(Upper Bound) 찾기  

`list_`에 중복된 값들이 있는 경우, `key`를 초과하는 값이 처음으로 나타나는 위치를 찾자. 핵심은 `key == list_[m]`일 때 `m`을 반환하지 않는 것이다. `key`와 같은 값이 `list_[m]` 뒤쪽으로 계속 이어질 수 있기 때문에, `l = m + 1`을 수행하여 탐색 범위를 좁힌다.  

```python
def binary_search_UB(list_, key):
	
	l = 0; r = len(list_);
	
	while l < r:
		m = (l + r)//2
		if key >= list_[m]:
			l = m + 1
		else:
			r = m
			
	return l
```

## 하한(Lower Bound) 찾기  

`list_`에 중복된 값들이 있는 경우, `key` 이상인  값이 처음으로 나타나는 위치를 찾자. 여기서도 핵심은 `key == list_[m]`일 때 `m`을 반환하지 않는 것이다. `key`와 같은 값이 `list_[m]` 앞쪽으로 계속 이어질 수 있기 때문에, `r = m`을 수행하여 탐색 범위를 좁힌다.  

```python
def binary_search_LB(list_, key):
	
	l = 0; r = len(list_);
	
	while l < r:
		m = (l + r)//2
		if key <= list_[m]:
			r = m
		else:
			l = m + 1
			
	return l
```