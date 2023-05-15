---
title: "JavaScript变量声明提升"
date: 2021-04-02T11:38:41+08:00
keywords: ''
description: ''
tags: ['javascript']
categories: ''
draft: true
---

## 1、

```javascript
console.log(x === undefined); // true
var x = 3;
```

解释：

```javascript
var x;
console.log(x === undefined); // true
x = 3;
```

## 2、

```javascript
// will return a value of undefined
var myvar = 'my value';

(function() {
  console.log(myvar); // undefined
  var myvar = 'local value';
})();
```

解释：

```javascript
var myvar = 'my value';

(function() {
  var myvar;
  console.log(myvar); // undefined
  myvar = 'local value';
})();
```

## 3、

```javascript
function foo() {
  console.log(x); // undefined
  var x = 12;
  console.log(x); // 12
}
foo();
```

解释：

```javascript
function foo() {
  var x;
  console.log(x); // undefined
  x = 12;
  console.log(x); // 12
}
foo();
```

## 4、

```javascript
var x = 123;
function foo() {
  console.log(x); // undefined
  var x = 12;
  console.log(x); // 12
}
foo();
console.log(x); // 123，这里之所以结果为123，是因为在函数内声明的变量x虽然与函数外同名，但由于是在函数内且用关键字var来声明的，所以函数内的x只是一个局部变量，函数外无法访问到
```

## 5、在函数内变量声明前使用return关键字

```javascript
function too() {
  console.log(y + "*"); // undefined*
  y = 10;
  console.log(y + "**"); // 10**
  return; // 函数内return后的语句不会执行
  console.log(y + "***");
  var y = 2;
  console.log(y + "****");
}
too();
```

解释：

```javascript
function too() {
  var y;
  console.log(y + "*"); // undefined*
  y = 10;
  console.log(y + "**"); // 10**
}
too();
```

## 6、for语句内声明变量

```javascript
for(var i = 0;i < 5; i++){}
console.log(i)  // 5
```

## 7、if语句内声明变量

```javascript
if(100){
  var x = 30;
}
console.log(x);  // 30
```

## 8、在if语句内声明一个与外部同名的变量

```javascript
var x = 123;
if (100) {
  var x = 30;
}
console.log(x); // 30

var x = 123;
if (0) {
  var x = 30;
}
console.log(x); // 123
```

## More

MDN Variable hoisting  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_hoisting   

JavaScript变量声明与提升    
https://www.cnblogs.com/jf-67/p/8034957.html
