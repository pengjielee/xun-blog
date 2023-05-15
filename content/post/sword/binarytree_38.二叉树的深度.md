---
title: "38.二叉树的深度"
thumbnail: ""
date: 2021-03-07T20:39:44+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: 'swordoffer'
draft: true
---

## 题目

输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function TreeDepth(pRoot) {
  // write code here
  if (pRoot == null) {
    return 0;
  }
  const left = TreeDepth(pRoot.left);
  const right = TreeDepth(pRoot.right);
  return Math.max(left, right) + 1;
}
```

## More

牛客网题解  
https://www.nowcoder.com/questionTerminal/435fb86331474282a3499955f0a41e8b?f=discussion

