---
title: "JavaScript函数声明提升"
date: 2021-04-02T11:38:47+08:00
keywords: ''
description: ''
tags: ['javascript']
categories: ''
draft: true
---

## 1、Function declaration

```javascript
foo(); // "bar"

function foo() {
  console.log('bar');
}
```

解释：

```javascript
function foo() {
  console.log('bar');
}
foo(); // "bar"
```


## 2、Function expression

```javascript
baz(); // TypeError: baz is not a function

var baz = function() {
  console.log('bar2');
};
```

解释：

```javascript
var baz;
baz();
baz = function() {
  console.log('bar2');
};
```

## 3、

```javascript
var foo = function(){
  console.log(123);
}

function foo(){
  console.log(456);
}
foo();  //123
```

解释：

```javascript
var foo;  // 变量声明提升
function foo(){  // 函数声明提升
  console.log(456);
}
foo = function(){  //  变量赋值依然保留在原来位置
  console.log(123);
}
foo(); 
```

## 4、

```javascript
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2

getName(); // 4

Foo().getName(); // 1  foo()执行完成后，将全局的getName也就是window.getName给更改后返回this，而在这里this执行的就是window，所以最后执行的就是window.getName，所以输出1

getName(); // 1  上面已经更改全局的getName，所以依然是1

new Foo.getName(); // 2 new 操作符在实例化构造器的时候，会执行构造器函数，也就是说，foo.getName会执行，输出2

new Foo().getName(); // 3  先new foo()得到一个实例，然后再执行实例的getName方法,这个时候，实例的构造器里没有getName方法，就会执行构造器原型上的getName方法

new new Foo().getName(); // 3
```

## More

MDN Function hoisting   
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Function_hoisting    

JavaScript函数声明提升  
https://www.cnblogs.com/jf-67/p/8036966.html

