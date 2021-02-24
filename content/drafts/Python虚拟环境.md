## 虚拟环境

1、创建虚拟环境

```
python3 -m venv 11_env
```

2、激活虚拟环境

```
source 11_env/bin/activate
```

激活虚拟环境后，界面显示 
```
python_work % source 11_env/bin/activate
(11_env) python_work %
```

3、停止虚拟环境

```
(11_env) python_work % deactivate
python_work % 
```

## 安装Django

```
pip3 install Django	
```


## 创建项目

```
django-admin startproject mysite .
```

## 创建数据库

```
python manage.py migrate
```

## 启动项目

```
python manage.py runserver
```

## 查看Django版本

```
python3 -m django --version
```