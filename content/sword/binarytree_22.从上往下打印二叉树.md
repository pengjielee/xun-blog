---
title: "22.从上往下打印二叉树"
thumbnail: ""
date: 2021-03-07T20:38:36+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: ['swordoffer']
draft: true
---


## 题目

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function PrintFromTopToBottom(root) {
  // write code here
  let result = [];
  if (root === null) {
    return result;
  }

  let q = [];
  q.push(root);

  while (q.length != 0) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      result.push(node.val);
      if (node.left != null) {
        q.push(node.left);
      }
      if (node.right != null) {
        q.push(node.right);
      }
    }
  }
  return result;
}
```
