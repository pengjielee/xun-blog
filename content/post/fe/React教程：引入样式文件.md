---
title: "React教程：添加样式文件"
url: "post/react-tutorial-add-style-files"
thumbnail: "https://i.loli.net/2021/03/01/yzFSKreATLJxUvH.jpg"
date: 2021-03-04T10:10:22+08:00
keywords: ''
description: ''
tags: ['React']
categories: ''
draft: true
---

## 添加 .css 文件

1、安装 css-loader/style-loader 

```bash
$ npm install --save-dev css-loader style-loader
```

2、更新 webpack.config.js 

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

3、创建 base.css 文件 

```
/src
  /assets
    /styles
      base.css
```

base.css

```css
body {
  background: red;
  color: #fff;
}
```

4、引入 base.css 文件 

src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// 引入样式文件
import './assets/styles/base.css';

ReactDOM.render(<h1>Hello, World!</h1>, document.getElementById('root'));
```

此时打开浏览器： http://localhost:9000/

![20210304110019.jpg](https://i.loli.net/2021/03/04/imn2pFZt7EBJDe4.jpg)


项目源码见（切换 tag 至 css-loader）git checkout css-loader： https://github.com/pengjielee/reactapp/tree/main/hello-world 

## 添加 .scss 文件

1、安装 sass-loader / sass  

```bash
$ npm install sass-loader sass --save-dev
```

2、更新 webpack.config.js 

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader','sass-loader'],
      },
    ],
  },
};
```


项目源码见（切换 tag 至 sass-loader）git checkout sass-loader： https://github.com/pengjielee/reactapp/tree/main/hello-world

## 提取 css 文件

1、安装 extract-loader

```bash
$ npm install extract-loader file-loader --save-dev
```

2、更新 webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
          {
            loader: 'extract-loader',
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
```

3、区分环境

```javascript
const devMode = process.env.NODE_ENV !== 'production';

const loaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'sass-loader',
  },
];

if (devMode) {
  // 开发环境使用style-loader
  loaders.unshift({
    loader: 'style-loader',
  });
} else {
  // 生产环境提取css文件
  loaders.unshift({
    loader: 'extract-loader',
    options: {
      publicPath: '../',
    },
  });
  loaders.unshift({
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]',
    },
  });
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: loaders
      },
    ],
  },
};
```

4、构建输出

```
/dist
  /assets
    base.css
    base.scss
  index.html
  main.bundle.js
```


项目源码见（切换 tag 至 extract-loader）git checkout extract-loader： https://github.com/pengjielee/reactapp/tree/main/hello-world







