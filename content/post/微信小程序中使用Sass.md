---
title: "微信小程序中使用Sass"
url: "post/wechat-miniprogram-use-sass"
date: 2020-10-09T11:25:27+08:00
keywords: '微信小程序,sass,miniprogram'
description: ''
tags: ['Miniprogram','Sass',]
categories: []
draft: false
---

## 实现思路

使用脚本监听某个目录文件变化，把sass文件内容编译成wxss后缀的文件。

## 目录结构
```
--assets（存放静态资源目录）  
----scss（存放scss源文件目录）  
----wxss（存放编译后的wxss文件目录）  
```

## scss源文件结构

1、变量文件_var.scss
```
$primary-color: #31373F;
$secondary-color: #99A0AA;
$third-color: #989FA9;
$primary-font: 38rpx;
```

2、混合器文件_mixin.scss
```
@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

3、全局文件global.scss
```
@import "var";
@import "mixin";

.page {
  background: red;
}
```

4、首页home.scss
```
@import "var";
@import "mixin";

.page-home {
  background: blue;
}
```

## Nodejs监听sass文件

1、安装依赖

```
npm install -save-dev chokidar node-sass
```

2、watcher.js
```
const chokidar = require('chokidar');
const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

//监听的文件
const watchFile = path.join(__dirname, "/src/miniprogram/assets/scss/*.scss")

chokidar.watch(watchFile).on('all', (event, file) => {
  const { dir, name } = path.parse(file);

  //忽略以_开头的文件
  if(name.startsWith('_')){
    return;
  }

  console.log(event, file);

  //编译生成的wxss文件目录
  let target = path.join(path.resolve(dir,'..'),'wxss');
  sass.render({
    file: file,
    outputStyle: "compact"
  }, function(err, result) { 
    if(!err){
      const newFile = `${target}/${name}.wxss`
      fs.writeFile(newFile, result.css, function(err){
          if(!err){
            //file written on disk
            console.log(`updated ${newFile}`)
          }
      });
    } else {
      console.log(err)
    }
  });
});
```

3、npm scripts命令

```
{
  ...
  "scripts": {
       "sass-watch": "node watcher.js"
     },
  ...
}
```

## app.wxss中引入编译后的wxss文件

```
@import "./assets/wxss/base.wxss";
@import "./assets/wxss/home.wxss";
@import "./assets/wxss/mine.wxss";
```

## More 

Chokidar   
https://github.com/paulmillr/chokidar 

node-sass   
https://github.com/sass/node-sass 
