---
title: "Webpack多页面应用4：动态获取入口"
url: "post/webpack-multi-page-application4"
thumbnail: "https://i.loli.net/2021/03/05/AKt69UhnTdL7WEz.jpg"
date: 2021-03-08T16:26:18+08:00
keywords: ''
description: ''
tags: ['Webpack']
categories: []
draft: true
---


## 问题 

每次创建新的页面时，如果都要去更改webpack的入口 配置文件，那样太不爽了，我们改造我们的代码来动态获取入口文件。

## 改造 

1、安装glob

```bash
$ npm install glob -D 
```

2、动态获取目录中的文件
```javascript
const glob = require('glob');

/* 
 * 1. 我们以文件夹里是否有html文件为准，来判断是否需要生成多页面
 * 2. 我们的多页应用目录最多支持三级
 */ 
const pages = glob.sync('./src/pages/**?/**/index.html').map(item => {
  /* 
   * pathArr
   * = [ '.', 'src', 'pages', 'home', 'index.html' ] 
   * = [ '.', 'src', 'pages', 'blog', 'list', 'index.html' ]
   * = [ '.', 'src', 'pages', 'blog', 'list', 'detail', 'index.html' ]
  */
  const pathArr = item.split('/'); 
  // 从第3个截取至倒数第一个，为我们的文件名
  return pathArr.slice(3, pathArr.length - 1).join('-');
});
```

## 更新 webpack 

1、创建入口 
```javascript
const createEntry = () => {
  let entry = {};
  pages.forEach(name => {
    const pagePath = name.split('-').join('/');
    entry[name] = path.join(__dirname, `./src/pages/${pagePath}/index.js`);
  });
  return entry;
};
```

2、创建htmlWebpackPlugin 

```javascript
const createHtmlPlugin = () => {
  let plugins = [];
  pages.forEach(name => {
    const pagePath = name.split('-').join('/');
    plugins.push(
      new HtmlWebpackPlugin({
        minify: false,
        title: name,
        template: path.join(__dirname, `./src/pages/${pagePath}/index.html`),
        filename: path.join(__dirname, `./dist/${name}.html`),
        inject: 'body',
        chunks: [name],
        hash: false,
        publicPath: '',
      }),
    );
  });
  return plugins;
};
```

webpack.config.js 

```javascript
module.exports = {
  entry: createEntry(),

  // ...

  plugins: [...createHtmlPlugin()],
};
```

项目源码见（切换 tag 至 multi-page-app4）`git checkout multi-page-app4`：
https://github.com/pengjielee/reactapp/tree/main/multi-pages


