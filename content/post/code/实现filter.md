---
title: "实现filter"
date: 2021-03-16T21:01:14+08:00
keywords: ''
description: ''
tags: ['code']
categories: []
draft: true
---

## 实现myfilter

```javascript
Array.prototype.myfilter = function (fn) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

## Test 

```javascript
var arr = [4, 5, 6, 7, 9, 10];

var result1 = arr.filter((el) => el > 5);
console.log(result1); //[6,7,9,10]

var result2 = arr.myfilter((el) => el > 5);
console.log(result2); //[6,7,9,10]
```

## Polyfill

filter 被添加到 ECMA-262 标准第 5 版中，因此在某些实现环境中不被支持。可以把下面的代码插入到脚本的开头来解决此问题，该代码允许在那些没有原生支持 filter 的实现环境中使用它。该算法是 ECMA-262 第 5 版中指定的算法，假定 fn.call 等价于 Function.prototype.call 的初始值，且 Array.prototype.push 拥有它的初始值。

```javascript
if (!Array.prototype.filter) {
  Array.prototype.filter = function (func, thisArg) {
    'use strict';
    if (!((typeof func === 'Function' || typeof func === 'function') && this))
      throw new TypeError();

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this,
      c = 0,
      i = -1;
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func(t[i], i, t)) {
            res[c++] = t[i];
          }
        }
      }
    } else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = t[i];
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}
```

## More

MDN 
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter



