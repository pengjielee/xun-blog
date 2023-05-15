---
title: "实现Promise.finally()"
date: 2021-03-31T11:46:06+08:00
keywords: ''
description: ''
tags: ['code']
categories: ''
draft: true
---

finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。  
这避免了同样的语句需要在then()和catch()中各写一次的情况。

## 语法

```javascript
p.finally(onFinally);

p.finally(function() {
   // 返回状态为(resolved 或 rejected)
});
```

## 实现

```javascript
Promise.prototype._finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

## More

Promise.prototype.finally()  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally   

Promise.prototype.finally()  
https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-finally   