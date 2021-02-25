---
title: "Flask Web开发：定义路由及变量约束"
url: "post/flask-web-development-define-routes-and-variable-constraint"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T11:37:03+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: []
draft: true
---

## 创建 app.py （flask默认会运行app.py文件)

```Python
from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def index():
  return 'Index Page'
```

## 定义多个路由

```Python
@app.route('/hello')
def hello():
  return 'Hello, World'

@app.route('/about')
def about():
  return 'About Page'
```

## 路由变量约束  

接受变量类型：  
- string，默认类型，接受任何字符串（斜杠除外）    
- int，接受整数；   
- float，接受浮点数；  
- path，类似字符串（包括斜杠）；  
- uuid，接受UUID；  


```Python
@app.route('/post/<int:post_id>')
def show_post(post_id):
  return 'Post: %d' % post_id

@app.route('/user/<username>')
def show_user(username):
  return 'User: %s' % escape(username)

@app.route('/path/<path:subpath>')
def show_path(subpath):
  return 'Subpath: %s' % escape(subpath)

@app.route('/product/<float:price>')
def show_price(price):
  return 'Price: %f' % price
```

请求响应：
```
访问：http://localhost:5000/post/12  
输出：Post: 12

访问：http://localhost:5000/post/hello  
输出：Not Found

访问：http://localhost:5000/user/peng  
输出：User: peng

访问：http://localhost:5000/user/peng/lee  
输出：Not Found

访问：http://localhost:5000/path/hello  
输出：Subpath: hello

访问：http://localhost:5000/path/hello/jim  
输出：Subpath: hello/jim

访问：http://localhost:5000/product/12   
输出：Not Found

访问：http://localhost:5000/product/12.0   
输出：Price: 12.000000
```