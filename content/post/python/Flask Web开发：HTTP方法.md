---
title: "Flask Web开发：HTTP方法"
url: "post/flask-web-development-http-methods"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T13:18:40+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: ''
draft: true
---

## 定义 GET 方法（默认）

```Python
from flask import request
from flask import render_template

@app.route('/register', methods=['GET'])
def register():
  return render_template('register.html', title='Register Form')
```

## 定义 POST 方法

```Python
from flask import request
from markupsafe import escape

@app.route('/register', methods=['POST'])
def register_submit():
  name = request.form['name']
  email = request.form['email']
  return 'Username: ' + escape(name) + ', Email: ' + escape(email)
```

## 合在一起

```Python
@app.route('/register', methods=['POST'])
def register():
  if request.method == 'POST':
    name = request.form['name']
    email = request.form['email']
    return 'Username: ' + escape(name) + ', Email: ' + escape(email)
  else:
    return render_template('register.html', title='Register Form')
```