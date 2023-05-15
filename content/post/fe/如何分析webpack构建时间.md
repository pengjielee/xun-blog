---
title: "如何分析webpack构建时间"
url: "post/how-do-analyze-webpack-builds-time"
date: 2021-01-14T15:14:03+08:00
keywords: "webpack,webpack构建,构建时间"
description: 'webpack,webpack构建'
tags: ['Webpack']
categories: ''
draft: false
---

## 统计shell脚本执行时间

```Bash
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

```JavaScript
$ npm install --save-dev speed-measure-webpack-plugin
```

2、更新webpack配置

Change your webpack config from
```JavaScript
const webpackConfig = {
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
}
```

to
```JavaScript
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [
	  new MyPlugin(), 
	  new MyOtherPlugin()
  ],
});
```