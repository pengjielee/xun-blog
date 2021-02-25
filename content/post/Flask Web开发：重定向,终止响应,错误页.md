---
title: "Flask Web开发：重定向,终止响应,错误页"
url: "post/flask-web-development-redirect-abort-notfound"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T14:34:40+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: []
draft: true
---

## 重定向 

```Python
from flask import abort, redirect, url_for

@app.route('/welcome')
def welcome():
  return redirect(url_for('login'))
```

## 终止响应

```Python
from flask import abort, redirect, url_for

@app.route('/login')
def login():
  abort(401)
```

## 404页面

```Python
from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
  return render_template('404.html', 404)
```