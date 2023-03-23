---
title: "ES6解构赋值"
date: 2021-05-20T09:31:41+08:00
keywords: ''
description: ''
tags: ['es6']
categories: []
draft: true
---

## ES6数组解构赋值

1、基本

```javascript
let [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3
```

2、嵌套

```javascript
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1, b = 2, c = 3
```

3、可忽略

```javascript
let [a, , b] = [1, 2, 3];
// a = 1, b = 2
```

4、不完全解构

```javascript
let [a = 1, b] = [];
// a = 1, b = undefined
```

5、剩余运算符

```javascript
let [a, ...b] = [1,2,3];
// a = 1, b = [2,3]
```

6、字符串

```javascript
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

7、解构默认值

```javascript
let [a = 2] = [undefined]; // a = 2
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```


## ES6对象解构

1、基本

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
```

2、可嵌套可忽略

```javascript
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
// x = 'hello'
```

3、不完全解构

```javascript
let obj = {p: [{y: 'world'}] };
let {p: [{ y }, x ] } = obj;
// x = undefined
// y = 'world'
```

4、剩余运算符

```javascript
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

5、解构默认值

```javascript
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

## Source 

ES6 解构赋值  
https://www.runoob.com/w3cnote/deconstruction-assignment.html

