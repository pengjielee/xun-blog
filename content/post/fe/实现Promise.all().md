---
title: "实现Promise.all()"
date: 2021-03-31T11:46:06+08:00
keywords: ''
description: ''
tags: ['code']
categories: ''
draft: true
---

## 语法

```javascript
Promise.all(iterable);
```

参数：

iterable  
一个可迭代对象，如 Array 或 String。

返回值：

- 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise。
- 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise。注意：Google Chrome 58 在这种情况下返回一个已完成（already resolved）状态的 Promise。
- 其它情况下返回一个处理中（pending）的Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败。

说明：

- 完成（Fulfillment）：

如果传入的可迭代对象为空，Promise.all 会同步地返回一个已完成（resolved）状态的promise。

如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。

在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。

- 失败/拒绝（Rejection）：

如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。


## 实现

```javascript
Promise._all = function (promises) {
  // promises 是可迭代对象，省略参数合法性检查
  return new Promise((resolve, reject) => {
    // Array.from 将可迭代对象转换成数组
    promises = Array.from(promises);
    if (promises.length === 0) {
      resolve([]);
    } else {
      let result = [],
        index = 0;
      for (let i = 0; i < promises.length; i++) {
        // 考虑到i可能是thenable对象也可能是普通值
        Promise.resolve(promises[i]).then(
          (data) => {
            result[i] = data;
            if (++index === promises.length) {
              // 所有的promises状态都是fulfilled，promise.all返回的实例才变成fulfilled态
              resolve(result);
            }
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
```

## Test

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(4), 2000);
});

Promise._all([p1, p2]).then((res) => {
  console.log(res); // [2,4]
});
```

## 总结

1. 接收参数是一个promises列表；
    promises.length === 0，resolve([]);
2. 返回的是一个promise实例；
  所有promise都是resolve，resolve(result);


## More

Promise.all()   
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all


