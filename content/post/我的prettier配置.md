---
title: "我的prettier配置"
url: "post/my-prettier-config"
date: 2020-12-08T11:57:27+08:00
keywords: 'prettier配置'
description: ''
tags: ['Tool']
categories: []
draft: false
---

## 创建文件

```Bash
touch .prettierrc.js
```

## 内容

.prettier.js
```JavaScript
module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 4,
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
        tabWidth: 4,
      },
    },
    {
      files: "*.wxss",
      options: {
        parser: "css",
      },
    },
  ],
};
```

## 说明 

- arrowParens: 'avoid',   
在箭头函数参数周围包含圆括号，默认"always"；avoid:x => x，always:(x) => x

- bracketSpacing: true,   
是否在括号之间打印空格，默认true；true:{ foo: bar }，false:{foo:bar}

- printWidth: 120,   
每行的长度，默认80；

- semi: true,   
是否在语句的末尾打印分号，默认true；

- singleQuote: true,   
使用单引号而不是双引号，默认false；

- tabWidth: 4,   
指定Tab的空格数，默认2；

- trailingComma: 'all',   
多行时，尽可能在后面打印逗号，默认"es5"；

- jsxSingleQuote: false,   
在JSX中使用单引号而不是双引号，默认false；

- jsxBracketSameLine: false,   
将多行JSX元素的>放在最后一行的末尾，而不是单独放在下一行(不应用于自闭元素)，默认false

- useTabs: false,   
是否使用Tab，默认false

- overrides  
重定义配置