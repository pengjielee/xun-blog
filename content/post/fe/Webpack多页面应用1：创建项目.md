---
title: "Webpack多页面应用1：创建项目"
url: "post/webpack-multi-page-application1"
thumbnail: "https://i.loli.net/2021/03/05/amN4RVuS5FHT3n7.jpg"
date: 2021-03-08T13:10:51+08:00
keywords: ''
description: ''
tags: ['Webpack']
categories: ''
draft: true
---

## 准备工作

1、创建项目
```bash
$ mkdir multi-pages & cd multi-pages 
$ npm init -y
```

2、项目结构
```
src/
  pages/
    home/
      index.js
    about/
      index.js
  webpack.config.js
```

home/index.js
```javascript
export default function index() {
  return 'Home Page';
} 

document.getElementById('root').innerHTML = index();
```

about/index.js
```javascript
export default function index() {
  return 'About Page';
} 

document.getElementById('root').innerHTML = index();
```

## webpack配置

1、安装依赖
```bash
$ npm install webpack webpack-cli webpack-dev-server -D
$ npm install html-webpack-plugin -D
```

2、webpack.config.js 

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/pages/home/index.js',
    about: './src/pages/about/index.js'
  },

  mode: 'development',

  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'home',
      templateContent: "<div id='root'></div>",
      filename: path.join(__dirname,`/dist/home.html`),
      inject: 'body',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: 'about',
      templateContent: "<div id='root'></div>",
      filename: path.join(__dirname,`/dist/about.html`),
      inject: 'body',
      chunks: ['about']
    })
  ]
}
```

## 项目脚本

package.json
```json
{
  scripts: {
    "dev": "webpack serve",
    "build": "webpack"
  }
}
```

npm run dev，启动开发模式：   
访问：http://localhost:9001/home.html，输出 Home Page  
访问：http://localhost:9001/about.html，输出 About Page  


npm run build，编译输出，查看dist目录: 

```
dist/
  about-4cf5e8e1c8859b76c102.js
  about.html
  home-7887b09f166af2241b92.js
  home.html
```

项目源码见（切换 tag 至 multi-page-app1）`git checkout multi-page-app1`：
https://github.com/pengjielee/reactapp/tree/main/multi-pages











