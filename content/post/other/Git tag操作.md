---
title: "Git tag操作"
url: "post/git-tag-operation"
date: 2020-12-04T13:53:27+08:00
keywords: 'git tag,git'
description: ''
tags: ['Git']
categories: ''
draft: false
---

## 1. 显示所有tag

```
git tag
```

## 2. 查看某个版本的tag

```
git tag -l 'v1.0.*'
```

## 3. 创建标签

```
git tag -a v1.0.0 -m '版本1.0'
```

## 4. 查看标签的详情，可以看到你commit的内容

```
git show v1.0.0
```

## 5. 推送标签

```
git push origin v1.0.0
```

## 6. 删除本地标签

```
git tag -d v1.0.0
```

## 7. 删除远程标签

```
git push origin :refs/tags/v1.0.0
```

## More

Git tag用法  
https://www.jianshu.com/p/50c1b2433774