var store = [{
        "title": "파이썬 자료구조: 연결리스트",
        "excerpt":"가장 기본적인 자료구조인 단순연결리스트와 함께, 이를 살짝 변형한 이중연결리스트, 원형연결리스트를 구현하면서 개념을 정리했다. 단순연결리스트(singly linked list) 이중연결리스트(doubly linked list) 원형연결리스트(circular linked list)단순연결리스트(singly linked list) 단순연결리스트(singly linked list)를 구현하기 위해 생성된 노드(node)라는 객체(object)들은 한 방향으로 연결되어 있다. 다시 말해, 각각의 노드는 항목을 나타내는 item과 뒤에 연결된 노드를 가리키는 next를 속성(attribute)으로 가진다....","categories": ["Data Structure"],
        "tags": ["python"],
        "url": "http://localhost:4000/data%20structure/linked-list/"
      },{
        "title": "파이썬 자료구조: 스택과 큐",
        "excerpt":"단순연결리스트를 이용하여 맨 앞에서만 항목을 삭제하거나 삽입하는 자료구조인 스택(stack)과 맨 앞에서는 항목을 삭제하기만 하고 맨 뒤에서는 항목을 삽입하기만 하는 자료구조인 큐(queue)를 구현했다. 스택에서는 마지막에 들어온 항목이 가장 먼저 나가므로 후입선출(Last In First Out, LIFO), 큐에서는 먼저 들어온 항목일수록 먼저 나가므로 선입선출(First In First Out, FIFO) 규칙이 적용된다. 데크(deque)은 맨 뒤와...","categories": ["Data Structure"],
        "tags": ["python"],
        "url": "http://localhost:4000/data%20structure/stack-and-queue/"
      },{
        "title": "파이썬 자료구조: 이진트리와 힙",
        "excerpt":"트리(tree)는 연결리스트와 달리 노드들이 위아래로 연결된 계층적인 자료구조이다. 특히 각각의 노드 아래에 두 개 이하의 노드가 연결된 이진트리(binary tree)의 활용성이 높다. 예를 들어, 이진트리를 활용하면 \\(O(log N)\\)이라는 빠른 시간에 가장 높은 우선순위를 가진 항목을 삭제하는 연산과 임의의 우선순위를 가진 항목을 삽입하는 연산을 제공하는 힙(heap)을 구현할 수 있다. 이진트리와 힙을 구현했다....","categories": ["Data Structure"],
        "tags": ["python"],
        "url": "http://localhost:4000/data%20structure/binary-tree-and-heap/"
      },{
        "title": "파이썬 자료구조: 탐색트리",
        "excerpt":"이진탐색트리(binary search tree)는 정렬된 값들이 리스트에 존재할 때 주어진 값을 빠르게 찾는 방법인 이진탐색(binary tree)을 트리에 접목한 자료구조이다. 단순연결리스트에 비해, 저장된 값을 탐색하거나 임의의 값을 삽입하고 삭제하는 연산을 수행하는 데에 시간이 적게 걸린다는 장점이 있다. 이진탐색트리를 직접 구현해본 다음, 이진탐색트리에 기반한 자료구조인 AVL 트리, 2-3 트리, 좌편향 레드블랙트리(left-leaning red-black tree),...","categories": ["Data Structure"],
        "tags": ["python"],
        "url": "http://localhost:4000/data%20structure/search-tree/"
      },{
        "title": "파이썬 자료구조: 그래프",
        "excerpt":"정점(vertex)들과 두 개의 정점을 잇는 간선(edge)들의 집합인 그래프(graph)는 광범위한 분야에 활용되는 자료구조이다. 그래프에 관한 용어들을 정리한 다음, 그래프에 속한 정점들을 빠짐없이 방문하는 두 가지 기본 연산인 깊이 우선 탐색(depth first search)과 너비 우선 탐색(breadth first search)을 구현했다. 그리고 최소 신장 트리(minimum spanning tree)를 찾는 Kruskal 알고리즘과 Prim 알고리즘, 최단 경로(shortest...","categories": ["Data Structure"],
        "tags": ["python"],
        "url": "http://localhost:4000/data%20structure/graph/"
      }]
