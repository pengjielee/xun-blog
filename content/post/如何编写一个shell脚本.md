---
title: "如何编写一个shell脚本"
url: "post/how-do-i-write-a-shell-script"
date: 2021-02-26T11:17:08+08:00
keywords: 'Shell脚本'
description: ''
tags: ['Shell']
categories: []
draft: true
---

## 输出 Hello World

test.sh
```Bash
#!/bin/bash
echo "Hello World !"
```

`#!` 告诉系统解释此脚本文件的 Shell 程序。

## 输出变量

test.sh
```Bash
#!/bin/bash

message='Hello World'
echo $message # output: Hello World
```

## 拼接变量

test.sh
```Bash
#!/bin/bash

name='Peng'
echo "Hello, $name" # output: Hello, Peng
```

## 运行Shell脚本 

```Bash
$ chmod +x ./test.sh #使脚本具有执行权限
$ ./test.sh #执行脚本

or 

$ sh test.sh #执行脚本
```

## 创建一个提交 git 记录的 shell 脚本 

deploy.sh

```Bash
#!/bin/bash

deploy_time=$(date +%Y-%m-%d\ %H:%M:%S) # 发布时间，格式如：2021-02-26 11:32:54

git pull   # 拉取最新代码
git add .  # 添加所有代码到代码库
git commit -m "deploy on $deploy_time" # 提交代码

git push  # 推送代码到服务器
```
