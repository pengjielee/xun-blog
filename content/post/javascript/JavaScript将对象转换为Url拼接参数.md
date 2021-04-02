---
title: "JavaScript将对象转换为Url拼接参数"
url: "post/javascript-converts-the-object-into-a-url-concatenation-parameter"
date: 2021-02-20T16:22:28+08:00
keywords: '对象转换'
description: ''
tags: ['Code','JavaScript']
categories: []
draft: false
---

## 将对象转换为Url拼接参数

```javascript
const obj2str = obj => {
  let arr = Object.entries(obj);
  arr.forEach((value, index) => {
    arr[index] = value.join('=');
  });
  return arr.join('&');
};
```

实例：
```javascript
var data  = { "name": "jie", "age" : 20 };
console.log(obj2str(data)); //output: name=jie&age=20
```

## 扩展

1、 Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组。

```javascript
var data  = { "name": "jie", "age" : 20 };
console.log(Object.entries(data)); 
//output: [['name','jie'], ['age', 20]]

for (const [key, value] of Object.entries(data)) {
  console.log(`${key}: ${value}`);
}
// output:
// name: jie
// age: 20
```

Object.entries()的Polyfill
```javascript
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };
}
```

2、Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。

```javascript
var data  = { "name": "jie", "age" : 20 };
console.log(Object.keys(data)); //output: ['name','age']
```

3、Object.values()方法会返回一个由一个给定对象的自身可枚举属性值组成的数组。

```javascript
var data  = { "name": "jie", "age" : 20 };
console.log(Object.values(data)); //output: ['jie',20]
```

Object.values()的Polyfill
```javascript
if (!Object.values) {
  Object.values = function (obj) {
    if (obj !== Object(obj))
      throw new TypeError("Object.values called on a non-object");
    var val = [],
      key;
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        val.push(obj[key]);
      }
    }
    return val;
  };
}

```












