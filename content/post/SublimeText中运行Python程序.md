---
title: "SublimeText中运行Python程序"
url: "post/run-the-python-program-in-sublimetext"
date: 2021-02-24T11:36:26+08:00
keywords: ''
description: ''
tags: ['Sublime','Python']
categories: []
draft: true
---

## 环境

- 操作系统：MacOS Big Sur（版本11.2）  
- SublimeText：Version 3.1.1

## 使用系统自带版本，直接运行

创建 hello_world.py 文件，内容如下：
```
print('Hello World.')
```

选择菜单 Tools -> Build (或 command + B)。

## 配置Python3运行

1、查看Python3安装路径 
```
$ type -a python3
or 
$ which python3
```

2、配置Sublime Text

选择菜单 Tools -> Build -> New Build System，会打开一个新的配置文件。

编辑内容如下：
```
{
  "cmd": ["/usr/local/bin/python3", "-u", "$file"],
}
```

将文件重命名为 Python3.sublime-build，保存至默认目录。

选择菜单 Tools -> Build System -> Python3，再选择菜单Tools -> Build (或 command + B)。



