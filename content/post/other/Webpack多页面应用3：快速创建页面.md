---
title: "Webpack多页面应用3：快速创建页面"
url: "post/webpack-multi-page-application3"
thumbnail: "https://i.loli.net/2021/03/05/RzeUKmB9fyNnsvE.jpg"
date: 2021-03-08T15:55:42+08:00
keywords: ''
description: ''
tags: ['Webpack']
categories: []
draft: true
---

## 安装依赖

```bash
$ npm install chalk inquirer fs-extra -D 
```

- chalk，终端美化；  
- inquirer，命令行交互工具；   
- fs-extra，fs模块的增加版；  

## 创建页面的脚本 

newPage.js
```javascript
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs-extra');

// 获取传递的参数
const options = process.argv.slice(2);
const name = options[0];

// 创建html文件
const createHtml = function(desFilePath, dirName) {
  const content = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="keywords" content="" />
    <meta name="description" content=""/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
  `;
  fs.writeFileSync(desFilePath, content);
  console.log(chalk.green(`src/pages/${dirName}/index.html created.`));
};

// 创建script文件
const createScript = function(desFilePath, dirName) {
  const content = `import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

function App() {
  return <h1>${dirName} page</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
  `;
  fs.writeFileSync(desFilePath, content);
  console.log(chalk.green(`src/pages/${dirName}/index.js created.`));
};

// 创建style文件
const createStyle = function(desFilePath, dirName) {
  fs.writeFileSync(desFilePath, '');
  console.log(chalk.green(`src/pages/${dirName}/index.scss created.`));
};

if (name) {
  let dirName = name.toLowerCase();
  dirName = dirName.split('.').join('/');
  const desDir = path.join(__dirname, '../src/pages/' + dirName);

  // 判断目录是否存在，不存在则创建
  if (!fs.existsSync(desDir)) {
    fs.mkdirpSync(desDir);
    createHtml(path.join(desDir, 'index.html'), dirName);
    createScript(path.join(desDir, 'index.js'), dirName);
    createStyle(path.join(desDir, 'style.scss'), dirName);
  } else {
    // 如果存在，询问是否覆盖
    console.log(chalk.red(dirName + ' existed!'));
    inquirer
      .prompt([
        {
          name: 'yes',
          type: 'confirm',
          message: 'Is covered?',
        },
      ])
      .then(answers => {
        if (answers.yes) {
          createHtml(path.join(desDir, 'index.html'), dirName);
          createScript(path.join(desDir, 'index.js'), dirName);
          createStyle(path.join(desDir, 'style.scss'), dirName);
        }
      });
  }
} else {
  console.log(
    chalk.red('No name provided, try `npm run newPage [name]` instead.'),
  );
}
```

## 定义 npm scripts 

```json
{
  scripts: {
    "newPage": "node scripts/newPage.js",
  }
}
```

## 使用

```bash
# 创建博客页面
$ npm run newPage blog

# 创建博客列表页面（.用于多级目录创建）
$ npm run newPage blog.list

# 创建博客详情页（.用于多级目录创建）
$ npm run newPage blog.detail
```


项目源码见（切换 tag 至 multi-page-app3）`git checkout multi-page-app3`：
https://github.com/pengjielee/reactapp/tree/main/multi-pages
