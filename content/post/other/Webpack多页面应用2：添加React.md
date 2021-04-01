---
title: "Webpack多页面应用2：添加React"
url: "post/webpack-multi-page-application2"
thumbnail: "https://i.loli.net/2021/03/05/pKfWhzbRCJ24iuc.jpg"
date: 2021-03-08T15:36:08+08:00
keywords: ''
description: ''
tags: ['Webpack']
categories: []
draft: true
---

## 添加 React 

```bash
$ npm install react react-com
```

home/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>About page - Rendered by React</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

about/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Home page - Rendered by React</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 更新webpack 

1、安装依赖

```bash
$ npm install -D babel-loader @babel/preset-react -D
```

2、更新webpack.config.js，添加处理js后缀的loader 

```javascript
module.exports = {
  //...
    
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react'],
          },
        },
      }
    ],
  },

  //...
}
```

项目源码见（切换 tag 至 multi-page-app2）`git checkout multi-page-app2`：
https://github.com/pengjielee/reactapp/tree/main/multi-pages