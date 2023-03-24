## 未使用Web Worker计算斐波那契数列


![webworker01.gif](https://cdn.nlark.com/yuque/0/2020/gif/188528/1603442748471-040fa8c6-c3c8-4174-9e88-00f887c5e17a.gif#align=left&display=inline&height=462&margin=%5Bobject%20Object%5D&name=webworker01.gif&originHeight=462&originWidth=640&size=1290833&status=done&style=none&width=640)


- 计算较小数时，浏览器还可以快速响应；
- 计算大数时，浏览器的UI已经不可以操作了；
- 刷新一下页面，发现浏览器仍然处于卡死状态；



## 使用Web Worker计算斐波那契数列


1、创建项目


```
$ mkdir webworker-demo
$ cd webworker-demo
$ touch index.html main.js worker.js
```


2、index.html


```
<html lang="en">
  <head>
    <title>计算斐波那契数列（使用Web Worker）</title>
    <meta charset="UTF-8" /> 
  </head>
  <body>
    <div id="app">
      <h3>计算斐波那契数列（使用Web Worker）</h3>
      <div class="inner">
        <input type="number" id="number" />
        <button id="calc">calculate</button>
        <div id="result"></div>
      </div>
    </div>
  </body>
  <script src="main.js"></script>
</html>
```


3、main.js


```
const resultEle = document.querySelector('#result');
// 判断是否支持Worker
if(window.Worker){
	// 创建Worker
	const myWorker = new Worker("worker.js");
	// 监听消息
	myWorker.onmessage = e => {
  const result = e.data;
  resultEle.innerHTML = result;
	};
	// 处理错误
	myWorker.onerror = e => {
  resultEle.innerHTML = e.message;
	};
	document.querySelector('#calc').onclick = function(){
  resultEle.innerHTML = 'calculating...';
  var number = document.querySelector('#number').value;
  // 向worker.js发送数据
  myWorker.postMessage(number);
	}
}
```


4、worker.js


```
// 计算斐波那契数列
const Fibonacci = (n) => {
	if(n <= 0) { return 0; }
  if(n === 1) { return 1; }
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// 监听消息
onmessage = e => {
	const number = e.data;
	const result = Fibonacci(number);
	// 向main.js发送计算后的结果
	postMessage(result);
};
```


## 完整代码


[webworker-demo](https://github.com/pengjielee/learn-demo/tree/main/demos/webworker-demo)
