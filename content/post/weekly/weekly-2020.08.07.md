---
title: "Weekly-20200807"
thumbnail: "https://i.loli.net/2021/03/05/b8Hk6sJNIDLnRq5.jpg"
date: 2020-08-07T14:14:25+08:00
keywords: ''
description: ''
tags: ['Weekly']
categories: ''
draft: true
---


## CSS

10个前端开发人员必须知道的CSS框架  
https://mp.weixin.qq.com/s/T2qZ4YrVuwZ_3xTlis3Jow

## React

React Hooks踩坑分享  
https://mp.weixin.qq.com/s/w9XhwjF3F6oJBUdD1rp2BQ

用React Hooks做一个搜索栏  
https://mp.weixin.qq.com/s/Jv-jByVRPWUCfOdj1q00Bg

我读完了React的API，并为新手送上了一些建议  
https://mp.weixin.qq.com/s/OXx_Pb3QXs6uPg6V3ZYJsQ

前端，react，动画  
https://tech.youzan.com/react-animations/

Implementing Infinite Scroll And Image Lazy Loading In React  
https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/

## 编程技巧

15个简单的JS编码标准让你的代码更整洁  
https://mp.weixin.qq.com/s/3KR1AYsTfXPWvDO_FMgMXQ

15年程序员经验分享：40个改变你编程技能的小技巧！  
https://mp.weixin.qq.com/s/QbYXuvjdG1znFaE3d2HSow

可能是目前最详细从零开始配置 TypeScript 项目的教程  
https://mp.weixin.qq.com/s/PVr6Pjuf8Bm69xTLuqLxkw

## Python

非常有用的 Python 技巧  
https://mp.weixin.qq.com/s/hdV4aQUDdMyIWvNorbzXcA

这些Python库虽然冷门，但功能真的很强大！  
https://mp.weixin.qq.com/s/RKJQbDDYbVFnpyR3Y5BKbw

这些自动化场景，批处理脚本完全可以取代 Python！  
https://mp.weixin.qq.com/s/WEC58p7AZdmzosvKhP_0fw

用 Python 写个消消乐小游戏  
https://mp.weixin.qq.com/s/3YTq7rRB9WEGya7pZ_nJ-Q

## 微信小程序

如何在微信小程序中使用sass  
https://www.dazhuanlan.com/2020/01/06/5e1299e987cc4/
https://segmentfault.com/a/1190000015807708

微信小程序封装wx.request方法  
https://www.cnblogs.com/rmty/p/10905859.html

微信小程序，封装axios请求数据_WhyBecause的博客-CSDN博客_小程序使用axios  
https://blog.csdn.net/qq_41287423/article/details/93668025?utm_medium=distribute.wap_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.wap_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase

## Other

前端 - Page 2 - 有赞技术团队  
https://tech.youzan.com/tag/front-end/page/2/

yapi  
https://github.com/ymfe/yapi

数据解构  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring

rel=noopener  
https://mathiasbynens.github.io/rel-noopener/#hax

node_modules 困境  
https://mp.weixin.qq.com/s/pjEFhqa7rH4CWPv_i81XhQ

企业实战｜企业接口管理平台Yapi搭建  
https://mp.weixin.qq.com/s/XNntrSbRhOokQivC9Hffwg

Nginx反向代理

```
server {
  listen 80;
  server_name app.doctorpanda.com;
  index index.php index.html;

  location / {
    proxy_pass http://localhost:5000;
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Methods "*";
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept";
  }
}
```



