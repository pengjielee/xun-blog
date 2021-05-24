---
title: "ES6之Number"
date: 2021-05-20T10:18:22+08:00
keywords: ''
description: ''
tags: ['es6']
categories: []
draft: true
---

## Number.MAX_SAFE_INTEGER

Number.MAX_SAFE_INTEGER 常量表示在 JavaScript 中最大的安全整数（maxinum safe integer)（2^53 - 1）

```javascript
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Math.pow(2,53) - 1); //9007199254740991
```

## Number.MIN_SAFE_INTEGER

Number.MIN_SAFE_INTEGER 代表在 JavaScript中最小的安全的integer型数字 (-(2^53 - 1)).

```javascript
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991
console.log(-(Math.pow(2,53) - 1)); //-9007199254740991
```

2^53 是 js 内置的最大的整数值（不安全），2^53 + 1 会被舍入成 2^53：
```javascript
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
```

## Number.isSafeInteger()

Number.isSafeInteger() 方法用来判断传入的参数值是否是一个“安全整数”（safe integer）。

一个安全整数是一个符合下面条件的整数：

- 可以准确地表示为一个IEEE-754双精度数字,
- 其IEEE-754表示不能是舍入任何其他整数以适应IEEE-754表示的结果。

安全整数范围为 -(2^53 - 1)到 2^53 - 1 之间的整数，包含 -(2^53 - 1)和 2^53 - 1。

```javascript
Number.isSafeInteger(3);                    // true
Number.isSafeInteger(Math.pow(2, 53))       // false
Number.isSafeInteger(Math.pow(2, 53) - 1)   // true
Number.isSafeInteger(NaN);                  // false
Number.isSafeInteger(Infinity);             // false
Number.isSafeInteger("3");                  // false
Number.isSafeInteger(3.1);                  // false
Number.isSafeInteger(3.0);                  // true
```

Polyfill
```javascript
Number.isSafeInteger =
  Number.isSafeInteger ||
  function (value) {
    return (
      Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER
    );
  };
```

