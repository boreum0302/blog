---
title: "파이썬 자료구조: 스택과 큐"
categories:
  - Data Structure
tags:
  - python
---

단순연결리스트를 이용하여 맨 앞에서만 항목을 삭제하거나 삽입하는 자료구조인 스택(stack)과 맨 앞에서는 항목을 삭제하기만 하고 맨 뒤에서는 항목을 삽입하기만 하는 자료구조인 큐(queue)를 구현했다. 스택에서는 마지막에 들어온 항목이 가장 먼저 나가므로 후입선출(Last In First Out, LIFO), 큐에서는 먼저 들어온 항목일수록 먼저 나가므로 선입선출(First In First Out, FIFO) 규칙이 적용된다. 데크(deque)은 맨 뒤와 맨 앞에서 삭제와 삽입이 둘 다 가능한 자료구조이다. 파이썬에는 스택과 큐 객체를 생성할 수 있는 `queue` 모듈과 데크 객체를 생성할 수 있는 `deque` 모듈이 존재한다. 

- TABLE OF CONTENTS
{:toc}

## 스택(stack)
`pop()`은 맨 앞의 노드를 삭제한 뒤 삭제된 노드의 항목을 반환하는 메소드이고, `push()`는 새 노드를 맨 앞에 삽입하는 메소드이다. 각각의 연산에 걸리는 시간은 $$O(1)$$이다. 

```python
class Stack():
    
    class EmptyError(Exception):
        pass

    class Node:
        def __init__(self, item, link):
            self.item = item
            self.next = link

    def __init__(self):
        self.head = None
        self.size = 0

    def size(self): return self.size
    def is_empty(self): return self.size == 0
    
    # item을 항목으로 가지는 노드 맨 앞에 삽입하기
    def push(self, item):  
        if self.is_empty():
            self.head = self.Node(item, None)
        else:
            self.head = self.Node(item, self.head)
        self.size += 1
    
    # 맨 앞의 노드 삭제하고 항목 반환하기
    def pop(self):  
        if self.is_empty():
            raise EmptyError('Underflow')
        else:
            temp = self.head.item
            self.head = self.head.next
            self.size -= 1
            return temp
   
   # 전체 항목 출력하기
    def print_stack(self):  
        print('top -> ', end='')
        p = self.head
        while p:
            if p.next != None:
                print(p.item, '-> ', end='')
            else:
                print(p.item)
            p = p.next
```

## 큐(queue)
맨 뒤에다 항목을 삽입해야 하기 때문에 큐 객체는 맨 뒤 노드를 가리키는 `tail`이라는 속성을 가진다. 메소드에는 맨 앞의 노드를 삭제하고 삭제된 노드의 항목을 반환하는 `remove()`와, 맨 뒤에 `item`을 항목으로 가지는 노드를 삽입하는 `add(item)`이 존재한다. 각각에 걸리는 시간은 $$O(1)$$이다.

```python
class Queue():
    
    class EmptyError(Exception):
        pass
    
    class Node:
        def __init__(self, item, link):
            self.item = item
            self.next = link
    
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def size(self): return self.size
    def is_empty(self): return self.size == 0        
        
    # item을 항목으로 가지는 노드 맨 뒤에 삽입하기    
    def add(self, item):
        new_node = self.Node(item, None)
        if self.is_empty():
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1
    
    # 맨 앞의 노드 삭제하고 항목 반환하기
    def remove(self):
        if self.is_empty():
            raise EmptyError('Underflow')
        else:
            temp = self.head.item
            self.head = self.head.next
            self.size -= 1
            if self.size == 0:
                tail = None
            return temp
            
    # 전체 항목 출력하기    
    def print_queue(self):  
        print('head -> ', end='')
        p = self.head
        while p:
            if p.next != None:
                print(p.item, '-> ', end='')
            else:
                print(p.item, end='')
            p = p.next
        print(' <- tail')
```

## 데크(deque)
스택과 큐를 혼합한 형태이므로 이중연결리스트로 구현하는 것이 적절하다.

## `queue`

`import queue`를 먼저 실행한다. `queue` 모듈에는 세 가지 클래스가 정의되어 있다. 

|클래스|내용|
|:--|:--|
|`queue.Queue(maxsize)`|최대 크기가 `maxsize`인 큐 객체 생성하기|
|`queue.LifoQueue(maxsize)`|최대 크기가 `maxsize`인 스택 객체 생성하기|
|`queue.PriorityQueue(maxsize)`|최대 크기가 `maxsize`인 우선순위 큐 객체 생성하기|

각각의 클래스에 대한 메소드의 종류와 기능은 [**여기**](https://docs.python.org/ko/3/library/asyncio-queue.html)에 잘 설명되어 있다.

## `deque`

`from collections import deque`를 먼저 실행한다. `deque()`로 데크 객체를 생성한 뒤 수행할 수 있는 메소드에는 아래와 같은 것들이 있다. 

|메소드|내용|
|:--|:--|
|`append(item)`|맨 뒤에 항목 삽입하기|
|`appendleft(item)`|맨 앞에 항목 삽입하기|
|`pop()`|맨 뒤의 항목 삭제하고 삭제된 항목 반환하기|
|`popleft()`|맨 앞의 항목 삭제하고 삭제된 항목 반환하기|

**Reference** 파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
