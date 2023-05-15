---
title: "Nginx启动出错"
date: 2021-05-28T14:22:02+08:00
keywords: ''
description: ''
tags: ['nginx']
categories: ''
draft: true
---

## 环境

系统：Mac


## 查看nginx目录

```
which nginx 
```

output
```
/usr/local/bin/nginx
```

## 检查nginx配置文件语法是否有错

```
sudo /usr/local/bin/nginx -t
```

output
```
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

## 查看80端口占用

```
sudo lsof -i:80
```

## 查看nginx错误日志

查看配置文件
```
cat /usr/local/etc/nginx/nginx.conf
```

查看nginx配置的错误日志目录
```
#user  nobody;
worker_processes  1;

error_log   /usr/local/etc/nginx/logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}
```

打开错误日志文件
```
vi /usr/local/etc/nginx/logs/error.log
```

跳到最后一行
```
shift + g
```

## 管理nginx服务

```
brew services list
```
```
brew services stop nginx
```
```
brew services start nginx
```
```
brew services restart nginx
```

## nginx错误日志

1、[emerg] 33511#0: open() "/usr/local/var/run/nginx.pid" failed (13: Permission denied)

```
sudo /usr/local/bin/nginx -c /usr/local/etc/nginx/nginx.conf
```

2、[error] 33532#0: *1 directory index of "/Users/pengjie/websites/" is forbidden, client: 127.0.0.1, server: test.panda.com, request: "GET / HTTP/1.1", host: "localhost"

```
vi /usr/local/etc/nginx/nginx.conf
```

把 user 用户名 改为 user root 或 其它有高权限的用户名称即可


