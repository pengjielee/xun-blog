---
title: "58.对称的二叉树"
thumbnail: ""
date: 2021-03-07T20:40:31+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: ['swordoffer']
draft: true
---

## 题目

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function isSymmetrical(pRoot) {
  // write code here
  return isSymmetricalTree(pRoot, pRoot);
}

function isSymmetricalTree(node1, node2) {
  //判断两个节点都是否为空
  if (!node1 && !node2) {
    return true;
  }
  //判断两个节点是否存在一个为空
  if (!node1 || !node2) {
    return false;
  }
  //判断两个节点是否相同
  if (node1.val != node2.val) {
    return false;
  }
  return (
    isSymmetricalTree(node1.left, node2.right) &&
    isSymmetricalTree(node1.right, node2.left)
  );
}
```