---
title: "연결리스트"
categories:
  - Data Structure
tags:
  - python
---

연결리스트의 일종인 단순연결리스트, 이중연결리스트, 원형연결리스트에 대해 정리했다.

{:toc}

## 단순연결리스트
단순연결리스트(Singly Linked List)에서 노드는 항목을 저장하는 `item`과 뒤쪽 노드를 저장하는 `next`로 구성된다. 특별히, `head`는 맨 앞의 노드를 가리킨다. 노드의 삽입, 삭제, 그리고 항목의 탐색에 걸리는 시간은 아래와 같다.

|삽입|삭제|탐색|
|---|---|---|
|$$O(1)$$|$$O(1)$$|$$O(N)$$|

```python
 class SList:
 
    class EmptyError(Exception):
        pass
    
    class Node:
        def __init__(self, item, next):
            self.item = item
            self.next = next
            
    def __init__(self):
        self.head = None
        self.size = 0
        
    def size(self): return self.size
    def is_empty(self): return self.size == 0
    
    def insert_front(self, item):  # 맨 앞에 노드 삽입하기
        if self.is_empty():
            self.head = self.Node(item, None)
        else:
            self.head = self.Node(item, self.head)
        self.size += 1
        
    def insert_after(self, item, p):  # p가 가리키는 노드 뒤에 있는 노드 삽입하기
        p.next = self.Node(item, p.next)
        self.size += 1
        
    def delete_front(self):  # 맨 뒤의 노드 삭제하기
        if self.is_empty():
            raise EmptyError('Underflow')
        else:
            self.head = self.head.next
            self.size -= 1
            
    def delete_after(self, p):  # p가 가리키는 노드 뒤에 있는 노드 삭제하기
        if self.is_empty():
            raise EmptyError('Unerflow')
        t = p.next
        p.next = t.next
        self.size -= 1
        
    def search(self, target):  # target을 항목으로 가지는 노드가 앞에서부터 몇 번째에 있는지 반환하기
        p = self.head
        for k in range(self.size):
            if target == p.item: return k
            p = p.next
        return None
    
    def print_list(self):  # 전체 항목 출력하기
        p = self.head
        while p:
            if p.next != None:
                print(p.item, ' -> ', end='', sep='')
            else:
                print(p.item)
            p = p.next
```  

## 이중연결리스트
이중연결리스트(Doubly Linked List)에서 노드는 항목을 저장하는 `item`과 앞쪽 노드를 저장하는 `prev`, 뒤쪽 노드를 저장하는 `next`로 구성된다. 단순연결리스트에서와 비슷하게 `head`는 맨 앞의 노드를 가리키며, `tail`은 맨 뒤의 노드를 가리킨다. 여기서 주의할 점은, 이중연결리스트에서 `head`와 `tail`은 항목에 `None`이 저장된 더미(dummy) 노드라는 것이다. 이에 따라, 이중연결리스트의 경우는 맨 앞 항목이 `head.next`라는 노드의 `item`에 저장되어 있다(맨 뒤 항목은 `tail.prev`라는 노드의 `item`에 저장되어 있음). 노드의 삽입, 삭제, 그리고 항목의 탐색에 걸리는 시간은 아래와 같다.

|삽입|삭제|탐색|
|---|---|---|
|$$O(1)$$|$$O(1)$$|$$O(N)$$|

```python
class DList:

    class EmptyError(Exception):
        pass
    
    class Node:
        def __init__(self, item, prev, link):
            self.item = item
            self.prev = prev
            self.next = link
                
    def __init__(self):
        self.head = self.Node(None, None, None)
        self.tail = self.Node(None, self.head, None)
        self.head.next = self.tail
        self.size = 0
        
    def size(self): return self.size
    def is_empty(self): return self.size == 0
    
    def insert_before(self, p, item):  # p가 가리키는 노드 앞에 노드 삽입하기
        t = p.prev
        n = self.Node(item, t, p)
        p.prev = n
        t.next = n
        self.size += 1
        
    def insert_after(self, p, item):  # p가 가리키는 노드 뒤에 노드 삽입하기
        t = p.next
        n = self.Node(item, p, t)
        t.prev = n
        p.next = n
        self.size -= 1
        
    def delete(self, x):  # x가 가리키는 노드 삭제하기
        f = x.prev
        r = x.next
        f.next = r
        f.prev = f
        self.size -= 1
        return x.item
    
    def print_list(self):  # 전체 항목 
        if self.is_empty():
            print("list is empty")
        else:
            p = self.head.next
            while p != self.tail:
                if p.next != self.tail:
                    print(p.item, ' <-> ', end='', sep='')
                else:
                    print(p.item)
                p = p.next
```  

## 원형연결리스트
원형연결리스트는 단순연결리스트와 동일하지만, 맨 뒤 노드의 `next`에 맨 앞 노드가 저장되어 있다. 그리고 맨 앞 노드를 가리키는 `head` 대신에 맨 뒤 노드를 가리키는 `last`를 사용한다. 노드의 삽입, 삭제, 그리고 항목의 탐색에 걸리는 시간은 아래와 같다.

|삽입|삭제|탐색|
|---|---|---|
|$$O(1)$$|$$O(1)$$|$$O(N)$$|

```python
class CList:

    class EmptyError(Exception):
        pass
    
    class Node:
        def __init__(self, item, link):
            self.item = item
            self.next = link
    
    def __init__(self):
        self.last = None
        self.size = 0
    
    def no_items(self): return self.size
    def is_empty(self): return self.size == 0
    
    def insert(self, item):  # 맨 앞에 노드 삽입하기
        n = self.Node(item, None)
        if self.is_empty():
            n.next = n
            self.last = n
        else:
            n.next = self.last.next
            self.last.next = n
        self.size += 1
        
    def first(self):  # 맨 앞 노드의 항목 반환하기
        if self.is_empty():
            raise EmptyError('Underflow')
        f = self.last.next
        return f.item
    
    def delete(self):  # 맨 앞의 노드 삭제하기
        if self.is_empty():
            raise EmptyError('Underflow')
        x = self.last.next
        if self.size == 1:
            self.last = None
        else:
            self.last.next = x.next
        self.size -= 1
        
    def print_list(self):  # 전체 항목 출력하기
        if self.is_empty():
            print('list is empty')
        else:
            f = self.last.next
            p = f
            while p.next != f:
                print(p.item, ' -> ', end='', sep='')
                p = p.next
            print(p.item)
```

## 출처
파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
