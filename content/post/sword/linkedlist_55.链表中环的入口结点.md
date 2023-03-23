---
title: "55.链表中环的入口结点"
url: "post/the-entry-node-of-the-linked-list-loop"
date: 2021-02-10T08:52:23+08:00
keywords: '链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

## 思路

1、设置快慢指针，假如有环，他们一定相遇在环中；  
2、两个指针相遇后，让两个指针分别从链表头和相遇点重新出发，每次走一步，最后一定相遇于环入口；  

## JS实现

参考1

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead) {
  // write code here
  //至少3个节点才能成环  
  if (!pHead || !pHead.next || !pHead.next.next) {
    return null;
  }

  //定义快慢指针
  let slow = pHead.next;
  let fast = pHead.next.next;

  while (slow && fast) {
    if (fast !== slow) {
      fast = fast.next.next;
      slow = slow.next;
    } else {
      break;
    }
  }

  //没有环
  if (!fast || !slow) {
    return null;
  }

  fast = pHead;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
}
```

参考2

```javascript
function EntryNodeOfLoop(pHead) {
  //定义快慢指针
  let fast = pHead;
  let slow = pHead;

  while (fast.next != null && fast.next.next != null) {
    fast = fast.next.next;
    slow = slow.next;
    //如果有环，想遇于环中某点
    if (fast == slow) {
      break;
    }
  }
  //如果没有环，return null
  if (fast.next == null || fast.next.next == null) {
    return null;
  }
  //如果有环，两个指针分别从链表头和相遇点出发，最终必定在环入口相遇
  slow = pHead;
  while (slow != fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
}
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
  l1 := &ListNode{Val: 1}
  node2 := &ListNode{Val: 2}
  node3 := &ListNode{Val: 3}
  node4 := &ListNode{Val: 4}
  node5 := &ListNode{Val: 5}

  l1.Next = node2
  node2.Next = node3
  node3.Next = node4
  node4.Next = node5
  node5.Next = node4

  l2 := &ListNode{Val: 21}
  l2.Next = &ListNode{Val: 22}
  l2.Next.Next = &ListNode{Val: 23}

  fmt.Println(detectCycle1(l1))
  fmt.Println(detectCycle1(l2))
  fmt.Println(detectCycle2(l1))
  fmt.Println(detectCycle2(l2))
}

func detectCycle1(head *ListNode) *ListNode {
  //用map的key来判断是否已经存在
  mapper := make(map[*ListNode]int)
  //遍历链表，如果key不存在则赋值，已存在说明有环，遍历一遍后不存在则无环
  for head != nil {
    if _, ok := mapper[head]; !ok {
      mapper[head] = 1
      head = head.Next
    } else {
      return head
    }
  }
  return nil
}

func detectCycle2(head *ListNode) *ListNode {
  if head == nil {
    return nil
  }
  //定义两个指针，fast一次走两步，slow一次走一步
  fast := head
  slow := head
  for {
    //fast遍历一遍，没有环
    if fast.Next == nil {
      return nil
    }
    fast = fast.Next.Next
    slow = slow.Next
    //快慢相遇，存在环，跳出循环，注意此时并不一定是环入口结点
    if fast == slow {
      break
    }
  }
  //fast指向开始的地方，一次走一步，直到两者相遇
  fast = head
  for fast != slow {
    fast = fast.Next
    slow = slow.Next
  }
  return fast
}
```