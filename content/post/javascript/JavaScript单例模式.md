---
title: "JavaScript单例模式"
date: 2021-04-06T10:03:24+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: true
---

## 代码

```javascript
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

// 创建登录框
var createLoginDialog = function () {
  var div = document.createElement("div");
  div.innerHTML = "Login Dialog";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

// 创建唯一登录框
var createSingleLoginDialog = getSingle(createLoginDialog);

document.getElementById("login").onclick = function () {
  var loginDialog = createSingleLoginDialog();
  loginDialog.style.display = "block";
};
```
