---
title: "20.包含min函数的栈"
url: "post/the-stack-containing-the-min-function"
date: 2021-03-01T10:15:31+08:00
keywords: ''
description: ''
tags: ['Stack']
categories: 'swordoffer'
draft: true
---


## 题目

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。  

注意：保证测试中不会当栈为空的时候，对栈调用pop()或者min()或者top()方法。

## 详解

利用一个辅助栈来存放最小值；  
每入栈一次，就与辅助栈顶比较大小，如果小就入栈，如果大就入栈当前的辅助栈顶；  
当出栈时，辅助栈也要出栈；  

## JS实现

```javascript
var stack1 = [];
var stack2 = []; // 辅助栈，存最小值

function push(node) {
  // write code here
  stack1.push(node);
  if (stack2.length === 0) {
    stack2.push(node);
  } else {
    var peak2 = stack2[stack2.length - 1]; //栈顶元素
    if (node <= peak2) {
      stack2.push(node);
    } else {
      stack2.push(peak2);
    }
  }
}
function pop() {
  // write code here
  stack1.pop();
  stack2.pop();
}
function top1() {
  // write code here
  if (stack1.length > 0) {
    return stack1[stack1.length - 1];
  }
  return null;
}
function min() {
  // write code here
  if (stack2.length > 0) {
    return stack2[stack2.length - 1];
  }
  return null;
}
```

## Go实现

```go
package main

import (
  "fmt"
  "math"
)

type MinStack struct {
  stack    []int
  minStack []int
}

func NewMinStack() *MinStack {
  return &MinStack{
    stack:    []int{},
    minStack: []int{math.MaxInt64},
  }
}
func (ms *MinStack) Push(x int) {
  ms.stack = append(ms.stack, x)
  top := ms.minStack[len(ms.minStack)-1]
  ms.minStack = append(ms.minStack, min(x, top))
}

func (ms *MinStack) Pop() {
  ms.stack = ms.stack[:len(ms.stack)-1]
  ms.minStack = ms.minStack[:len(ms.minStack)-1]
}

func (ms *MinStack) Top() int {
  return ms.stack[len(ms.stack)-1]
}

func (ms *MinStack) Min() int {
  return ms.minStack[len(ms.minStack)-1]
}

func min(x, y int) int {
  if x < y {
    return x
  }
  return y
}

func main() {
  ms := NewMinStack()
  ms.Push(2)
  ms.Push(5)
  fmt.Println(ms.Min()) //2
  ms.Push(8)
  ms.Push(1)
  fmt.Println(ms.Min()) //1
  ms.Pop()
  fmt.Println(ms.Min()) //2
}
```
