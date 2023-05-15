---
title: "50.数组中重复的数字"
thumbnail: ""
date: 2021-03-12T15:17:02+08:00
keywords: ''
description: ''
tags: ['array']
categories: 'swordoffer'
draft: true
---

## 题目

在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。

## 详解

排序：将输入数组排序，再判断相邻位置是否存在相同数字，如果存在，对 duplication 赋值返回，否则继续比较

## JS实现

```javascript
function duplicate(numbers, duplication) {
  // write code here
  if (numbers.length <= 0) {
    return false;
  }

  numbers = numbers.sort();

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] === numbers[i + 1]) {
      duplication[0] = numbers[i];
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
  "sort"
)

func main() {
  nums := []int{3, 1, 0, 2, 5, 3, 5}
  fmt.Println(findRepeatNumber1(nums))
  fmt.Println(findRepeatNumber2(nums))
  fmt.Println(findRepeatNumber3(nums))
}

// 哈希法：通过数组实现哈希
func findRepeatNumber1(nums []int) int {
  temp := make([]int, len(nums))
  for _, value := range nums {
    if temp[value] == -1 {
      return value
    } else {
      temp[value] = -1
    }
  }
  return -1
}

func findRepeatNumber2(nums []int) int {
  mapper := make(map[int]int)
  for i := 0; i < len(nums); i++ {
    mapper[nums[i]]++
  }
  var res int
  for key, value := range mapper {
    if value == 2 {
      res = key
      break
    }
  }
  return res
}

func findRepeatNumber3(nums []int) int {
  sort.Ints(nums)
  var res int
  for i := 1; i < len(nums); i++ {
    if nums[i] == nums[i-1] {
      res = nums[i]
      break
    }
  }
  return res
}
```