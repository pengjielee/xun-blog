---
title: 'Go递归遍历二叉树'
date: 2023-03-20T17:31:02+08:00
keywords: ''
description: ''
tags: ['Go']
categories: []
draft: true
difficulty: ''
---


```go
type TreeNode struct {
    Val int
    Left *TreeNode
    Right *TreeNode
}
```


## 前序遍历

```go
func preorderTraversal(root *TreeNode) []int {
	var result []int
	preorder(root, &result)
	return result
}

func preorder(root *TreeNode, output *[]int) {
	if root != nil {
		*output = append(*output, root.Val)
		preorder(root.Left, output)
		preorder(root.Right, output)
	}
}
```

## 中序遍历

```go
func inorderTraversal(root *TreeNode) []int {
	var result []int
	inorder(root, &result)
	return result
}

func inorder(root *TreeNode, output *[]int) {
	if root != nil {
		inorder(root.Left, output)
		*output = append(*output, root.Val)
		inorder(root.Right, output)
	}
}
```

## 后序遍历

```go
func postorderTraversal(root *TreeNode) []int {
	var result []int
	postorder(root, &result)
	return result
}

func postorder(root *TreeNode, output *[]int) {
	if root != nil {
		postorder(root.Left, output)
		postorder(root.Right, output)
		*output = append(*output, root.Val)
	}
}
```