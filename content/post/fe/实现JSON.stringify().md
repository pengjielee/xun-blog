---
title: "实现JSON.stringify()"
date: 2021-03-31T11:46:06+08:00
keywords: ''
description: ''
tags: ['code']
categories: ''
draft: true
---

写一个函数format，传入一个javascript object，输出格式化后的string，为了简化，我们规定object里只有number、array、object三种类型。比如

```javascript
//输入 
var object = {
    a: 1,
    b: 2,
    c: { d: 3 },
    e: [4, 5, { g: 6 }]
}
//输出 参考 JSON.stringify(object, null, '  ')
"
{
  "a": 1,
  "b": 2,
  "c": {
    "d": 3
  },
  "e": [
    4,
    5,
    {
      "g": 6
    }
  ]
}
"
```

## 参考1（不符题目要求，未格式化输出）

```javascript
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object" || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [],
      arr = obj && obj.constructor === Array;
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

var object = {
  a: 1,
  b: 2,
  c: { d: 3 },
  e: [4, 5, { g: 6 }],
};
jsonStringify(object); // "{"a":1,"b":2,"c":{"d":3},"e":[4,5,{"g":6}]}"
```

## 参考2（不符题目要求，未格式化输出）

```javascript
function jsonstringify(obj) {
  let type = typeof obj;

  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let arr = Array.isArray(obj);
    let json = [];

    for (let k in obj) {
      let v = obj[k];

      let type = typeof v;

      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type == "object") {
        v = jsonstringify(v);
      }

      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

var object = {
  a: 1,
  b: 2,
  c: { d: 3 },
  e: [4, 5, { g: 6 }],
};
jsonstringify(object); // "{"a":1,"b":2,"c":{"d":3},"e":[4,5,{"g":6}]}"
```

## More

如何实现一个JSON.stringify()  
https://blog.csdn.net/qq_40028324/article/details/103135034 

JSON.stringify 和 JSON.parse 的实现  
https://www.jianshu.com/p/f1c8bcd16f71 

JSON.parse和JSON.stringify在IE6、7中的兼容性  
https://www.jianshu.com/p/a884662cd990   

json2.js 
https://github.com/douglascrockford/JSON-js
