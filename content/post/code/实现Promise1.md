---
title: "实现Promise：简洁版"
date: 2021-03-31T11:40:06+08:00
keywords: ''
description: ''
tags: ['code']
categories: []
draft: true
---

## 简洁版

```javascript
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态

  function resolve(value) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }

  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }

  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};
```

## 总结

1. promise有三种状态：pending, resolved, reject；
2. promise构造函数接收两个函数：resove(), reject()；
3. promise.then接收两个函数：onFullfilled, onRejected；



