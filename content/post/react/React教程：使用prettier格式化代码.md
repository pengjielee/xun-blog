---
title: "React教程：使用prettier格式化代码"
url: "post/react-tutorial-formatting-code-with-prettier"
thumbnail: "https://i.loli.net/2021/03/01/GBy3P92WlbmHI4F.jpg"
date: 2021-03-04T08:58:07+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---


## 安装 

```bash
$ npm install --save-dev --save-exact prettier
```

## 创建一个空的配置文件 
 
```bash
$ echo {}> .prettierrc.js
```

## 配置.prettierrc.js

```javascript
module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  useTabs: false,
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
        htmlWhitespaceSensitivity: "ignore",
        printWidth: 120,
        tabWidth: 2,
      },
    }
  ],
};
```

[我的prettier配置](/post/my-prettier-config/)

## 创建忽略文件

.prettierignore 文件用来设置哪些文件不需要格式化。

.prettierignore
```bash
build
coverage
dist/*.js
```

## 使用 npm scripts 格式化

package.json
```json
{
  scripts: {
    "prettier": "prettier --write src/*.js src/**/*.js",
    "prettier:check": "prettier --check src/*.js src/**/*.js"
  }
}
```

prettier --check，用于检查哪些文件需要格式化；  
prettier --write，用于格式化代码；


项目源码见（切换 tag 至 prettier）git checkout prettier： https://github.com/pengjielee/reactapp/tree/main/hello-world

## More 

Prettier官网  
https://prettier.io/   
