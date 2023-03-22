---
title: "04.重建二叉树"
thumbnail: ""
date: 2021-03-10T11:33:30+08:00
keywords: ''
description: ''
tags: ['BinaryTree']
categories: ['swordoffer']
draft: true
---

## 题目

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。


## 详解

前序：根->左->右 {1,2,4,7,3,5,6,8}
中序：左->根->右 {4,7,2,1,5,3,8,6}

根据中序遍历和前序遍历可以确定二叉树，具体过程为：
1. 根据前序序列第一个结点确定根结点；
2. 根据根结点在中序序列中的位置分割出左右两个子序列；
3. 对左子树和右子树分别递归使用同样的方法继续分解；

例如：
前序序列{1,2,4,7,3,5,6,8} = pre
中序序列{4,7,2,1,5,3,8,6} = in
1. 根据当前前序序列的第一个结点确定根结点，为 1
2. 找到 1 在中序遍历序列中的位置，为 in[3]
3. 切割左右子树，则 in[3] 前面的为左子树， in[3] 后面的为右子树
4. 则切割后的左子树前序序列为：{2,4,7}，切割后的左子树中序序列为：{4,7,2}；切割后的右子树前序序列为：{3,5,6,8}，切割后的右子树中序序列为：{5,3,8,6}
5. 对子树分别使用同样的方法分解

链接：https://www.nowcoder.com/questionTerminal/8a19cbe657394eeaac2f6ea9b0f6fcf6?answerType=1&f=discussion
来源：牛客网

## JS实现

```javascript
/* function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} */
function reConstructBinaryTree(pre, vin) {
  // write code here
  if (pre.length === 0 || vin.length === 0) {
    return null;
  }
  //前序的第一个节点为根节点
  let root = new TreeNode(pre[0]);

  //在中序中找到根节点
  for (let i = 0; i < vin.length; i++) {
    if (vin[i] === pre[0]) {
      root.left = reConstructBinaryTree(pre.slice(1, i + 1), vin.slice(0, i));
      root.right = reConstructBinaryTree(
        pre.slice(i + 1, pre.length),
        vin.slice(i + 1, vin.length)
      );
      break;
    }
  }
  return root;
}
```
