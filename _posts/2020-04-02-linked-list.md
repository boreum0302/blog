---
title: "연결리스트"
categories:
  - Data Structure
tags:
  - Python
---

《파이썬과 함께하는 자료구조의 이해》, 양성봉 지음, (주)생능출판사
연결리스트의 일종인 단순연결리스트, 이중연결리스트, 원형연결리스트에 대해 정리했다.

## 단순연결리스트
단순연결리스트(Singly Linked List)에서 노드는 항목을 저장하는 `item`과 뒤쪽 노드를 가리키는 `next`로 구성된다. 특별히, `head`는 맨 앞의 노드를 가리킨다. 노드의 삽입, 삭제, 그리고 항목의 탐색에 걸리는 시간은 아래와 같다.

|삽입|삭제|탐색|
|---|---|---|
|O(1)|O(1)|O(N)|

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
    
    def insert_front(self, item):
        if self.is_empty():
            self.head = self.Node(item, None)
        else:
            self.head = self.Node(item, self.head)
        self.size += 1
        
    def insert_after(self, item, p):  # p는 특정 노드를 가리킴(예: head.next.next)
        p.next = self.Node(item, p.next)
        self.size += 1
        
    def delete_front(self):
        if self.is_empty():
            raise EmptyError('Underflow')
        else:
            self.head = self.head.next
            self.size -= 1
            
    def delete_after(self, p):  # p는 특정 노드를 가리킴(예: head.next.next)
        if self.is_empty():
            raise EmptyError('Unerflow')
        t = p.next
        p.next = t.next
        self.size -= 1
        
    def search(self, target):  # target을 항목으로 가지는 노드가 앞에서부터 몇 번째에 있는지를 return
        p = self.head
        for k in range(self.size):
            if target == p.item: return k
            p = p.next
        return None
    
    def print_list(self):
        p = self.head
        while p:
            if p.next != None:
                print(p.item, ' -> ', end='', sep='')
            else:
                print(p.item)
            p = p.next
```
