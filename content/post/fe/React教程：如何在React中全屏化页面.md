---
title: "如何在React中全屏化页面"
url: "post/how-to-make-a-full-screen-page-in-react"
thumbnail: "https://i.loli.net/2021/03/01/zkQDmcOEnGFKUhB.jpg"
date: 2021-02-04T15:12:18+08:00
keywords: "React全屏,React全屏页面,screenfull"
description: '如何在React中全屏化页面'
tags: ['screenfull','React']
categories: ''
draft: false
---

## 安装

```
$ npm install screenfull
```

## React中使用screenfull

1、引入

```JavaScript
import screenfull from 'screenfull';
```

2、全屏

```JavaScript
const handleClick = () => {
  if (screenfull.isEnabled) {
    //全屏整个页面
    //screenfull.request();
    //全屏某个元素
    screenfull.request(element);
  }
};
```

3、切换

```JavaScript
const handleToggle = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};
```

4、监听change事件

```JavaScript
import React, { useEffect, useRef } from "react";
import screenfull from "screenfull";

const Component = () => {
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        console.log("Am I fullscreen?", screenfull.isFullscreen ? "Yes" : "No");
      });
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change");
      }
    };
  }, [screenfull]);

  return null;
};
```

5、全屏化页面背景变为黑色，重置样式

```CSS
*:fullscreen,
*:-webkit-full-screen,
*:-moz-full-screen {
  background-color: #fff;
}
```

## More

screenfull    
https://github.com/sindresorhus/screenfull.js  