---
title: "파이썬 자료구조: 연결리스트"
categories:
  - Data Structure
tags:
  - python
---

가장 기본적인 자료구조인 단순연결리스트와 함께, 이를 살짝 변형한 이중연결리스트, 원형연결리스트를 구현하면서 개념을 정리했다.

- TABLE OF CONTENTS
{:toc}

## 단순연결리스트(singly linked list)
단순연결리스트(singly linked list)를 구현하기 위해 생성된 노드(node)라는 객체(object)들은 한 방향으로 연결되어 있다. 다시 말해, 각각의 노드는 항목을 나타내는 `item`과 뒤에 연결된 노드를 가리키는 `next`를 속성(attribute)으로 가진다. 단순연결리스트 객체 자체는 맨 앞에 있는 노드를 가리키는 `head`와 노드의 개수를 나타내는 `size`를 속성으로 가지면 충분하다. 임의의 항목을 가지는 노드의 삽입, 특정 노드의 삭제, 항목의 탐색에 걸리는 시간은 아래와 같다.

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
    
    # item을 항목으로 가지는 노드를 맨 앞에 삽입하기
    def insert_front(self, item):  
        if self.is_empty():
            self.head = self.Node(item, None)
        else:
            self.head = self.Node(item, self.head)
        self.size += 1
        
    # p가 가리키는 노드 뒤에 item을 항목으로 가지는 노드 삽입하기
    # 여기서 p는 head, head.next, head.next.next 등이 가능함
    def insert_after(self, item, p):
        p.next = self.Node(item, p.next)
        self.size += 1
    
    # 맨 뒤의 노드 삭제하기
    def delete_front(self):  
        if self.is_empty():
            raise EmptyError('Underflow')
        else:
            self.head = self.head.next
            self.size -= 1
            
    # p가 가리키는 노드 뒤에 있는 노드 삭제하기
    # 여기서 p는 head, head.next, head.next.next 등이 가능함
    def delete_after(self, p):  
        if self.is_empty():
            raise EmptyError('Unerflow')
        t = p.next
        p.next = t.next
        self.size -= 1
    
    # target을 항목으로 가지는 노드가 앞에서부터 몇 번째에 있는지 반환하기
    def search(self, target):  
        p = self.head
        for k in range(self.size):
            if target == p.item: return k
            p = p.next
        return None
        
    # 전체 항목 출력하기
    def print_list(self):
        p = self.head
        while p:
            if p.next != None:
                print(p.item, ' -> ', end='', sep='')
            else:
                print(p.item)
            p = p.next
```  

## 이중연결리스트(doubly linked list)
이중연결리스트(doubly linked list)의 경우 노드들이 양쪽 방향으로 연결되어 있어서, 각각의 노드는 항목을 나타내는 `item`, 앞에 연결된 노드를 가리키는 `prev`, 뒤에 연결된 노드를 가리키는 `next`를 속성으로 가진다. 단순연결리스트에서와 비슷하게 이중연결리스트 객체의 속성인 `head`는 맨 앞의 노드를 가리키며 `tail`은 맨 뒤의 노드를 가리킨다. 여기서 주의할 점은, `head`와 `tail`은 `item`이 `None`인 더미(dummy) 노드라는 것이다. 이에 따라 맨 앞에 있는 항목이 `head`가 아니라 `head.next`의 `item`에 저장되어 있다(맨 뒤 항목은 `tail.prev`의 `item`에 저장되어 있음). 임의의 항목을 가지는 노드의 삽입, 특정 노드의 삭제, 항목의 탐색에 걸리는 시간은 아래와 같다.

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
    
    # p가 가리키는 노드 앞에 item을 항목으로 가지는 노드 삽입하기
    # 여기서 p는 head, head.next, tail.prev 등이 가능함
    def insert_before(self, p, item):  
        t = p.prev
        n = self.Node(item, t, p)
        p.prev = n
        t.next = n
        self.size += 1
        
    # p가 가리키는 노드 뒤에 item을 항목으로 가지는 노드 삽입하기
    # 여기서 p는 head, head.next, tail.prev 등이 가능함        
    def insert_after(self, p, item):
        t = p.next
        n = self.Node(item, p, t)
        t.prev = n
        p.next = n
        self.size -= 1
        
    # p가 가리키는 노드 삭제하고 삭제된 노드의 item 반환하기
    # 여기서 p는 head, head.next, tail.prev 등이 가능함         
    def delete(self, p):
        f = p.prev
        r = p.next
        f.next = r
        r.prev = f
        self.size -= 1
        return p.item
    
    # 전체 item 출력하기
    def print_list(self):
        if self.is_empty():
            print("Empty")
        else:
            p = self.head.next
            while p != self.tail:
                if p.next != self.tail:
                    print(p.item, ' <-> ', end='', sep='')
                else:
                    print(p.item)
                p = p.next
```  

## 원형연결리스트(circular linked list)
원형연결리스트(circular linked list)는 단순연결리스트와 동일하지만, 맨 뒤 노드의 `next`가 맨 앞 노드를 가리킨다. 원형연결리스트 객체는 맨 앞 노드를 가리키는 `head` 대신에 맨 뒤 노드를 가리키는 `last`를 속성으로 가진다. 임의의 항목을 가지는 노드의 삽입, 특정 노드의 삭제, 항목의 탐색에 걸리는 시간은 아래와 같다.

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
    
    # item을 항목으로 가지는 노드를 맨 앞에 삽입하기
    def insert(self, item):
        n = self.Node(item, None)
        if self.is_empty():
            n.next = n
            self.last = n
        else:
            n.next = self.last.next
            self.last.next = n
        self.size += 1
    
    # 맨 앞 노드의 item 반환하기
    def first(self):
        if self.is_empty():
            raise EmptyError('Underflow')
        f = self.last.next
        return f.item
    
    # 맨 앞 노드 삭제하기
    def delete(self):
        if self.is_empty():
            raise EmptyError('Underflow')
        x = self.last.next
        if self.size == 1:
            self.last = None
        else:
            self.last.next = x.next
        self.size -= 1
    
    # 전체 item 출력하기
    def print_list(self):
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

**Reference** 파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
