---
title: "JavaScript加密手机号"
url: "javascript-encrypts-the-phone-number"
date: 2021-02-08T10:34:27+08:00
keywords: '加密,手机号,数据脱敏,隐私手机号'
description: ''
tags: []
categories: ['JavaScript']
draft: false
---

需求：将手机号码中间4位用 * 号替换，保护隐私。

## 使用正则

```
const encryptPhoneNumber = (str) => {
  if (str) {
  	str = str.trim();
    const reg = /(\d{3})\d{4}(\d{3})/;
    str = str.replace(reg,'$1****$2');
  }
  return str;
};

encryptPhoneNumber('18614023235'); //output: 186****3235
```

## 使用substring

```
const encryptPhoneNumber = (str) => {
  if (str) {
    str = str.trim();
    str = str.substring(0,3) + '*'.repeat(4) + str.substring(str.length - 4);
  }
  return str;
};

encryptPhoneNumber('18614023235'); //output: 186****3235
```

## 加密身份证号

```
const encryptIDNumber = str => {
    if (str) {
        str = str.trim();
        str = `${str.substring(0, 4)}${'*'.repeat(10)}${str.substring(str.length - 4)}`;
    }
    return idno;
};

encryptIDNumber('110101199003071137'); //output: 1101**********1137
```
