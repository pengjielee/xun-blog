---
title: "LocalStorage设置过期时间"
url: "post/localstorage-set-the-expiration-time"
thumbnail: "https://i.loli.net/2021/03/01/RPWSKZDHbu63QmV.jpg"
date: 2021-03-03T13:15:09+08:00
keywords: ''
description: ''
tags: []
categories: ['Code']
draft: true
---

## 代码 


```javascript
class Storage {
  constructor(name) {
    this.name = "storage";
  }
  //设置缓存
  setItem(params) {
    let obj = {
      name: "",
      value: "",
      expires: "",
      startTime: new Date().getTime(), //记录何时将值存入缓存，毫秒级
    };
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);

    let { name, value, expires } = options;
    if (expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(name, JSON.stringify(options));
    } else {
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (Object.prototype.toString.call(value) == "[object Object]") {
        value = JSON.stringify(value);
      }
      if (Object.prototype.toString.call(value) == "[object Array]") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(name, value);
    }
  }
  //拿到缓存
  getItem(name) {
    let item = localStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      // item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (item && item.startTime) {
      let nowTime = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (nowTime - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name);
        return false;
      } else {
        //缓存未过期，返回值
        return item.value;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item;
    }
  }
  //移出缓存
  removeItem(name) {
    localStorage.removeItem(name);
  }
  //移出全部缓存
  clear() {
    localStorage.clear();
  }
}
```

## 使用

```javascript
const storage = new Storage();

// 设置永久有效
storage.setItem({ name: "name", value: "peng"});
storage.getItem('name');

// 设置5秒后失效
storage.setItem({ name: "token", value: "abcdef", expires: 5000 });
storage.getItem('token'); //abcdef

// 5秒后再获取
storage.getItem('token'); //false
```
