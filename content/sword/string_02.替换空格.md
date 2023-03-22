---
title: "02.替换空格"
thumbnail: ""
date: 2021-03-10T14:15:24+08:00
keywords: ''
description: ''
tags: ['string']
categories: ['swordoffer']
draft: true
---

## 题目

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy。则经过替换之后的字符串为We%20Are%20Happy。

## JS实现

```javascript
//实现1：调用自带函数
function replaceSpace(str) {
  // write code here
  return str.replace(/\s{1}/g, "%20");
}

//实现2：用新的变量存，当遇到 " "，就追加 "%20"，否则遇到什么追加什么
function replaceSpace(str) {
  // write code here
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "%20";
    } else {
      result += str[i];
    }
  }
  return result;
}
```

## Go实现

```go
package main

import (
  "fmt"
  "strings"
)

func main() {
  str := "We are happy."
  fmt.Println(replaceSpace1(str))  //We%20are%20happy.
  fmt.Println(replaceSpace2(str)) //We%20are%20happy.
  fmt.Println(replaceSpace3(str)) //We%20are%20happy.
}

func replaceSpace1(str string) string {
  result := ""
  for _, v := range []byte(str) {
    if string(v) == " " {
      result += "%20"
    } else {
      result += string(v)
    }
  }
  return result
}

func replaceSpace2(s string) string {
  return strings.ReplaceAll(s, " ", "%20")
}

func replaceSpace3(s string) string {
  return strings.Replace(s, " ", "%20", -1)
}
```