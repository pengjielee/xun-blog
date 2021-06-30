---
title: "Nextjs注入环境变量"
thumbnail: ""
date: 2021-06-22T15:35:14+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: []
draft: true
---

## 安装 cross-env

```bash
$ npm install cross-env --save-dev
```

## 使用cross-env注入环境变量

package.json

```json
{
  scripts: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "build:test": "cross-env BUILD_TARGET=test next build",
    "build:prod": "cross-env BUILD_TARGET=prod next build",
  },
};
```

## 创建next.config.js文件，并设置env变量

next.config.js
```javascript
module.exports = {
  poweredByHeader: false,

  env: {
    NEXT_PUBLIC_BUILD_TARGET: process.env['BUILD_TARGET'],
  },
};
```

默认情况下，所有通过 .env.local 加载的环境变量仅在 Node.js 环境中可用，这意味着它们不会暴露到浏览器端。

为了向浏览器暴露环境变量，你必须在变量前添加 `NEXT_PUBLIC_` 前缀。

## 使用环境变量 

```javascript
let baseURL = '';

switch (process.env.NEXT_PUBLIC_TARGET) {
  case 'test':
    baseURL = 'https://test.panda.com';
    break;
  case 'prod':
    baseURL = 'https://m.panda.com';
    break;
  case 'dev':
    baseURL = 'https://dev.panda.com';
    break;
  default:
    baseURL = 'https://m.panda.com';
    break;
}

export baseURL;
```

## More 

next.js的环境变量  
https://www.nextjs.cn/docs/basic-features/environment-variables