---
title: "Flask Web开发：Session实现简单登录"
url: "post/flask-web-development-session-implements-simple-login"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T14:34:40+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: ''
draft: true
---

## 设置密钥

```Python
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
```

生成随机密钥：
```Python
$ python -c 'import os; print(os.urandom(16))'
```

## 首页

```Python
from flask import Flask, request, redirect, url_for, session, render_template
from markupsafe import escape

app = Flask(__name__)

app.secret_key = 'nimei'

@app.route('/')
def index():
  return '<h1>Welcome</h1><br /><a href="/login">登录</a>'
```

## 登录

```Python
storage = {'username': 'lipengjie', 'password': '123456'}

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    # 判断与服务器存储的用户密码是否一致，此处用一个对象模拟数据库
    if storage['username'] == username and storage['password'] == password:
    	# 登录成功以后，把用户名存入session，并跳转后台
      session['username'] = username
      return redirect(url_for('admin'))
    else:
      return '用户名或密码错误！'
  else:
    return render_template('newlogin.html', title='Login')
```

newlogin.html 

```html
<form action="/login"  method="post">
  <p><input type="text" name="username" placeholder="username"/></p>
  <p><input type="password" name="password" placeholder="password"/></p>
  <p><input type="submit" value="Login"></p>
</form>
```

## 后台

```Python
@app.route('/admin')
def admin():
	# 判断session中是否登录用户名
  if 'username' in session:
    username = escape(session['username'])
    return render_template('admin.html', username=username)
  return redirect(url_for('login'))
```

admin.html 

```html
<!doctype html>
<h1>当前登录用户：{{ username }}</h1>
<a href="/logout">退出登录</a>
```

## 登出

```Python
@app.route('/logout')
def logout():
  session.pop('username', None)
  return redirect(url_for('index'))
```





