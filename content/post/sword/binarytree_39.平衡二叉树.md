---
title: "39.平衡二叉树"
thumbnail: ""
date: 2021-03-07T20:39:58+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: 'swordoffer'
draft: true
---

## 题目

输入一棵二叉树，判断该二叉树是否是平衡二叉树。  

平衡二叉树一般指平衡树。  
平衡树(Balance Tree，BT) 指的是，任意节点的子树的高度差都小于等于1。

## 详解

```java
/* 
 * 链接：https://www.nowcoder.com/questionTerminal/8b3b95850edb4115918ecebdf1b4d222?f=discussion
 * 来源：牛客网
 */

public class Solution {
  public boolean IsBalanced_Solution(TreeNode root) {
    return getDepth(root) != -1;
  }
   
  private int getDepth(TreeNode root) {
    if (root == null) return 0;
    int left = getDepth(root.left);
    if (left == -1) return -1;
    int right = getDepth(root.right);
    if (right == -1) return -1;
    return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right);
  }
}
```

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function IsBalanced_Solution(pRoot) {
  // write code here
  return getDepth(pRoot) != -1;
}

function getDepth(root) {
  if (root === null) {
    return 0;
  }
  let left = getDepth(root.left);
  if (left === -1) {
    return -1;
  }
  let right = getDepth(root.right);
  if (right === -1) {
    return -1;
  }
  return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right);
}
```