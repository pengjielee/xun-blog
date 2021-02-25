---
title: "Flask Web开发：渲染模板"
url: "post/flask-web-development-render-templates"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T14:13:53+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: []
draft: true
---

## 渲染模板 

1、创建模板目录 `templates`，及模板文件

```Bash
$ mkdir templates && cd templates 
$ touch hello.html
$ touch login.html
```

2、目录结构
```
/flask_web
  /templates
     /hello.html
     /login.html
  /app.py
```

3、模板文件 

hello.html
```html
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}
```

login.html
```html
<!doctype html>
<h1>{{ title }}</h1>
<form action="/login" method="post">
  <div>
    <label>用户名</label>
    <input type="text" name="name"/>
  </div>
  <div>
    <label>密码</label>
    <input type="password" name="password"/>
  </div>
  <button>login</button>
</form>
```

4、指定模板

```Python
from flask import render_template

@app.route('/hi/')
@app.route('/hi/<name>')
def hi(name=None):
  return render_template('hello.html', name=name)

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    return 'post'
  else:
    return render_template('login.html', title='Login Form')
```

## 接受 post 数据 

```Python
@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    name = request.form['name']
    password = request.form['password']
    # userinfo = request.values.to_dict()
    return 'Username: ' + escape(name) + ', Password: ' + escape(password)
  else:
    return render_template('login.html', title='Login Form')
```

## 文件上传  

1、创建 upload.html 

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file"/> <br/>
  <button>Upload</button>
</form>
```

2、上传方法 

```Python
@app.route('/upload', methods=['GET', 'POST'])
def upload():
  if request.method == 'POST':
    file = request.files['file'] # 获取文件
    print(file.filename)
    file.save(file.filename) # 保存文件
    return 'Upload success'
  else:
    return render_template('upload.html', title="Upload")
```

3、指定上传目录（先创建好 uploads 目录）


```Python
from werkzeug.utils import secure_filename

@app.route('/upload', methods=['GET', 'POST'])
def upload():
  if request.method == 'POST':
    file = request.files['file']
    # secure_filename，返回的文件名仅为ASCII字符串
    filename = secure_filename(file.filename)
    print(filename)
    file.save('./uploads/' + filename)
    return 'Upload success'
  else:
    return render_template('upload.html', title="Upload")
```
