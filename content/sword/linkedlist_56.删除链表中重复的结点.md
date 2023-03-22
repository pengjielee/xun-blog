---
title: "56.删除链表中重复的结点"
url: "post/delete-duplicate-nodes-in-the-linked-list"
date: 2021-02-09T14:23:46+08:00
keywords: '链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

## 思路

非递归的代码：  
1、首先添加一个头节点，以方便碰到第一个，第二个节点就相同的情况；  
2、设置 pre ，last 指针， pre指针指向当前确定不重复的那个节点，而last指针相当于工作指针，一直往后面搜索。  

## JS实现

```javascript
// 非递归法
function deleteDuplication(pHead) {
  if (!pHead || !pHead.next) {
    return pHead;
  }
  let newHead = {
    val: "a",
    next: pHead,
  };
  let before = newHead;
  let current = newHead.next;
  while (current && current.next) {
    if (current.val === current.next.val) {
      let val = current.val;
      while (current && current.val === val) {
        current = current.next;
      }
      before.next = current;
    } else {
      current = current.next;
      before = before.next;
    }
  }
  return newHead.next;
}
```

## Go实现

```go
func deleteDuplication(pHead *ListNode) *ListNode {
  if pHead == nil || pHead.Next == nil {
    return pHead
  }

  //创建一个哑节点
  dummyNode := &ListNode{Val: -1, Next: pHead}

  //pre节点指向不重复的节点
  pre := dummyNode

  //工作节点
  curr := dummyNode

  for curr != nil && curr.Next != nil {
    //如果当前节点与下一个节点的值相等
    if curr.Val == curr.Next.Val {
      val := curr.Val
      for curr != nil && curr.Val == val {
        curr = curr.Next
      }
      pre.Next = curr
    } else {
      curr = curr.Next
      pre = pre.Next
    }
  }

  return dummyNode.Next
}
```

## More


----18-2、删除链表中重复的结点(js实现)  
https://blog.csdn.net/qq_40816360/article/details/94554878
