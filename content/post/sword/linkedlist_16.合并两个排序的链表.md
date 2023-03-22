---
title: "16.合并两个排序的链表"
url: "post/merges-two-sorted-linked-lists"
date: 2021-02-18T10:11:04+08:00
keywords: '链表,合并链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

## JS实现

1、递归实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2) {
  if (pHead1 === null) {
    return pHead2;
  }
  if (pHead2 === null) {
    return pHead1;
  }

  if (pHead1.val < pHead2.val) {
    pHead1.next = Merge(pHead1.next, pHead2);
    return pHead1;
  } else {
    pHead2.next = Merge(pHead1, pHead2.next);
    return pHead2;
  }
}
```

2、非递归实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2) {
  // write code here
  if (pHead1 === null) {
    return pHead2;
  }
  if (pHead2 === null) {
    return pHead1;
  }

  let mergedHead = null;
  let current = null;

  while (pHead1 != null && pHead2 != null) {
    if (pHead1.val <= pHead2.val) {
      if (mergedHead === null) {
        mergedHead = current = pHead1;
      } else {
        current.next = pHead1;
        current = current.next;
      }
      pHead1 = pHead1.next;
    } else {
      if (mergedHead === null) {
        mergedHead = current = pHead2;
      } else {
        current.next = pHead2;
        current = current.next;
      }
      pHead2 = pHead2.next;
    }
  }
  if (pHead1 === null) {
    current.next = pHead2;
  } else {
    current.next = pHead1;
  }
  return mergedHead;
}
```

## Go实现

```go
package main

import "fmt"

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
  node6 := &ListNode{Val: 6}
  node1.Next = node3
  node3.Next = node5
  printList(node1)
  node2.Next = node4
  node4.Next = node6
  printList(node2)

  // newHead := mergeTwoList1(node1, node2)
  // printList(newHead)

  newHead := Merge(node1, node2)
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

func mergeTwoList1(l1 *ListNode, l2 *ListNode) *ListNode {
  head := &ListNode{}
  result := head
  for l1 != nil && l2 != nil {
    if l1.Val < l2.Val {
      head.Next = l1
      l1 = l1.Next
    } else {
      head.Next = l2
      l2 = l2.Next
    }
    head = head.Next
  }
  if l1 != nil {
    head.Next = l1
  }
  if l2 != nil {
    head.Next = l2
  }
  return result.Next
}

// 递归
func Merge(l1, l2 *ListNode) *ListNode {
  if l1 == nil {
    return l2
  }
  if l2 == nil {
    return l1
  }
  var tempNode *ListNode
  if l1.Val < l2.Val {
    tempNode = l1
    l1.Next = Merge(l1.Next, l2)

  }
  if l1.Val > l2.Val {
    tempNode = l2
    l2.Next = Merge(l1, l2.Next)

  }
  return tempNode
}
```
