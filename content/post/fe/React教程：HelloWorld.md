---
title: "React教程：Hello World"
url: "post/react-tutorial-helloworld"
thumbnail: "https://i.loli.net/2021/03/01/YGlAZmK7p4uTL6E.jpg"
date: 2021-03-03T15:11:41+08:00
keywords: ''
description: ''
tags: ['React']
categories: ''
draft: true
---


## 创建项目

```bash
# 创建项目目录
$ mkdir hello-world

# 进入项目目录 
$ cd hello-world

# 初始化 package.json 文件
$ npm init -y

# 创建源码src目录（所有源代码都放在src目录），并创建入口文件 index.js
$ mkdir src && touch index.js

# 安装react和react-dom
$ npm install react react-dom

# 安装babel-loader，用于处理js文件 
# 安装@babel/preset-react，用于处理jsx
$ npm install -D babel-loader @babel/preset-react

# 安装webpack相关库
$ npm install -D webpack webpack-cli webpack-dev-serve
```

## 项目结构

```
hello-world
  /dist
    index.html
  /src
    index.js
  package.json
  webpack.config.js
```

## 项目代码

1、src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, World!</h1>,
  document.getElementById('root')
);
```

2、dist/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>hello world</title>
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript" src="main.bundle.js"></script>
</body>
</html>
```

3、webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
```

4、package.json

定义npm命令

```json
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack"
  },
}
```

## 开发及编译

```bash
# 本地开发
$ npm run dev

# 编译构建
$ npm run build
```

执行 `npm run dev`，本地会启动开发服务器；  

打开 http://localhost:9000/ ，页面输出 `Hello, World!`；   

更改 src/index.js中的文件内容，页面会实时刷新；  

![20210303170132.jpg](https://i.loli.net/2021/03/03/FJ21ezgyxmCcXfE.jpg)


项目源码见（切换 tag 至 helloworld）git checkout helloworld： https://github.com/pengjielee/reactapp/tree/main/hello-world
