---
title: "17.树的子结构"
thumbnail: ""
date: 2021-03-10T10:29:01+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: 'swordoffer'
draft: true
---


## 题目

输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function HasSubtree(root1, root2) {
  // write code here
  if (root1 === null || root2 === null) {
    return false;
  }
  let result = false;
  if (root1.val === root2.val) {
    result = helper(root1, root2);
  }
  if (!result) {
    result = helper(root1.left, root2);
  }
  if (!result) {
    result = helper(root1.right, root2);
  }
  return result;
}

function helper(r1, r2) {
  if (r2 === null) return true;
  if (r1 === null) return false;
  if (r1.val != r2.val) return false;
  return helper(r1.left, r2.left) && helper(r1.right, r2.right);
}
```

## More

关于剑指Offer 树的子结构的讨论  
https://blog.csdn.net/qinian_ztc/article/details/104731375

面试题26. 树的子结构（先序遍历 + 包含判断，清晰图解）  
https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/solution/mian-shi-ti-26-shu-de-zi-jie-gou-xian-xu-bian-li-p/
