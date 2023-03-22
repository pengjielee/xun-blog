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

//Test

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

