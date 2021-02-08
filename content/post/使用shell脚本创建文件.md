---
title: "使用shell脚本创建文件"
url: 'post/use-shell-scripts-to-create-files'
date: 2021-01-15T16:24:14+08:00
keywords: 'shell,创建文件'
description: ''
tags: ['Shell']
categories: []
draft: true
---

## 文件名使用每日日期

newfile.sh
```Bash
#!/bin/bash

file_name=$(date +%Y.%m.%d)

touch "${file_name}.md"
```

## 写入内容并创建文件

newfile.sh
```Bash
#!/bin/bash

file_name=$(date +%Y.%m.%d)

echo "hello world" > "${file_name}.md"
```

## 批量创建文件 

newfiles.sh
```Bash
#!/bin/bash

filenames=()
filenames[0]='CSS实现弹幕效果.md'
filenames[1]='CSS实现动画.md'
filenames[1]='CSS盒子模型.md'

for filename in ${filenames[@]}
do 
  touch ${filename}
done
```