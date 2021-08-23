

1、创建项目目录
```javascript
mkdir my-expressjs-api && cd my-expressjs-api
```


2、初始化package.json文件
```javascript
npm init -y
```
3、安装express
```javascript
npm install express --save
```
4、创建src/server.js
```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});
```
5、更新package.json
```javascript
{
  ...
  "scripts": {
    "dev": "node src/server.js"
  },
  ...
}
```
6、运行项目
```javascript
npm run dev
```
输出：
```javascript
> node src/server.js

My app listening at http://localhost:3000
```
访问浏览器[http://localhost:3000](http://localhost:3000)，页面返回 `Hello World!`
