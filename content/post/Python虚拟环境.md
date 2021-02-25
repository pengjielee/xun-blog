---
title: "Python虚拟环境"
url: "post/python-virtual-environment"
thumbnail: "https://i.loli.net/2021/02/25/Bumkfp5Y4G6tFsZ.jpg"
date: 2021-02-25T09:17:00+08:00
keywords: ''
description: ''
tags: ['Python']
categories: []
draft: true
---

## 虚拟环境 

虚拟环境是系统的一个位置，可以在其中安装包，并将其与其他Python包隔离。这样能够针对不同项目创建一个独立的环境，便于后期的移植。

## 虚拟环境管理工具

主要有三种：  
- virtualenv（历史更悠久）；  
- pipenv（功能更强大）；  
- venv（Python3.3以上原生支持）；

## 使用 virtualenv 创建虚拟环境 

1、安装virtualenv
```
$ pip install virtualenv
```

2、查看安装版本
```
$ python3 -m virtualenv --version
```

4、创建虚拟环境
```
$ python3 -m virtualenv dev_env
```

这时终端显示：
```
peng@localhost myblog % python3 -m virtualenv dev_env
created virtual environment CPython3.6.5.final.0-64 in 568ms
  creator CPython3Posix(dest=/Users/peng/python_work/myblog/dev_env, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/peng/Library/Application Support/virtualenv)
    added seed packages: pip==21.0.1, setuptools==52.0.0, wheel==0.36.2
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator
peng@localhost myblog % ls
dev_env
```

5、激活虚拟环境
```
$ source dev_env/bin/activate
```

6、安装flask
```
$ pip install flask
```

创建app.py
```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```

运行 `flask run `
```
(dev_env) peng@localhost myblog % flask run
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

7、生成requirement.txt

每次开发完都要手动执行下面命令，把最新的环境写入到requirement文件中，以便项目移植。

```
$ pip freeze > requirement.txt
```

查看requirement.txt

```
(dev_env) peng@localhost myblog % cat requirement.txt
click==7.1.2
Flask==1.1.2
itsdangerous==1.1.0
Jinja2==2.11.3
MarkupSafe==1.1.1
Werkzeug==1.0.1
```

8、安装依赖
```
$ pip install -r requirement.txt
```

9、brew 安装 pipenv 
```
$ brew install pipenv
```

## 使用 pipenv 创建虚拟环境

1、安装pipenv
```
$ pip install pipenv
```

2、查看安装版本
```
$ python3 -m pipenv --version
```

3、创建虚拟环境
```
$ python3 -m pipenv check
```

这时终端显示
```
peng@localhost myadmin % python3 -m pipenv check
Warning: the environment variable LANG is not set!
We recommend setting this in ~/.profile (or equivalent) for proper expected behavior.
Creating a virtualenv for this project...
Pipfile: /Users/peng/python_work/myadmin/Pipfile
Using /usr/bin/python3 (3.8.2) to create virtualenv...
⠇ Creating virtual environment...created virtual environment CPython3.8.2.final.0-64 in 1317ms
  creator CPython3macOsFramework(dest=/Users/peng/.local/share/virtualenvs/myadmin-5lUWQo7w, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/peng/Library/Application Support/virtualenv)
    added seed packages: pip==21.0.1, setuptools==52.0.0, wheel==0.36.2
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator

✔ Successfully created virtual environment!
Virtualenv location: /Users/peng/.local/share/virtualenvs/myadmin-5lUWQo7w
Creating a Pipfile for this project...
Checking PEP 508 requirements...
Passed!
Checking installed package safety...
All good!
```

4、启动虚拟环境
```
$ python3 -m pipenv shell
```

终端显示： 
```
peng@localhost myadmin % python3 -m pipenv shell
Launching subshell in virtual environment...
 . /Users/peng/.local/share/virtualenvs/myadmin-5lUWQo7w/bin/activate
peng@localhost myadmin %  . /Users/peng/.local/share/virtualenvs/myadmin-5lUWQo7w/bin/activate
(myadmin) peng@localhost myadmin %
```

5、退出虚拟环境
```
$ exit
```

6、安装flask 
```
$ pipenv install flask
```

7、查看包依赖关系
```
$ pipenv graph
```

终端显示： 
```
(myadmin) peng@localhost myadmin % pipenv graph
Flask==1.1.2
  - click [required: >=5.1, installed: 7.1.2]
  - itsdangerous [required: >=0.24, installed: 1.1.0]
  - Jinja2 [required: >=2.10.1, installed: 2.11.3]
    - MarkupSafe [required: >=0.23, installed: 1.1.1]
  - Werkzeug [required: >=0.15, installed: 1.0.1]
```

8、查看虚拟环境路径
```
$ pipenv --venv
```


## 使用 venv 虚拟环境 (Python3)

Python3.3以上的版本通过venv模块原生支持虚拟环境。

1、创建项目目录
```
$ mkdir mysite && cd mysite 
```

2、创建名为dev_env的虚拟环境
```
$ python3 -m venv dev_env
```

执行ls，会发现项目目录下多了一个dev_env的文件夹。

3、激活虚拟环境

```
$ source dev_env/bin/activate
```

激活虚拟环境后，界面显示 
```
peng@localhost mysite % source dev_env/bin/activate
(dev_env) peng@localhost mysite %
```

4、停止虚拟环境 `deactivate`

```
(dev_env) peng@localhost mysite % deactivate
peng@localhost mysite %
```

5、安装Django
```
$ pip3 install Django
```

6、创建项目

```
$ django-admin startproject mysite .
```

7、创建数据库

```
$ python3 manage.py migrate
```

8、启动项目

```
$ python3 manage.py runserver
```

这时会看到项目已启动：
```
(dev_env) peng@localhost mysite % python3 manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
February 25, 2021 - 01:43:19
Django version 3.1.7, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
