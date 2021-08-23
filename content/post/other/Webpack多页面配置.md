## 准备


```
$ mkdir webpack-multi-page-demo
$ cd webpack-multi-page-demo
$ mkdir src
$ npm init -y
```


## 安装依赖


```
$ npm install webpack webpack-cli html-webpack-plugin --save-dev
```


## 创建多个页面js


```
$ touch home.js
```


```
//home.js
export default function index() {
  return 'Home Page';
} 
document.getElementById('app').innerHTML = index();
```


```
$ touch blog.js
```


```
//blog.js
export default function index() {
  return 'Blog Page';
} 
document.getElementById('app').innerHTML = index();
```


```
$ touch about.js
```


```
//about.js
export default function index() {
  return 'About Page';
} 
document.getElementById('app').innerHTML = index();
```


```
$ touch template.html
```


```
//template.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```


此时项目文件结构：


```
src
--about.js
--blog.js
--home.js
--template.html
```


## 创建webpack.config.js


```
$ touch webpack.config.js
```


```
//webpack.config.js
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//多个页面
const pages = ['home','blog','about'];
//入口
let entry = {};
//插件
let plugins = [];
const init = () => {
	pages.map(name => {
   plugins.push(
    new HtmlWebpackPlugin({
    minify: false, //是否压缩
      title: name,  //页面标题
      template: path.join(__dirname,`/src/template.html`), //模板文件
      filename: path.join(__dirname,`/dist/${name}.html`), //输出文件名
      inject: 'body',//脚本放置页面位置
      chunks: [name],
      hash: false
    })
   );
   entry[name] = `./src/${name}.js`
	});
}
init();
module.exports = {
  entry: entry,
  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: plugins
};
```


## 安装serve


```
$ npm install serve
```


## 添加npm scripts


```
{
	"scripts": {
      "clean": "rm -rf dist/",
      "build": "npm run clean && webpack --config webpack.config.js",
      "start": "serve dist"
  },
}
```


## 完整代码


[https://github.com/pengjielee/webpack-multi-page-demo](https://github.com/pengjielee/webpack-multi-page-demo)
