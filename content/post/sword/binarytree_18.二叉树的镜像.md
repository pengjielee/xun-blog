---
title: "18.二叉树的镜像"
thumbnail: ""
date: 2021-03-07T20:36:23+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: 'swordoffer'
draft: true
---

## 题目

操作给定的二叉树，将其变换为源二叉树的镜像。

输入描述: 二叉树的镜像定义  

```
//源二叉树 
    8
   /  \
  6   10
 / \  / \
5  7 9 11

//镜像二叉树
    8
   /  \
  10   6
 / \  / \
11 9 7  5
```

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function Mirror(root) {
  // write code here
  if (root === null) {
    return;
  }
  if (root.left === null && root.right === null) {
    return;
  }
  let temp = root.right;
  root.right = root.left;
  root.left = temp;
  Mirror(root.left);
  Mirror(root.right);
}
```
