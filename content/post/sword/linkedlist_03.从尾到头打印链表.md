---
title: "03.从尾到头打印链表"
url: "post/print-the-linked-list-from-tail-to-head"
date: 2021-02-22T10:34:06+08:00
keywords: '链表,反转链表,LinkedList,剑指offer题目'
description: ''
tags: ['LinkedList']
categories: ['swordoffer']
draft: false
---

## 题目

输入一个链表，按链表从尾到头的顺序返回一个ArrayList。

## 思路

利用JS数组的unshift()方法，在数组开头插入数据。

```javascript
var nums = [1,2,3];
var temp = nums.unshift(4);
console.log(temp); //4
console.log(nums); //[4,1,2,3]

var nums = [1,2,3];
var temp = nums.shift(); 
console.log(temp); //1
console.log(nums); //[2,3]
```

## JS实现

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head) {
  // write code here
  let result = [];

  if (head === null) {
    return result;
  }

  let current = head;
  while (current != null) {
    result.unshift(current.val);
    current = current.next;
  }
  return result;
}
```

## Go实现

```go
package main

import (
  "container/list"
  "fmt"
)

type ListNode struct {
  Val  int
  Next *ListNode
}

func printList(head *ListNode) {
  curr := head
  for curr != nil {
    fmt.Println(curr.Val)
    curr = curr.Next
  }
}

func main() {
  node1 := ListNode{Val: 1}
  node2 := ListNode{Val: 2}
  node3 := ListNode{Val: 3}
  node1.Next = &node2
  node2.Next = &node3

  printList(&node1)

  // fmt.Println(reversePrint(&node1))
  // fmt.Println(reversePrint1(&node1))
  // fmt.Println(reversePrint2(&node1))
  // fmt.Println(reversePrint3(&node1))
  // fmt.Println(reversePrint4(&node1))
  // fmt.Println(reversePrint5(&node1))
}

//方法1：使用递归
func reversePrint(head *ListNode) []int {
  if head == nil {
    return nil
  }
  var helper func(head *ListNode) []int

  helper = func(head *ListNode) []int {
    if head.Next != nil {
      list := helper(head.Next)
      list = append(list, head.Val)
      return list
    }

    return []int{head.Val}
  }

  return helper(head)
}

// 递归简写
func reversePrint1(head *ListNode) []int {
  if head == nil {
    return []int{}
  }

  return append(reversePrint2(head.Next), head.Val)
}

//方法2：先反转链表，再遍历反转后的链表，添加到数组中
func reversePrint2(head *ListNode) []int {
  if head == nil {
    return nil
  }

  var newHead *ListNode
  for head != nil {
    next := head.Next
    head.Next = newHead
    newHead = head
    head = next
  }
  
  res := []int{}
  for newHead != nil {
    res = append(res, newHead.Val)
    newHead = newHead.Next
  }

  return res
}

//方法3: 反转数组
func reversePrint3(head *ListNode) []int {
  if head == nil {
    return nil
  }

  res := []int{}
  for head != nil {
    res = append(res, head.Val)
    head = head.Next
  }

  for i, j := 0, len(res)-1; i < j; {
    res[i], res[j] = res[j], res[i]
    i++
    j--
  }

  return res
}

//方法4: 使用栈
func reversePrint4(head *ListNode) []int {
  if head == nil {
    return nil
  }

  res := list.New()
  for head != nil {
    res.PushFront(head.Val)
    head = head.Next
  }

  ret := []int{}
  for e := res.Front(); e != nil; e = e.Next() {
    ret = append(ret, e.Value.(int))
  }

  return ret
}

//方法5: 遍历两次
func reversePrint5(head *ListNode) []int {
  if head == nil {
    return nil
  }

  count := 0
  newHead := head
  for head != nil {
    count++
    head = head.Next
  }

  res := make([]int, count)
  i := 0
  for newHead != nil {
    res[count-i-1] = newHead.Val
    i++
    newHead = newHead.Next
  }

  return res
}
```

## 原文

https://segmentfault.com/a/1190000021864310