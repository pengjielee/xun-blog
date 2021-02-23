---
title: "Python基础：用户输入"
url: "post/python-basic-user-input"
date: 2021-02-22T16:12:09+08:00
keywords: ''
description: ''
tags: ['Python']
categories: []
draft: true
---


## 接受用户名问好

```
name = input('Please enter your name: ')
print('Hello,' + name + '!')
```

## 接受一个数值

```
age = input('How old are you? ')

if(age.isdigit()):
	if(int(age) > 18):
		print("You're not a kid anymore.")
	else:
		print("You're just a kid.")
else:
	print('Please enter a number.')
```