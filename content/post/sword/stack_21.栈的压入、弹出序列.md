---
title: "21.栈的压入、弹出序列"
url: "post/the-sequence-of-stack-pushin-and-popout"
date: 2021-03-01T09:24:41+08:00
keywords: ''
description: ''
tags: ['Stack']
categories: 'swordoffer'
draft: true
---

## 题目

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。

假设压入栈的所有数字均不相等。

例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）


```
示例1:
输入： [1,2,3,4,5],[4,5,3,2,1]
返回： true

可以通过push(1)=>push(2)=>push(3)=>push(4)=>pop()=>push(5)=>pop()=>pop()=>pop()=>pop()
这样的顺序得到[4,5,3,2,1]这个序列，返回true     

示例2:
输出：[1,2,3,4,5],[4,3,5,1,2]
返回：false

由于是[1,2,3,4,5]的压入顺序，[4,3,5,1,2]的弹出顺序，要求4，3，5必须在1，2前压入，且1，2不能弹出，但是这样压入的顺序，1又不能在2之前弹出，所以无法形成的，返回false    
```

## 详解

借用一个辅助的栈，遍历压栈顺序，先将第一个放入栈中，这里是1，然后判断栈顶元素是不是出栈顺序的第一个元素，这里是4，很显然1≠4，所以我们继续压栈，直到相等以后开始出栈，出栈一个元素，则将出栈顺序向后移动一位，直到不相等，这样循环等压栈顺序遍历完成，如果辅助栈还不为空，说明弹出序列不是该栈的弹出顺序。

举例：  
入栈1,2,3,4,5  
出栈4,5,3,2,1  

首先1入辅助栈，此时栈顶1≠4，继续入栈2  
此时栈顶2≠4，继续入栈3  
此时栈顶3≠4，继续入栈4  
此时栈顶4＝4，出栈4，弹出序列向后一位，此时为5，辅助栈里面是1,2,3  
此时栈顶3≠5，继续入栈5  
此时栈顶5=5，出栈5，弹出序列向后一位，此时为3，辅助栈里面是1,2,3  
…  
依次执行，最后辅助栈为空。如果不为空说明弹出序列不是该栈的弹出顺序。  

链接：https://www.nowcoder.com/questionTerminal/d77d11405cc7470d82554cb392585106?f=discussion  
来源：牛客网  

## JS实现

```javascript
function IsPopOrder(pushV, popV) {
  // write code here
  if (pushV.length === 0 || popV.length === 0) {
    return false;
  }
  const stack = []; //辅助栈
  let popIndex = 0; //标识弹出序列的位置
  for (let i = 0; i < pushV.length; i++) {
    stack.push(pushV[i]);
    //如果栈不为空，且栈顶元素等于弹出序列
    while (stack.length > 0 && stack[stack.length - 1] === popV[popIndex]) {
      stack.pop(); //出栈
      popIndex++; //弹出序列后移一位
    }
  }
  return stack.length === 0;
}
```

## Go实现

```go
package main

import (
  "fmt"
)

func main() {
  fmt.Println(IsPopOrder([]int{1, 2, 3, 4, 5}, []int{4, 5, 3, 2, 1})) //true
  fmt.Println(IsPopOrder([]int{1, 2, 3, 4, 5}, []int{4, 3, 5, 1, 2})) //false
}

func IsPopOrder(pushV []int, popV []int) bool {
  var stack []int
  i := 0

  //遍历压栈序列
  for _, v := range pushV {
    //当前元素值入栈辅助栈
    stack = append(stack, v)

    //如果stack有值，并且stack的栈顶元素和弹出序列首个元素一样
    for len(stack) > 0 && stack[len(stack)-1] == popV[i] {
      //栈顶元素出栈
      stack = stack[:len(stack)-1]
      //i++，检查下一个出栈元素
      i++
    }
  }
  return len(stack) == 0
}
```

