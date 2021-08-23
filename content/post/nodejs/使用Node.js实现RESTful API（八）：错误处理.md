



1、处理404

在Express里404不被认为是出错的结果，我们要做的只是在代码底部加一个中间件去处理没有返回的情况，并且手动返回一个404
```javascript
app.use(function(req, res, next){
  res.status(404).send('Not Found');
});
```


2、全局异常错误

定义错误处理的中间件跟定义普通的中间件没有什么区别，仅仅是参数必须定义为4个，它们定义如下 (err, req, res, next)
```javascript
//添加全局错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({ status: 500, message: '内部错误' });
});
```

3、注意位置
```javascript
//404错误处理
app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

//添加全局错误处理
app.use(function (err, req, res, next) {
  return res.status(500).json({ status: 500, message: '内部错误' });
});

module.exports = app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});
```
