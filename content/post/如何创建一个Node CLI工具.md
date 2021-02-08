---
title: "如何创建一个Node CLI工具"
url: "post/"
date: 2020-10-15T17:08:27+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: false
---

## 开始

我们的命令行工具起名xun-cli，实现功能有：
- 显示当前时间；
- 查询天气；
- 查看本地IP；

## 创建目录

```
$ mkdir xun-cli
$ cd xun-cli 

$ npm init -y

$ mkdir src 
$ cd src
$ touch index.js
```

## 问好

1、index.js
```
#!/usr/bin/env node

console.log("hello xun-cli")
```

2、执行
```
$ node src/index.js
//output: hello xun-cli
```

## 输出一个漂亮的LOGO

1、安装依赖
```
$ npm install chalk //在命令行输出各种颜色的文字
$ npm install figlet //在命令行输出艺术字
```

2、index.js
```
#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");

// 输出一个漂亮的LOGO
console.log(chalk.yellow(figlet.textSync("xun-CLI", {
  horizontalLayout: "full"
})));
```

3、执行
```
$ node src/index.js

output：
 __  __  _   _   _   _            ____   _       ___
 \ \/ / | | | | | \ | |          / ___| | |     |_ _|
  \  /  | | | | |  \| |  _____  | |     | |      | |
  /  \  | |_| | | |\  | |_____| | |___  | |___   | |
 /_/\_\  \___/  |_| \_|          \____| |_____| |___|
```

## 显示当前时间

1、安装依赖
```
$ npm install yargs //构建可交互的命令行工具
```

2、index.js
```
#!/usr/bin/env node

const yargs = require("yargs");

yargs.scriptName("xun-cli")
  .usage('$0 <cmd> [args]')
  .command('date', '显示当前日期', (yargs) => {}, function (argv) {
    console.log(`Current Date: ${new Date()}`)
  })
  .help()
  .argv
```

3、执行

```
node src/test.js date

//output: Current Date: Fri Oct 16 2020 10:57:51 GMT+0800 (China Standard Time)
```

4、格式化日期输出
```
$ npm install dayjs

const dayjs = require("dayjs");
const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
```

## 查询天气信息

1、安装依赖
```
$ npm install node-fetch //发起网络请求
```

2、准备天气API，我们使用[和风天气](https://dev.heweather.com/docs/start/)API服务：

a. 获取天气信息接口：
```
请求： 
https://devapi.heweather.net/v7/weather/now?key=ea27fd16a12c45938ae787b4059fdaba&location=101010100

响应：
{
	"code": "200",
	"updateTime": "2020-10-16T11:11+08:00",
	"fxLink": "http://hfx.link/2ax1",
	"now": {
		"obsTime": "2020-10-16T10:40+08:00",
		"temp": "14",
		"feelsLike": "11",
		"icon": "100",
		"text": "晴",
		"wind360": "6",
		"windDir": "北风",
		"windScale": "3",
		"windSpeed": "12",
		"humidity": "32",
		"precip": "0.0",
		"pressure": "1021",
		"vis": "30",
		"cloud": "91",
		"dew": "-3"
	},
	"refer": {
		"sources": ["Weather China"],
		"license": ["no commercial use"]
	}
}
```

b. 我们只准备几个热门城市
```
const hotCity = {
  "beijing": "101010100",
  "shanghai": "101020100",
  "tianjin": "101030100",
  "hangzhou": "101210101",
  "chengdu": "101270101",
  "zhenzhou": "101180101"
}
```

c. 和风天气常用地区列表
https://github.com/qwd/LocationList

3、index.js

```
const fetch = require("node-fetch");

yargs.scriptName("xun-cli")
  .usage('$0 <cmd> [args]')
  .command('weather [city]', '显示天气（默认beijing）', (yargs) => {
  	yargs.positional('city', {
      type: 'string',
      default: 'beijing',
      describe: '要查询的城市'
    })
  }, async function (argv) {
    const city = argv.city.toLowerCase();
    const location = hotCity[city] ? hotCity[city] : '';
    if(location){
      const res = await fetch(`https://devapi.heweather.net/v7/weather/now?key=ea27fd16a12c45938ae787b4059fdaba&location=${location}`);
      const data = await res.json();
      if(data.code === '200'){
        const now = data.now;
        console.log(`${city}: ${now.text}，${now.temp}摄氏度，${now.windDir}`)
      } else {
        console.log(`Ops, something error!`)
      }
    } else {
      console.log(`${city} does not support.`)
    }
  })
  .help()
  .argv
```

4、执行
```
$ node src/test.js weather
//output: beijing: 晴，14摄氏度，北风
```

## 查看本地IP

1、安装依赖
```
$ npm install shelljs
```

2、查询本地IP命令
```
$ ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6 | awk '{print $2}' | tr -d 'addr:'
// 172.18.0.229
```

3、index.js
```
yargs.scriptName("xun-cli")
  .usage('$0 <cmd> [args]')
  .command('ip', '显示本地IP', (yargs) => {
  }, function (argv) {
    var ip_address = shell.exec("ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6 | awk '{print $2}' | tr -d 'addr:'",{silent:true}).stdout;
    console.log(`Local IP: ${ip_address}`)
  })
  .help()
  .argv
```

4、执行
```
$ node src/test.js ip
//output: Local IP: 172.18.0.229
```

## 全局访问脚本

在项目根目录中运行npm link会将符号文件链接到系统路径，从而可以在任何位置访问它。

1、更新package.json
```
{
	"bin": {
	  "xun-cli": "src/index.js"
	},
}
```

2、npm link
```
$ cd xun-cli
$ npm link
```

3、执行
```
$ cd ~
$ xun-cli --help
/*
xun-cli <cmd> [args]

Commands:
  xun-cli date            显示当前日期
  xun-cli weather [city]  显示天气（默认beijing）
  xun-cli ip              显示本地IP

Options:
  --version  Show version number                                       [boolean]
  --help     Show help
*/

$ xun-cli --version
// 1.0.0

$ xun-cli date
// Current Date: 2020-10-16 11:32:02

$ xun-cli weather
// Beijing: 晴，14摄氏度，北风

$ xun-cli weather tianjin
// Tianjin: 阴，13摄氏度，北风

$ xun-cli ip
// Local IP: 172.18.0.229
```

## 项目完整代码

[xun-cli](https://github.com/pengjielee/xun-cli)

## 巨人肩上

chalk  
https://github.com/chalk/chalk  

figlet  
https://github.com/patorjk/figlet.js   

yargs     
https://github.com/yargs/yargs    

node-fetch   
https://github.com/node-fetch/node-fetch    

dayjs  
https://github.com/iamkun/dayjs   

shelljs   
https://github.com/shelljs/shelljs   




