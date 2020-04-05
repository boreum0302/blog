---
title: "파이썬 자료구조: 이진트리와 힙"
subtitle: "파이썬으로 이진트리와 힙 구현하기"
categories:
  - Data Structure
tags:
  - python
---

트리(Tree)는 연결리스트와 달리 노드들이 위아래로 연결된 계층적인 자료구조이다. 특히 각각의 노드 아래에 두 개 이하의 노드가 연결된 이진트리(Binary Tree)의 활용성이 높다. 예를 들어, 이진트리를 활용하면 $$O(log N)$$이라는 빠른 시간에 가장 높은 우선순위를 가진 항목을 삭제하는 연산과 임의의 우선순위를 가진 항목을 삽입하는 연산을 제공하는 유용한 자료구조인 힙(Heap)이라는 것을 구현할 수 있다. 직접 해봤다.

- TABLE OF CONTENTS
{:toc}

## 트리
일반적으로 트리의 생김새를 묘사하기 위해 아래와 같은 용어들을 사용한다.

|용어|내용|
|---|---|
|루트(Root)|트리의 최상위에 있는 노드|
|자식(Child)|특정 노드 아래에 연결된 노드|
|차수(Degree)|특정 노드의 자식 수|
|부모(Parent)|특정 노드 위에 연결된 노드|
|이파리(Leaf)|자식이 없는 노드|
|내부(Internal) 노드|이파리가 아닌 노드|
|형제(Sibling)|부모가 같은 노드|
|조상(Ancestor)|특정 노드에서 출발하여 루트까지 올라갈 때 들리는 모든 노드들의 집합|
|후손(Descendant)|특정 노드 아래에 매달린 모든 노드들의 집합|
|서브트리(Subtree)|특정 노드 자신과 후손으로 구성된 트리|
|레벨(Level)|루트의 레벨은 1이고, 아래로 내려가며 레벨이 1씩 증가함|
|높이(Height)|트리의 최대 레벨|
|키(Key)|노드에 저장된 값으로 탐색에 사용됨|

## 이진트리
이진트리는 각각의 노드의 자식이 두 개 이하인 트리이다. 이진트리 중 완전이진트리(Complete Binary Tree)와 포화이진트리(Full Binary Tree)는 특별한 형태를 가진다.

![(1)]({{ '/images/2020-04-04-(1).png' }}){: .align-center}

|이름|내용|
|---|---|
|완전이진트리|마지막 레벨을 제외하면 각각의 레벨이 노드로 완전히 채워져 있고, 마지막 레벨은 노드가 왼쪽에서부터 차곡차곡 채워진 트리|
|포화이진트리|완전이진트리의 일종으로, 이파리의 레벨이 전부 동일하며 각각의 내부노드의 차수가 2인 트리|

### 이진트리 객체 생성하기

```python
class Node:
    def __init__(self, item, left=None, right=None):
        self.item = item
        self.left = left  # 왼쪽 아래에 달린 자식
        self.right = right  # 오른쪽 아래에 달린 자식

class BinaryTree:
        
    class EmptyError(Exception):
        pass
    
    def __init__(self):
        self.root = None
```

### 이진트리 순회하기

```python
    # 전위순회(Node -> Left -> Right)
    def preorder(self, node):  
        if node != None:
            print(str(node.item), end=' ')
            if node.left:
                self.preorder(node.left)
            if node.right:
                self.preorder(node.right)
    
    # 후위순회(Left -> Right -> Node)
    def postorder(self, node): 
        if node != None:
            if node.left:
                self.postorder(node.left)
            if node.right:
                self.postorder(node.right)
            print(str(node.item), end=' ')
    
    # 중위순회(Left -> Node -> Right)
    def inorder(self, node): 
        if node != None:
            if node.left:
                self.inorder(node.left)
            print(str(node.item), end=' ')
            if node.right:
                self.inorder(node.right)
    
    # 레벨순회(최상위 레벨부터 시작하여 각 레벨마다 왼쪽에서 오른쪽으로 노드를 방문함)      
    def levelorder(self, node):  
        if node == None:
            return
        q = [node]
        while len(q) > 0:
            new_node = q.pop(0)
            print(new_node.item, end=' ')
            if new_node.left != None:
                q.append(new_node.left)
            if new_node.right != None:
                q.append(new_node.right)
```

### 이진트리 높이 계산하기
```python
    def height(self, node):
        if node == None:
            return 0
        return max(self.height(node.left), self.height(node.right)) + 1
```

### 이진트리 복사하기
```python
    def copy(self, n):  # 연습문제 4.27
        
        if n == None:
            return
        
        nodes, coppied_nodes, q = [], [], [n]
        while len(q) > 0:
            node = q.pop(0)
            nodes.append(node)
            coppied_nodes.append(Node(node.item))
            if node.left != None:
                q.append(node.left)
            if node.right != None:
                q.append(node.right)
        
        for i in range(len(nodes)):  # O(N^2)
            index_left, index_right = None, None
            for j in range(len(nodes)):
                if nodes[i].left == nodes[j]:
                    index_left = j
                if nodes[i].right == nodes[j]:
                    index_right = j
            if index_left != None:
                coppied_nodes[i].left = coppied_nodes[index_left]
            if index_right != None:
                coppied_nodes[i].right = coppied_nodes[index_right]
        
        coppied_tree = BinaryTree()
        coppied_tree.root = coppied_nodes[0]
        
        return coppied_tree
```

우선 비어 있는 리스트인 `nodes`와 `coppied_nodes`를 준비한다. `while` 절에서 레벨순회를 하며 `nodes`에는 주어진 노드를 그대로 `append`하고, `coppied_nodes`에는 `item`은 동일하지만 `right`와 `left`는 `None`인 노드를 새롭게 만들어서 `append`한다. 이제 `for` 절에서 `coppied_nodes`에 있는 노드들을 본래 트리에서처럼 연결해준다. 마지막으로 `coppied_tree`라는 `BinaryTree()` 객체를 생성하고, `root`를 `coppied_nodes[0]`으로 설정한 뒤 반환한다.

### 두 이진트리가 동일한지 검사하기
```python
    def is_same(self, my_root, other_root):  # 연습문제 4.18
        if my_root == None or other_root == None:
            return my_root == other_root
        if my_root.item != other_root.item:
            return False
        return self.is_same(my_root.left, other_root.left) and self.is_same(my_root.right, other_root.right)
```

## 힙
힙은 부모의 우선순위가 항상 자식의 우선순위보다 높은 완전이진트리이다. 이때 각각의 노드의 우선순위는 키값이 결정한다. 이진힙에서 키값이 작을수록 우선순위가 높은 경우를 최소힙(minimum heap)이라 하고, 키값이 클수록 우선순위가 높은 경우를 최대힙(maximum heap)이라 한다. 이하 '힙'은 '최소힙'을 의미한다.

### 힙 객체 생성하기
![(2)]({{ '/images/2020-04-04-(2).png' }}){: .align-center}
힙을 구현할 때는 리스트를 사용한다. 위와 같이 트리에서 레벨순회를 하며 `a[1]`부터 차곡차곡 키값을 저장하면, `a[i]`의 자식은 `a[2*i]`와 `a[2*i + 1]`에 존재하고 `a[j]`의 부모는 `a[j//2]`에 존재하게 된다.

```python
class BHeap:
    
    def __init__(self, a):
        self.a = a  # 리스트
        self.N = len(a) - 1  # 항목의 개수
```

### 힙에 임의의 우선순위를 가지는 항목 삽입하기

```python
   # (키값, 항목) 형식의 튜플인 `key_value`를 힙에 삽입하기
   def insert(self, key_value):
        self.N += 1
        self.a.append(key_value)
        self.upheap(self.N)  # 힙의 마지막 항목부터 출발하여 올라가면서 힙 속성 회복하기
        
   # j번째 항목부터 올라가면서 힙 속성 회복하기
   def upheap(self, j):
        while j > 1 and self.a[j//2][0] > self.a[j][0]:  # 부모의 키값이 자식의 키값보다 큰 경우에만
            self.a[j], self.a[j//2] = self.a[j//2], self.a[j]  # 부모와 자식을 맞바꾸기
            j = j//2  # 한 층 올라가기
```

### 힙에서 우선순위가 가장 작은 항목 삭제하기

```python
    # 힙에서 키값이 가장 작은 항목 삭제하고 삭제된 항목 반환하기
    def delete_min(self):
        if self.N == 0:
            raise EmptyError('Underflow')
        else:
            minimum = self.a[1]
            self.a[1], self.a[-1] = self.a[-1], self.a[1]  # 첫 항목과 마지막 항목을 맞바꾸기
            del self.a[-1]  # 맨 뒤를 삭제하기
            self.N -= 1
            self.downheap(1)  # 힙의 첫 항목부터 출발하여 내려가면서 힙 속성 회복하기
            return minimum
    
    # i번째 항목부터 내려가면서 힙 속성 회복하기
    def downheap(self, i):
        while 2*i <= self.N:
            k = 2*i  # a[i]의 자식은 a[2*i]와 a[2*i + 1]에 존재함
            if k < self.N and self.a[k][0] > self.a[k + 1][0]:
                k += 1  # 왼쪽 자식의 키값이 작다면 k = 2*i이고 오른쪽 자식의 키값이 작다면 k = 2*i + 1임
            if self.a[i][0] < self.a[k][0]:  
                break  # 부모의 키값이 두 자식의 키값보다 작다면 힙 속성을 만족하는 것이니까 반복문 나가기
            self.a[i], self.a[k] = self.a[k], self.a[i]  # 힙 속성을 만족시키기 위해 두 자식 중 키값이 작은 것을 부모와 맞바꾸기
            i = k  # 한 층 내려가기
```

### 상향식 힙 만들기(bottom-up heap construction)
```python
    # self.a를 힙 속성을 만족하게끔 재배열함
    def create_heap(self):
        # 마지막 직전 층에서부터 downheap을 수행하며 올라감
        for i in range(self.N//2, 0, -1):
            self.downheap(i)
```

## 출처
파이썬과 함께하는 자료구조의 이해 / 양성봉 지음 / 생능출판사
