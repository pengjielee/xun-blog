---
title: "36.两个链表的第一个公共结点"
url: "post/the-first-common-node-of-two-linked-lists"
date: 2021-02-18T09:30:01+08:00
keywords: '链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

输入两个链表，找出它们的第一个公共结点。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

## 思路

什么是公共节点，并不是两个节点的值相同就是公共节点。
而是在第一链表和第二链表中都存在一个节点，该节点往后的子链表在两个链表中是相同的。

如下图中链表6-7就是两个链表的公共链表，而节点6就是第一个公共节点。

```
1 -> 2 -> 3 -> 6 -> 7  
     4 -> 5 -> 6 -> 7
```

如果两个链表存在公共节点，那么公共节点出现在两个链表的尾部。如果我们从两个链表的尾部开始往前比较，那么最后一个相同的节点就是我们要找的节点。但是这两个链表是单向的，要实现尾节点最先比较，我们可以借助两个辅助栈。分别将两个链表的节点放入两个栈中，这样栈顶就是两个链表的尾节点，比较两个栈顶节点是否相同，如果相同，将栈顶弹出比较下一个栈顶，直到找到最后一个相同的栈顶。时间复杂度O(m + n)。

## JS实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  if (pHead1 === null || pHead2 === null) {
    return null;
  }

  let stack1 = [],
    stack2 = [];

  while (pHead1 != null) {
    stack1.push(pHead1);
    pHead1 = pHead1.next;
  }

  while (pHead2 != null) {
    stack2.push(pHead2);
    pHead2 = pHead2.next;
  }

  let temp = null;

  while (stack1.length > 0 && stack2.length > 0) {
    const node1 = stack1.pop();
    const node2 = stack2.pop();
    if (node1.val === node2.val) {
      temp = node1;
    } else {
      break;
    }
  }

  return temp;
}
```


