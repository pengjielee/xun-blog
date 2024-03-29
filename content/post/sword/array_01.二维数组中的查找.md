---
title: "01.二维数组中的查找"
thumbnail: ""
date: 2021-03-10T10:31:53+08:00
keywords: ''
description: ''
tags: ['array']
categories: 'swordoffer'
draft: true
---

## 题目

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```
[ 
  [1, 2, 3], 
  [4, 5, 6],
  [7, 8, 9]
]
```

## 详解

1. 暴力法

挨个遍历数组，如果找到就返回 true

时间复杂度：O(n^2)
空间复杂度：O(1)

2. 从左下找

利用该二维数组的性质：
- 每一行都按照从左到右递增的顺序排序，
- 每一列都按照从上到下递增的顺序排序

换个说法，即对于左下角的值 m，m 是该行最小的数，是该列最大的数

每次将 m 和目标值 target 比较：
- 当 m < target，由于 m 已经是该行最大的元素，想要更大只有从列考虑，取值右移一位
- 当 m > target，由于 m 已经是该列最小的元素，想要更小只有从行考虑，取值上移一位
- 当 m = target，找到该值，返回 true

用某行最小或某列最大与 target 比较，每次可剔除一整行或一整列。

时间复杂度：O(行高 + 列宽)
空间复杂度：O(1)

3. 从右上找

和从左下找道理一样，都是因为每次判断都能剔除一整行或一整列

时间复杂度：O(行高 + 列宽)
空间复杂度：O(1)

链接：https://www.nowcoder.com/questionTerminal/abc3fe2ce8e146608e868a70efebf62e?answerType=1&f=discussion
来源：牛客网

## JS实现

```javascript
//暴力法
function Find(target, array) {
  // write code here
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == target) {
        return true;
      }
    }
  }
  return false;
}

//从左下找
function Find(target, array) {
  // write code here
  let rows = array.length;
  if (rows === 0) {
    return false;
  }
  let cols = array[0].length;
  if (cols.length === 0) {
    return false;
  }
  // 左下
  let row = rows - 1;
  let col = 0;
  while (row >= 0 && col < cols) {
    if (array[row][col] < target) {
      col++;
    } else if (array[row][col] > target) {
      row--;
    } else {
      return true;
    }
  }
  return false;
}

//从右上找
function Find(target, array) {
  // write code here
  let rows = array.length;
  if (rows === 0) {
    return false;
  }
  let cols = array[0].length;
  if (cols.length === 0) {
    return false;
  }
  // 右上
  let row = 0;
  let col = cols - 1;
  while (row < rows && col >= 0) {
    if (array[row][col] < target) {
      row++;
    } else if (array[row][col] > target) {
      col--;
    } else {
      return true;
    }
  }
  return false;
}
```

## Go实现

```go
package main

import (
  "fmt"
)

func main() {
  

  //创建二维数组
  // [
  //  [1 2 3 4 5]
  //  [6 7 8 9 10]
  //  [11 12 13 14 15]
  //  [16 17 18 19 20]
  // ]
  arr := [4][5]int{}
  num := 1
  for i := 0; i < 4; i++ {
    for j := 0; j < 5; j++ {
      arr[i][j] = num
      num++
    }
  }

  //创建二维数组的另一种方式
  // arr := [3][4]int{
  //  {0, 1, 2, 3},   /*  第一行索引为 0 */
  //  {4, 5, 6, 7},   /*  第二行索引为 1 */
  //  {8, 9, 10, 11}, /* 第三行索引为 2 */
  // }

  fmt.Println(Find(arr, 1))  //true
  fmt.Println(Find(arr, 10)) //true
  fmt.Println(Find(arr, 21)) //false
}

func Find(arr [4][5]int, target int) bool {
  //获取二维数组的行数
  rows := len(arr)
  if rows == 0 {
    return false
  }

  //获取二维数组的列数
  cols := len(arr[0])
  if cols == 0 {
    return false
  }

  // 从左下开始查找（最后一行，最左一列）
  row := rows - 1
  col := 0
  for row >= 0 && col < cols {
    //如果当前值比目标值小，则往右找
    if arr[row][col] < target {
      col++ //右边的都比左边大
    } else if arr[row][col] > target { //如果当前值比目标值大，则往上找
      row-- //上边的都比下边小
    } else {
      return true
    }
  }
  return false
}
```

