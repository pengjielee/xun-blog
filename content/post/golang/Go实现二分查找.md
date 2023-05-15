---
title: 'Go实现二分查找'
date: 2023-03-20T13:15:55+08:00
keywords: ''
description: ''
tags: ['Go']
categories: ''
draft: true
difficulty: ''
---

## 二分查找

需要注意的三点：
1. 循环退出条件，注意是 low <= high，而不是 low < high。
2. mid 的取值，mid := low + (high-low)/2
3. low 和 high 的更新。low = mid + 1，high = mid - 1。

```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 3, 4, 6, 9}
	fmt.Println(binarySearch(s1, 6)) //3
}

func binarySearch(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] == target {
			return mid
		} else if nums[mid] > target {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

## 查找第一个与 target 相等的元素

```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 3, 4, 4, 6, 9}
	fmt.Println(binarySearch(s1, 4)) //2
}

func binarySearch(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		//如果相等
		if nums[mid] == target {
			//如果是数组第一个元素 或者 前一个元素与目标值不相等
			if mid == 0 || nums[mid-1] != target { //找到第一个与target相等的
				return mid
			}
			high = mid - 1
		} else if nums[mid] > target {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

## 查找最后一个与 target 相等的元素

```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 3, 4, 4, 6, 9}
	fmt.Println(binarySearch(s1, 4)) //3
}

func binarySearch(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] == target {
			if mid == len(nums)-1 || nums[mid+1] != target {
				return mid
			}
			low = mid + 1
		} else if nums[mid] > target {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

## 查找第一个大于等于 target 的元素

```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 3, 4, 4, 6, 9}
	fmt.Println(binarySearch(s1, 4)) //2
}

func binarySearch(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] >= target {
			if mid == 0 || nums[mid-1] < target { // 找到第一个大于等于 target 的元素
				return mid
			}
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

## 查找最后一个小于等于 target 的元素

```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 3, 4, 4, 6, 9}
	fmt.Println(binarySearch(s1, 4)) //3
}

func binarySearch(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] <= target {
			//如果是最后一个元素 或者 下一个元素大于target
			if (mid == len(nums)-1) || (nums[mid+1] > target) { // 找到最后一个小于等于 target 的元素
				return mid
			}
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1
}
```
