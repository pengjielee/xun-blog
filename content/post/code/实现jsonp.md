---
title: "实现jsonp"
date: 2021-03-16T21:01:08+08:00
keywords: ''
description: ''
tags: ['code']
categories: []
draft: true
---

## 实现

```javascript
var Jsonp = {
  loadScript: function(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (this.readyState == "loaded" || this.readyState == "complete") {
          this.onreadystatechange = null;
          document.body.removeChild(this);
        }
      };
    } else {
      script.onload = function() {
        document.body.removeChild(this);
      };
    }
    script.setAttribute('src', url);
    document.body.appendChild(script);
  },
  encodeParameters: function(parameters) {
    var params = [];
    for (parameter in parameters) {
      params.push(escape(parameter) + "=" + escape(parameters[parameter]));
    }
    return params.length > 0 ? '?' + params.join('&') : '';
  },
  request: function(url, param) {
    this.loadScript(url + this.encodeParameters(param));
  }
};
```

## Test 

```javascript
Jsonp.request("http://www.baidu.com", {
  "callback": "callback",
  "t": new Date().getTime()
});
```