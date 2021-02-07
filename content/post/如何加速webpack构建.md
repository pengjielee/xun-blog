---
title: "如何加速webpack构建"
date: 2021-02-01T15:14:03+08:00
keywords: 'webpack,webpack构建'
description: 'webpack,webpack构建'
tags: ['webpack']
categories: ['Webpack']
draft: false
---

## 统计shell脚本执行时间

```
#!/bin/bash

#记录开始时间
start_time=$(date +%s)

#安装及构建
npm install
npm run build

#记录结束时间
end_time=$(date +%s)

#计算执行时间
cost_time=$[ $end_time-$start_time ]

#输出执行时间
echo $cost_time
echo "cost time is $(($cost_time/60))min $(($cost_time%60))s"
```

## 分析webpack编译时间

1、安装speed-measure-webpack-plugin
```
$ npm install --save-dev speed-measure-webpack-plugin
```

2、更新webpack配置

Change your webpack config from
```
const webpackConfig = {
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
}
```

to
```
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
});
```