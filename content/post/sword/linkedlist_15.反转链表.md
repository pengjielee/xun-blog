---
title: "15.反转链表.md"
url: "post/reverse-a-linked-list"
date: 2021-02-18T10:11:35+08:00
keywords: '链表,反转链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: 'swordoffer'
draft: false
---

## 题目

输入一个链表，反转链表后，输出新链表的表头。

## JS实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead) {
  // write code here
  if (pHead === null || pHead.next === null) {
    return pHead;
  }

  let prev = null; //记录节点的前一个节点
  let next = null; //记录节点的后一个节点
  while (pHead != null) {
    next = pHead.next; //记录当前节点的下一个节点位置；
    pHead.next = prev; //让当前节点指向前一个节点位置，完成反转
    prev = pHead; //prev 往右走
    pHead = next; //当前节点往右继续走
  }
  return prev;
}
```

Test

```javascript
var linkedlist = {
  length: 3,
  head: { value: 5, next: { value: 4, next: { value: 6, next: null } } },
};

ReverseList(linkedlist.head);
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

  printList(node1)
  newHead := reverseList1(node1)
  printList(newHead)
  newHead = reverseList2(node1)
  printList(newHead)
  newHead = reverseList3(node1)
  printList(newHead)

}

func printList(head *ListNode) {
  curr := head
  for curr != nil {
    fmt.Printf("%d\t", curr.Val)
    curr = curr.Next
  }
  fmt.Println("")
}

// 通过入栈和出栈，实现链表的反转
func reverseList1(head *ListNode) *ListNode {
  var stack []int
  for p := head; p != nil; p = p.Next {
    stack = append(stack, p.Val)
  }
  h := new(ListNode)
  t := h
  for i := len(stack) - 1; i >= 0; i-- {
    t.Next = &ListNode{
      stack[i],
      nil,
    }
    t = t.Next
  }
  return h.Next
}

// 迭代
func reverseList2(head *ListNode) *ListNode {
  var t *ListNode
  for p := head; p != nil; p = p.Next {
    t = &ListNode{
      p.Val,
      t,
    }
  }
  return t
}

func reverseList3(head *ListNode) *ListNode {
  //空链表
  if head == nil {
    return nil
  }

  next := head.Next
  head.Next = nil

  for next != nil {
    ptmp := next.Next
    next.Next = head

    head = next
    next = ptmp
  }
  return head
}
```
