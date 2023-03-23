---
title: "React教程：设置环境变量"
url: "post/react-tutorial-setting-environment-variables"
thumbnail: "https://i.loli.net/2021/03/01/QAxXiVpLJnU94Tv.jpg"
date: 2021-03-03T17:22:55+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---

## Mac系统下环境变量

1、注入环境变量，`export NODE_ENV=development`

package.json

```json
{
  "scripts": {
    "dev": "export NODE_ENV=development && webpack serve",
    "build": "export NODE_ENV=production && webpack"
  },
}
```

2、使用环境变量 `process.env.NODE_ENV` 

webpack.config.js

```javascript
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
console.log('devMode:', devMode);

module.exports = {
  entry: './src/index.js',

  mode: devMode ? 'development' : 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};
```

## cross-env，跨平台设置环境变量

1、安装

```bash
$ npm install --save-dev cross-env
```

2、注入

```json
{
  "scripts": {
    "cross:dev": "cross-env NODE_ENV=development webpack serve",
    "cross:build": "cross-env NODE_ENV=production webpack"
  },
}
```

项目源码见（切换 tag 至 node_env）git checkout node_env： https://github.com/pengjielee/reactapp/tree/main/hello-world

## More 

cross-env  
https://github.com/kentcdodds/cross-env  
