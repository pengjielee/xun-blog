---
title: "实现Promise.race()"
date: 2021-03-31T11:45:06+08:00
keywords: ''
description: ''
tags: ['code']
categories: ''
draft: true
---

## 语法

```javascript
Promise.race(iterable);
```

参数：  

iterable  
可迭代对象，类似Array。  

返回值：  

一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值，从而异步地解析或拒绝（一旦堆栈为空）。

## 理解

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

理解1：
```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2]).then((value) => {
  console.log(value);
  // Both resolve, but p2 is faster
});
// expected output: "two"
```

理解2：
```javascript
var p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, "three");
});
var p4 = new Promise(function(resolve, reject) {
    setTimeout(reject, 500, "four");
});

Promise.race([p3, p4]).then(function(value) {
  console.log(value); // "three"
  // p3 更快，所以它完成了
}, function(reason) {
  // 未被调用
});
```

理解3：
```javascript
var p5 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, "five");
});
var p6 = new Promise(function(resolve, reject) {
    setTimeout(reject, 100, "six");
});

Promise.race([p5, p6]).then(function(value) {
  // 未被调用
}, function(reason) {
  console.log(reason); // "six"
  // p6 更快，所以它失败了
});
```

理解4：
```javascript
// we are passing as argument an array of promises that are already resolved,
// to trigger Promise.race as soon as possible
var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

var p = Promise.race(resolvedPromisesArray);
// immediately logging the value of p
console.log(p);

// using setTimeout we can execute code after the stack is empty
setTimeout(function(){
    console.log('the stack is now empty');
    console.log(p);
});

// logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: 33 }
```

Promise.race 的特点：

1. Promise.race返回的仍然是一个Promise.
它的状态与第一个完成的Promise的状态相同。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个Promise是哪一种状态。
2. 如果传入的参数是不可迭代的，那么将会抛出错误。
3. 如果传的参数数组是空，那么返回的 promise 将永远等待。
4. 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

## 实现

```javascript
Promise._race = function (promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== "function") {
      Promise.reject("args is not iteratable!");
    }

    if (promises.length === 0) {
      return;
    } else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(
          promises[i].then(
            (data) => {
              resolve(data);
              return;
            },
            (err) => {
              reject(err);
              return;
            }
          )
        );
      }
    }
  });
};
```

## More

Promise.race()   
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race   

“你能手写一个 Promise 吗”  
https://zhuanlan.zhihu.com/p/183801144

如何实现 Promise.race  
https://github.com/YvetteLau/Blog/issues/13