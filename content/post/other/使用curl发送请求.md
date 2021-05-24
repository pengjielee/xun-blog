---
title: "使用curl发送请求"
date: 2021-05-21T11:48:53+08:00
keywords: ''
description: ''
tags: ['tool']
categories: []
draft: true
---


## get请求

```
curl https://cnodejs.org/api/v1/topics
```

## post请求

1、application/x-www-form-urlencoded

```
curl -d'username=admin&password=123456' -X POST http://localhost:8080/api/user/login
```

2、application/json

```
curl http://localhost:8080/api/user/login -X POST -d '{"username": "100","password":"123456"}' --header "Content-Type: application/json"
```

## 设置header

```
curl -H 'Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' http://localhost:8080/api/user/list
```

## 参数

- -d 参数用于发送 POST 请求的数据体。
- -H 参数添加 HTTP 请求的标头。
- -X 参数指定 HTTP 请求的方法。



## More 

Curl Cookbook  
https://catonmat.net/cookbooks/curl  


