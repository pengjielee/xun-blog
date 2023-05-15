---
title: 'Go合并数组和链表'
date: 2023-03-20T17:46:59+08:00
keywords: ''
description: ''
tags: ['Go']
categories: ''
draft: true
difficulty: ''
---


## 合并两个有序数组

```go
/*
nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
*/
func mergeArr(nums1 []int, m int, nums2 []int, n int) {
	p := m - 1
	q := n - 1
	k := len(nums1) - 1
	for p >= 0 && q >= 0 {
		if nums1[p] > nums2[q] {
			nums1[k] = nums1[p]
			p -= 1
		} else {
			nums1[k] = nums2[q]
			q -= 1
		}
		k -= 1
	}

	for q >= 0 {
		nums1[k] = nums2[q]
		q -= 1
		k -= 1
	}
}
```


## 合并两个有序链表

```go
type Node struct {
	data interface{}
	next *Node
}

func mergeList(l1 *Node, l2 *Node) *Node {
	if l1 == nil {
		return l2
	}
	if l2 == nil {
		return l1
	}

	var l3 = &Node{}

	var current = l3
	for l1 != nil && l2 != nil {
		if l1.data.(int) <= l2.data.(int) {
			current.next = l1
			l1 = l1.next
		} else {
			current.next = l2
			l2 = l2.next
		}
		current = current.next
	}

	if l1 != nil {
		current.next = l2
	}
	if l2 != nil {
		current.next = l1
	}
	return l3.next
}
```