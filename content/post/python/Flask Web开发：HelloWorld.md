---
title: "Flask Web开发：HelloWorld"
url: "post/flask-web-development-helloworld"
thumbnail: "https://i.loli.net/2021/02/25/vATqFdx1unkZQlO.jpg"
date: 2021-02-25T10:41:37+08:00
keywords: ''
description: ''
tags: ['Python','Flask']
categories: ''
draft: true
---

## 安装 flask

```
$ pip install flask 
```

查看flask版本
```
$ flask --version
```

终端输出：
```
Flask 1.0.2
Python 3.6.5 (v3.6.5:f59c0932b4, Mar 28 2018, 05:52:31)
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)]
```

## 创建项目目录

```
$ mkdir flask_web && cd flask_web
```

## 创建 hello.py

```
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
  return 'Hello, World!'
```

## 运行

```
$ export FLASK_APP=hello.py
$ flask run
```

终端输出：
```
peng@localhost flask_web % export FLASK_APP=hello.py
peng@localhost flask_web % flask run
 * Serving Flask app "hello.py"
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

浏览器打开 `http://127.0.0.1:5000/`，页面输出：
```
Hello, World!
```

## 设置外部访问（网络中其他电脑可访问）

```
$ flask run --host=0.0.0.0
```

## 开启调试模式

```
$ export FLASK_ENV=development
$ flask run 
```

终端输出 ：
```
peng@localhost flask_web % export FLASK_ENV=development
peng@localhost flask_web % flask run
 * Serving Flask app "hello.py" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 186-277-807
```