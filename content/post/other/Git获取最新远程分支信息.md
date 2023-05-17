---
title: "Git获取最新远程分支信息"
url: "post/git-gets-the-latest-remote-branch-information"
date: 2020-09-23T10:34:27+08:00
keywords: 'git,git pull,git branch'
description: ''
tags: ['Git']
categories: ''
draft: false
---

问题：git pull后用git branch -a取不到最新分支信息。

## 查看远程分支信息，发现不是最新的

```bash
$ git pull origin branchname
$ git branch -a 
```

## 解决办法：执行下面命令即可

```bash
$ git fetch origin
$ git remote prune origin  //可以用这个命令清除无效分支
```