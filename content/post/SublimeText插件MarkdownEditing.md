---
title: "SublimeText插件MarkdownEditing"
url: "post/sublimetext-plugin-markdownediting"
thumbnail: "https://i.loli.net/2021/03/01/HLeauI8K7itQPSf.jpg"
date: 2021-03-01T15:21:17+08:00
keywords: 'SublimeText插件,Markdown,高亮Markdown'
description: ''
tags: ['Sublime']
categories: []
draft: true
---

## 问题 

使用SublimeText默认打开 .md 后缀的文件，页面显示一片白，阅读起来很不爽。

## MarkdownEditing 

MarkdownEditing是一款SublimeText插件，可以高亮显示语法，还可以快速插入 Markdown 标记。

1、安装（MacOS为例） 

a. 打开 Sublime Text，按组合键 Command + Shift + P，然后输入install，选择 Package Control:Install Package。 
 
b. 插件安装面板输入 MarkdownEditing，然后回车。  


2、 配置

Sublime Test -> Preferences -> Package Settings -> Markdown Editing -> Markdown GFM Setting - User 

编辑内容如下：
```
{
  "color_scheme": "Packages/MarkdownEditing/MarkdownEditor-Dark.tmTheme",
  "wrap_width": "auto",
  "draw_centered": false,
}
```

3、快捷键 

a. 复制链接 (https://www.baidu.com/) 到剪切板，然后按 Command + shift + K，会快速插入链接 

```
![](https://www.baidu.com/)
```

b. 输入"mdi + tab"会自动插入下面图片标记

```
![Alt text](/path/to/img.jpg "Optional title")
```

c. 输入"mdi + tab"会生成下面链接标记

```
[](link)
```


## More  

MarkdownEditing  
https://github.com/SublimeText-Markdown/MarkdownEditing  
