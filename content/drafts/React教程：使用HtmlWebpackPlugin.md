---
title: "React教程：使用HtmlWebpackPlugin"
url: "React教程：使用HtmlWebpackPlugin"
thumbnail: ""
date: 2021-03-04T15:48:26+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: true
---


1、安装

```bash
$ npm install --save-dev html-webpack-plugin
```

2、配置webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      title: 'HelloWorld',
      template: path.join(__dirname, './src/index.html'),
      inject: 'body',
      hash: false,
      publicPath: '',
    })
  ],
};
```