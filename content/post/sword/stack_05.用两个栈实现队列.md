---
title: "05.用两个栈实现队列"
url: "post/use-two-stacks-to-implement-the-queue"
date: 2021-03-01T13:39:21+08:00
keywords: ''
description: ''
tags: ['Stack','queue']
categories: 'swordoffer'
draft: true
---

## 题目

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

## 详解

队列的特性是：“先进先出”，栈的特性是：“先进后出”。

```
当我们向模拟的队列插入数 a,b,c 时，假设插入的是 stack1，此时的栈情况为：   
栈 stack1：{a,b,c}  
栈 stack2：{} 

当需要弹出一个数，根据队列的"先进先出"原则，a 先进入，则 a 应该先弹出。但是此时 a 在 stack1 的最下面，将 stack1 中全部元素逐个弹出压入 stack2，现在可以正确的从 stack2 中弹出 a，此时的栈情况为：  
栈 stack1：{}  
栈 stack2：{c,b}  

继续弹出一个数，b 比 c 先进入"队列"，b 弹出，注意此时 b 在 stack2 的栈顶，可直接弹出，此时的栈情况为：  
栈 stack1：{}  
栈 stack2：{c}  

此时向模拟队列插入一个数 d，还是插入 stack1，此时的栈情况为：  
栈 stack1：{d}   
栈 stack2：{c}   

弹出一个数，c 比 d 先进入，c 弹出，注意此时 c 在 stack2 的栈顶，可直接弹出，此时的栈情况为：  
栈 stack1：{d}  
栈 stack2：{}  
```

根据上述例子可得出结论：  
- 当插入时，直接插入 stack1；  
- 当弹出时，当 stack2 不为空，弹出 stack2 栈顶元素，如果 stack2 为空，将 stack1 中的全部数逐个出栈入栈 stack2，再弹出 stack2 栈顶元素； 

链接：https://www.nowcoder.com/questionTerminal/54275ddae22f475981afa2244dd448c6?answerType=1&f=discussion  
来源：牛客网

## JS实现

```javascript
var stack1 = [];
var stack2 = [];

function push(node) {
  // write code here
  stack1.push(node);
}
function pop() {
  // write code here
  if (stack2.length <= 0) {
    while (stack1.length != 0) {
      stack2.push(stack1.pop());
    }
  }
  return stack2.pop();
}
```

## Go实现

```go
package main

import (
	"fmt"
)

type Stack struct {
	element []int
}

func NewStack(cap int) *Stack {
	return &Stack{
		element: make([]int, 0, cap),
	}
}

func (s *Stack) Len() int {
	return len(s.element)
}

func (s *Stack) Push(elem int) {
	s.element = append(s.element, elem)
}

func (s *Stack) Pop() int {
	if len(s.element) == 0 {
		return 0
	}
	tmp := s.element[len(s.element)-1]
	s.element = s.element[:len(s.element)-1]
	return tmp
}

// 用两个stack，作一个队列
type Queue struct {
	stack1 *Stack
	stack2 *Stack
}

func NewQueue(cap int) *Queue {
	return &Queue{
		stack1: NewStack(cap),
		stack2: NewStack(cap),
	}
}
func (q Queue) Push(elem int) {
	q.stack1.Push(elem)
}

func (q Queue) Pop() int {
	if q.stack2.Len() <= 0 {
		for q.stack1.Len() > 0 {
			q.stack2.Push(q.stack1.Pop())
		}
	}
	return q.stack2.Pop()
}

func main() {
	stack := NewStack(10)

	stack.Push(5)
	stack.Push(6)

	fmt.Println(stack.Pop()) //6
	fmt.Println(stack.Pop()) //5

	queue := NewQueue(10)

	queue.Push(5)
	queue.Push(6)
	queue.Push(7)

	fmt.Println(queue.Pop()) //5
	fmt.Println(queue.Pop()) //6

	queue.Push(8)

	fmt.Println(queue.Pop()) //7
	fmt.Println(queue.Pop()) //8
}
```