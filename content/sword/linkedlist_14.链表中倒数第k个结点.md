---
title: "14.链表中倒数第k个结点"
url: "post/the-last-k-node-in-the-linked-list"
date: 2021-02-22T10:00:55+08:00
keywords: '链表,反转链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

输入一个链表，输出该链表中倒数第k个结点。

## 思路

利用快慢指针，快指针先走k步，然后快慢指针一起走，当快指针走到末尾，那么慢指针就到了倒数第k个节点了。

## JS实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k) {
  // write code here
  let fast = head,
    slow = head;

  for (let i = 0; i < k; i++) {
    if (fast === null) return;
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
```

Test

```javascript
var linkedlist = {
  length: 7,
  head: {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: { 
              value: 4, 
              next: { 
                value: 5, 
                next: null 
              } 
            },
          },
        },
      },
    },
  },
};

function display(linkedlist) {
  var results = [];
  var current = linkedlist.head;
  while (current) {
    results.push(current.value);
    current = current.next;
  }
  return results;
}

FindKthToTail(linkedlist.head, 3);
```

## Go实现

```go
package main

import (
  "fmt"
)

type ListNode struct {
  Val  int
  Next *ListNode
}

func main() {
  node1 := &ListNode{Val: 1}
  node2 := &ListNode{Val: 2}
  node3 := &ListNode{Val: 3}
  node4 := &ListNode{Val: 4}
  node5 := &ListNode{Val: 5}
  node1.Next = node2
  node2.Next = node3
  node3.Next = node4
  node4.Next = node5
  fmt.Println(getKthFromEnd(node1, 1).Val) //5
  fmt.Println(getKthFromEnd(node1, 2).Val) //4
  fmt.Println(getKthFromEnd(node1, 3).Val) //3
  fmt.Println(getKthFromEnd(node1, 4).Val) //2
  fmt.Println(getKthFromEnd(node1, 5).Val) //1
}

func getKthFromEnd(head *ListNode, k int) *ListNode {
  slow, fast := head, head
  for ; k > 0; k-- {
    fast = fast.Next
  }
  for fast != nil {
    slow, fast = slow.Next, fast.Next
  }
  return slow
}
```


