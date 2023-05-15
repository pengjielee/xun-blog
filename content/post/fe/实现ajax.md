---
title: "实现Ajax"
date: 2021-03-15T15:48:55+08:00
keywords: ''
description: ''
tags: ['code']
categories: ''
draft: true
---

## 简单实现

```javascript
var xhr = null;

// Old compatibility code, no longer needed.
if (window.XMLHttpRequest) {
  // Mozilla, Safari, IE7+ ...
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  // IE 6 and older
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function () {
  // Process the server response here.
  if (xhr.readyState === XMLHttpRequest.DONE) {
    // Everything is good, the response was received.
    if (xhr.status === 200) {
      // Perfect!
      console.log(xhr.response);
    } else {
      // There was a problem with the request.
      // For example, the response may have a 404 (Not Found)
      // or 500 (Internal Server Error) response code.
    }
  } else {
    // Not ready yet.
  }
};

xhr.open("GET", "http://www.example.org/some.file", true);

// Set the MIME type of the request
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send();
```

or 

```javascript
var xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState); // readyState will be 0

xhr.open("GET", "/api", true);
console.log("OPENED", xhr.readyState); // readyState will be 1

xhr.onprogress = function () {
  console.log("LOADING", xhr.readyState); // readyState will be 3
};

xhr.onload = function () {
  console.log("DONE", xhr.readyState); // readyState will be 4
};

xhr.send(null);
```

## 封装函数

```javascript
// Asynchronous Javascript And XML
function ajax(options) {
  // 选项
  var method = options.method || "GET",
    params = options.params,
    data = options.data,
    url =
      options.url +
      (params
        ? "?" +
          Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : ""),
    async = options.async === false ? false : true,
    success = options.success,
    headers = options.headers;

  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.onreadystatechange = function () {
    /**
      readyState:
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
      status: HTTP 状态码
    **/
    if (request.readyState === 4 && request.status === 200) {
      success && success(request.responseText);
    }
  };

  request.open(method, url, async);

  if (headers) {
    Object.keys(headers).forEach((key) =>
      request.setRequestHeader(key, headers[key])
    );
  }
  method === "GET" ? request.send() : request.send(data);
}
```

使用  

```javascript
ajax({
  method: "GET",
  url: "https://cnodejs.org/api/v1/topics",
  success: function (res) {
    console.log("success", res);
  },
  async: true,
  params: {
    p: "test",
    t: 666,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
```


