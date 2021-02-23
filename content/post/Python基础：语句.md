---
title: "Python基础：语句"
url: "post/python-basic-statement"
date: 2021-02-22T16:11:47+08:00
keywords: ''
description: ''
tags: ['Python']
categories: []
draft: true
---

## if语句

1、if

```Python
print('请输入用户名：')
name = input()
if name == 'peng':
  print('登录成功')
```

2、if...else

```Python
print('请输入登录用户名：')
name = input()
print('请输入登录密码：')
password = input()

if name == 'admin' and password == '123456':
  print('登录成功!')
else:
  print('用户名或密码错误!!!')
```

3、if...elif...else

```Python
print('请输入登录用户名：')
name = input()
print('请输入登录密码：')
password = input()

if name == 'admin' and password == '123456':
  print('admin登录成功!')
elif name == 'peng' and password == '654321':
  print('peng登录成功!')
else:
  print('用户名或密码错误!!!')
```

## for-in语句

```Python
# Prints out: P,y,t,h,o,n
for letter in 'Python':
  print(letter)

# Prints out: red,green,blue
for color in ['red','green','blue']:
  print(color)

# Prints out: 0:red,1:green,2:blue
colors = ['red','green','blue']
for index in range(len(colors)):
  print('%s:%s' % (index, colors[index]))

# Prints out: 1,2,3,4
for number in range(1,5):
  print(number)

# Prints out: 1,2,3,4 and then it prints "number value reached 4"
for number in range(1,5):
  print(number)
else:
  print("number value reached %d" %(number))
```

## while语句

```Python
# Prints out: 0,1,2,3,4,5,6,7,8
count = 0
while (count < 9):
  print(count)
  count = count + 1
```

## break语句

```Python
# Prints out: P,y,t
for letter in 'Python':     
  if letter == 'h':
    break
  print(letter)

# Prints out: 0,1,2,3,4
count = 0
while (count < 9):
  print(count)
  count = count + 1
  if(count == 5):
    break
```

## continue语句

```Python
# Prints out: P,y,t,o,n
for letter in 'Python':     
  if letter == 'h':
    continue
  print(letter)

# Prints out: 1,2,3,4,6,7,8,9
count = 0
while (count < 9):
  count = count + 1
  if(count == 5):
    continue
  print(count)
```

## pass语句

pass 是空语句，是为了保持程序结构的完整性。pass 不做任何事情，一般用做占位语句。

```Python
# Prints out: P,y,t,pass,h,o,n
for letter in 'Python':
  if letter == 'h':
    pass
    print('pass')
  print(letter)
```

## 应用

1、猜数字游戏

```Python
import random

answer = random.randint(1, 100)
counter = 0

while True:
  counter += 1
  number = int(input('请输入: '))
  if number < answer:
    print('大一点')
  elif number > answer:
    print('小一点')
  else:
    print('恭喜你猜对了!')
    break

print('你总共猜了%d次' % counter)

if counter > 7:
  print('你的智商余额明显不足')
```

2、1-100求和

```Python
# Prints out: 5050
sum = 0
for i in range(1,101):
  sum += i
print(sum)
```

3、1-100偶数求和

```Python
# Prints out: 2550
sum = 0
for i in range(1,101):
  if i % 2 == 0:
    sum += i
print(sum)
```

4、打印9x9乘法表

```Python
for i in range(1, 10):
  for j in range(1, i + 1):
    print('%d*%d=%d' % (j, i, i * j), end='\t')
  print()
```

```Python
"""
Prints out:
1*1=1
1*2=2 2*2=4
1*3=3 2*3=6 3*3=9
1*4=4 2*4=8 3*4=12  4*4=16
1*5=5 2*5=10  3*5=15  4*5=20  5*5=25
1*6=6 2*6=12  3*6=18  4*6=24  5*6=30  6*6=36
1*7=7 2*7=14  3*7=21  4*7=28  5*7=35  6*7=42  7*7=49
1*8=8 2*8=16  3*8=24  4*8=32  5*8=40  6*8=48  7*8=56  8*8=64
1*9=9 2*9=18  3*9=27  4*9=36  5*9=45  6*9=54  7*9=63  8*9=72  9*9=81
"""
```