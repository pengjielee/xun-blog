---
title: "06.旋转数组的最小数字"
thumbnail: ""
date: 2021-03-10T14:18:18+08:00
keywords: ''
description: ''
tags: ['array']
categories: 'swordoffer'
draft: true
---

## 题目

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。

例如数组 {3,4,5,1,2} 为 {1,2,3,4,5} 的一个旋转，该数组的最小值为1。

原来的：{1,2,3,4,5}  
旋转后：{3,4,5,1,2}  

NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

## 详解

旋转之后的数组实际上可以划分成两个有序的子数组：前面子数组的值 都大于 后面子数组中的元素。

注意到实际上最小的元素就是两个子数组的分界线。本题目给出的数组一定程度上是排序的，因此我们试着用二分查找法寻找这个最小的元素。

思路：

1. 我们用两个指针left，right分别指向数组的第一个元素和最后一个元素。

按照题目的旋转的规则，第一个元素应该是大于最后一个元素的没. 重复的元素）。
但是如果不是旋转，第一个元素肯定小于最后一个元素。

2. 找到数组的中间元素。

- 中间元素大于第一个元素，则中间元素位于前面的递增子数组，此时最小元素位于中间元素的后面。我们可以让第一个指针left指向中间元素。
移动之后，第一个指针仍然位于前面的递增数组中。
- 中间元素小于第一个元素，则中间元素位于后面的递增子数组，此时最小元素位于中间元素的前面。我们可以让第二个指针right指向中间元素。
移动之后，第二个指针仍然位于后面的递增数组中。
这样可以缩小寻找的范围。

3. 按照以上思路，第一个指针left总是指向前面递增数组的元素，第二个指针right总是指向后面递增的数组元素。

最终第一个指针将指向前面数组的最后一个元素，第二个指针指向后面数组中的第一个元素。
也就是说他们将指向两个相邻的元素，而第二个指针指向的刚好是最小的元素，这就是循环的结束条件。

到目前为止以上思路很耗的解决了没有重复数字的情况，这一道题目添加上了这一要求，有了重复数字。

因此这一道题目比上一道题目多了些特殊情况：  
我们看一组例子：｛1，0，1，1，1｝ 和 ｛1，1， 1，0，1｝   都可以看成是递增排序数组｛0，1，1，1，1｝的旋转。  
这种情况下我们无法继续用上一道题目的解法，去解决这道题目。因为在这两个数组中，第一个数字，最后一个数字，中间数字都是1。  

第一种情况下，中间数字位于后面的子数组，第二种情况，中间数字位于前面的子数组。

因此当两个指针指向的数字和中间数字相同的时候，我们无法确定中间数字1是属于前面的子数组（绿色表示）还是属于后面的子数组（紫色表示）。
也就无法移动指针来缩小查找的范围。

牛客网  
https://www.nowcoder.com/questionTerminal/9f3231a991af4f55b95579b44b7a01ba?f=discussion  

## JS实现

```javascript
function minNumberInRotateArray(rotateArray) {
  // write code here
  const len = rotateArray.length;

  if (len === 0) {
    return 0;
  }

  let low = 0;
  let high = len - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    //(1)中间元素大于最后一个元素，则中间元素位于前面的递增子数组，low=mid+1，缩小左边界
    //(2)中间元素等于最后一个元素，则中间元素位于后面的递增子数组，high=high-1，缩小右边界
    //(3)中间元素小于最后一个元素，则中间元素位于后面的递增子数组，我们直接让high=mid，缩小右边界
    if (rotateArray[mid] > rotateArray[high]) {
      low = mid + 1;   //(1)
    } else if (rotateArray[mid] == rotateArray[high]) {
      high = high - 1; //(2)
    } else {
      high = mid;      //(3)
    }
  }
  return rotateArray[low];
}
```

## Go实现

```go
package main

import (
  "fmt"
)

func main() {
  nums := []int{3, 4, 5, 1, 2}
  fmt.Println(minArray(nums))
}
func minArray(arr []int) int {
  low := 0
  high := len(arr) - 1

  for low < high {
    mid := low + (high-low)/2

    if arr[mid] < arr[high] {
      high = mid
    } else if arr[mid] > arr[high] {
      low = mid + 1
    } else {
      high--
    }
  }
  return arr[low]
}
```

## More

《剑指offer》— JavaScript（6）旋转数组的最小数字
https://www.cnblogs.com/t1amo/p/7107181.html
