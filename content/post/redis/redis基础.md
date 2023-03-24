---
title: 'redis基础'
date: 2023-03-24T10:34:51+08:00
keywords: ''
description: ''
tags: ['redis']
categories: []
draft: true
difficulty: ''
---


## Redis

Redis（remote dictionary server）是一个基于KEY-VALUE的高性能的存储系统

## Docker安装redis

```bash
$ docker pull redis

$ docker run --name myredis -d -p 6379:6379 redis

$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                    NAMES
c92daf4edbfe   redis     "docker-entrypoint.s…"   32 seconds ago   Up 32 seconds   0.0.0.0:6379->6379/tcp   myredis
```

## 连接redis

```bash
$ redis-cli -v
redis-cli 7.0.9

$ redis-cli
127.0.0.1:6379>
```

## 字符串

1、设置和获取键值对：get / set

```bash
127.0.0.1:6379> set name jim
OK
127.0.0.1:6379> get name
"jim"
```

2、查询是否存在和查询所有键： exists / keys

```bash
127.0.0.1:6379> exists name
(integer) 1
127.0.0.1:6379> exists age
(integer) 0
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> set sex male
OK
127.0.0.1:6379> get sex
"male"
127.0.0.1:6379> keys *
1) "sex"
2) "name"
```

3、删除键值对：del

```bash
127.0.0.1:6379> keys *
1) "sex"
2) "name"
127.0.0.1:6379> del name
(integer) 1
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> keys *
1) "sex"
```

4、批量设置键值对：mset / mget

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> mset name jim sex male
OK
127.0.0.1:6379> mget name sex
1) "jim"
2) "male"
127.0.0.1:6379> keys *
1) "sex"
2) "name"
```

5、设置过期时间：expire

```bash
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> set name jim
OK
127.0.0.1:6379> get name
"jim"
127.0.0.1:6379> expire name 5  #5s后过期            
(integer) 1
127.0.0.1:6379> get name       #等待5s
(nil)
```

6、计数

```bash
127.0.0.1:6379> set num 1
OK
127.0.0.1:6379> incr num
(integer) 2
127.0.0.1:6379> get num
"2"
127.0.0.1:6379> incr num
(integer) 3
127.0.0.1:6379> get num
"3"
127.0.0.1:6379> incrby num 10
(integer) 13
127.0.0.1:6379> get num
"13"

127.0.0.1:6379> decr num
(integer) 12
127.0.0.1:6379> decr num
(integer) 11
127.0.0.1:6379> get num
"11"
127.0.0.1:6379> decrby num 5
(integer) 6
127.0.0.1:6379> get num
"6"
```

7、为 key 设置一个值并返回原值：getset

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> set name jim
OK
127.0.0.1:6379> getset name tom
"jim"
127.0.0.1:6379> get name
"tom"
```

## 列表

1、向 list 的左边（头部）添加元素：lpush

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> lpush nums 1
(integer) 1
127.0.0.1:6379> lpush nums 2
(integer) 2
127.0.0.1:6379> lpush nums 3
(integer) 3
127.0.0.1:6379> lrange nums 0 10
1) "3"
2) "2"
3) "1"
```

2、向 list 的右边（尾部）添加元素：rpush

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> rpush nums 1
(integer) 1
127.0.0.1:6379> rpush nums 2
(integer) 2
127.0.0.1:6379> rpush nums 3
(integer) 3
127.0.0.1:6379> lrange nums 0 10
1) "1"
2) "2"
3) "3"
```

3、从 list 中取出指定下表的元素： lindex

```bash
127.0.0.1:6379> lrange nums 0 10
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> lindex nums 0
"1"
127.0.0.1:6379> lindex nums 1
"2"
127.0.0.1:6379> lindex nums 2
"3"
127.0.0.1:6379> lindex nums 3
(nil)
127.0.0.1:6379> lindex nums 10
(nil)
```

4、list 实现队列

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> rpush nums 1 2 3
(integer) 3
127.0.0.1:6379> lrange nums 0 10
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> lpop nums
"1"
127.0.0.1:6379> lpop nums
"2"
127.0.0.1:6379> lpop nums
"3"
127.0.0.1:6379> lpop nums
(nil)
127.0.0.1:6379> lrange nums 0 10
(empty array)
```

5、list 实现栈

```bash
127.0.0.1:6379> flushdb
OK clear
127.0.0.1:6379> rpush nums 1 2 3
(integer) 3
127.0.0.1:6379> lrange nums 0 10
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> rpop nums
"3"
127.0.0.1:6379> rpop nums
"2"
127.0.0.1:6379> rpop nums
"1"
127.0.0.1:6379> rpop nums
(nil)
```

## 字典

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> hset people name jim
(integer) 1
127.0.0.1:6379> hset people age 20
(integer) 1
127.0.0.1:6379> hset people address beijing
(integer) 1
127.0.0.1:6379> hgetall people                         # key 和 value 间隔出现
1) "name"
2) "jim"
3) "age" 
4) "20"
5) "address"
6) "beijing"
127.0.0.1:6379> hget people name
"jim"
127.0.0.1:6379> hset people name tom                   # 因为是更新操作，所以返回 0
(integer) 0
127.0.0.1:6379> hget people name
"tom"
127.0.0.1:6379> hmset people sex male phone 18614023236 # 批量操作
OK
127.0.0.1:6379> hgetall people
 1) "name"
 2) "tom"
 3) "age"
 4) "20"
 5) "address"
 6) "beijing"
 7) "sex"
 8) "male"
 9) "phone"
10) "18614023236"
```

## 集合

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> sadd books java
(integer) 1
127.0.0.1:6379> sadd books java           # 重复添加
(integer) 0
127.0.0.1:6379> smembers books。          # 查看集合元素
1) "java"
127.0.0.1:6379> sadd books golang         # 再次添加
(integer) 1
127.0.0.1:6379> sadd books javascript nodejs # 再次添加
(integer) 2
127.0.0.1:6379> smembers books            # 查看集合元素
1) "javascript"
2) "golang"
3) "nodejs"
4) "java"
127.0.0.1:6379> sadd books golang          # 重复添加
(integer) 0
127.0.0.1:6379> sismember books java       # 查询某个 value 是否存在，相当于 contains
(integer) 1
127.0.0.1:6379> scard books                # 获取长度
(integer) 4
127.0.0.1:6379> spop books                 # 弹出一个
"nodejs"
```

## 有序列表

```bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> zadd books 9.1 "think in java"
(integer) 1
127.0.0.1:6379> zadd books 9.3 "think in java2"
(integer) 1
127.0.0.1:6379> zadd books 8.2 "go lang program"
(integer) 1
127.0.0.1:6379> zrange books 0 -1      # 按 score 排序列出(正序)，参数区间为排名范围
1) "go lang program"
2) "think in java"
3) "think in java2"
127.0.0.1:6379> zrevrange books 0 -1   # 按 score 逆序列出，参数区间为排名范围
1) "think in java2"
2) "think in java"
3) "go lang program"
127.0.0.1:6379> zcard books             # 相当于 count()
(integer) 3
127.0.0.1:6379> zscore books "think in java"      # 获取指定 value 的 score
"9.0999999999999996"
127.0.0.1:6379> zrank books "think in java"       # 内部 score 使用 double 类型进行存储，所以存在小数点精度问题
(integer) 1
127.0.0.1:6379> zrank books "think in java2"      # 排名
(integer) 2
127.0.0.1:6379> zrangebyscore books 0 9          # 根据分值区间遍历 zset
1) "go lang program"
127.0.0.1:6379> zrangebyscore books -inf 9.2 withscores   # 根据分值区间 (-∞, 8.91] 遍历 zset，同时返回分值。inf 代表 infinite，无穷大的意思。
1) "go lang program"
2) "8.1999999999999993"
3) "think in java"
4) "9.0999999999999996"
127.0.0.1:6379> zrem books "think in java"          # 删除 value
(integer) 1
127.0.0.1:6379> zrange books 0 -1
1) "go lang program"
2) "think in java2"
```
