#### 实现注册 


1、安装依赖
```javascript
npm install blueimp-md5 bcrypt
```
2、修改src/routes/user.js
```bash
const express = require('express');
const { header, body } = require('express-validator');
const router = express.Router();
const Controller = require('../controllers/user');

router.post(
  '/register',
  body('username').isLength({ min: 2 }).withMessage('用户名最小长度为2'),
  body('password').isLength({ min: 6 }).withMessage('密码最小长度为6'),
  Controller.register
);
```
3、修改src/controllers/user.js
```javascript
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("blueimp-md5");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const config = require("../config");

exports.register = async (req, res, next) => {
	//检查提交参数
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, message: errors.array() });
  }
  
  //获取提交的用户名和密码
  const { username, password } = req.body;
  
  //检查数据库中的用户名是否存在
  const dbUser = await User.findOne({ username });
  if (dbUser) {
    return res.json({ status: 0, message: "用户名已被占用，换一个吧" });
  }
  
  //生成加密盐
  const salt = await bcrypt.genSalt(10);
  //使用md5加密密码
  const encryptPassword = md5(password, salt);
  
  //保存用户信息
  const newUser = new User({
    username: username,
    password: md5Password,
    salt: salt, //加密盐也保存
  });
  const user = await newUser.save();
  
  if (!user) {
    res.json({ status: 0, message: "注册失败" });
  } else {
    res.json({ status: 1, message: "注册成功", data: user.username });
  }
};
```
#### 实现登录


1、修改src/routes/user.js
```javascript
// 用户登录
router.post(
  "/login",
  body("username")
    .isLength({ min: 2 })
    .withMessage("用户名最小长度为2"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("密码最小长度为6"),
  Controller.login
);
```
2、修改src/controllers/user.js
```javascript
exports.login = async (req, res, next) => {
  //检查提交参数
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, errors: errors.array() });
  }
	
  //获取提交的用户名和密码
  const { username, password } = req.body;

  //检查数据库中的用户是否存在
  const dbUser = await User.findOne({ username });
  if (!dbUser) {
    return res.json({ status: 9999, message: "用户不存在" });
  }
	
  //获取数据库中保存的用户信息
  const { _id, password: dbPassword, salt } = dbUser;
	
  //对密码进行加密
  const encryptPassword = md5(password, salt);
  const isMatch = encryptPassword === dbPassword;
  //如果密码正确
  if (isMatch) {
    
    const { secret, expiresIn } = config;
    // 生成token，把用户id存入
    const payload = { userid: _id };
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    //返回token
    res.json({ status: 1, message: "ok", data: { token: token } });
  } else {
    res.json({ status: 0, message: "用户名或密码错误" });
  }
};
```
#### 测试接口
​

1、注册接口
```javascript
curl http://localhost:3000/api/user/register -X POST -d '{"username": "pengjie","password":"123456"}' --header "Content-Type: application/json"

返回：
{"status":1,"message":"注册成功","data":"pengjie"}


curl http://localhost:3000/api/user/register -X POST -d '{"username": "pengjie","password":"123456"}' --header "Content-Type: application/json"

返回：
{"status":0,"message":"用户名已被占用，换一个吧"}

curl http://localhost:3000/api/user/register -X POST -d '{"username": "p","password":"1234"}' --header "Content-Type: application/json"

返回：
{"status":0,"message":[{"value":"p","msg":"用户名最小长度为2","param":"username","location":"body"},{"value":"1234","msg":"密码最小长度为6","param":"password","location":"body"}]}
```
2、登录接口
​

```javascript
curl http://localhost:3000/api/user/login -X POST -d '{"username": "pengjie","password":"123456"}' --header "Content-Type: application/json"

返回：
{"status":1,"message":"ok","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MTFjNjU1ZTJlNzEzZjQ0ZDExMDA1OGIiLCJpYXQiOjE2MjkyNTEwMzgsImV4cCI6MTYyOTI1ODIzOH0.fu0ztmNIi2yXreTuepl7EBoc5JkYk29h31IGa0EAcmI"}}

curl http://localhost:3000/api/user/login -X POST -d '{"username": "pengjie","password":"1234567"}' --header "Content-Type: application/json"

返回：
{"status":0,"message":"用户名或密码错误"}


curl http://localhost:3000/api/user/login -X POST -d '{"username": "p","password":"12345"}' --header "Content-Type: application/json"

返回：
{"status":0,"errors":[{"value":"p","msg":"用户名最小长度为2","param":"username","location":"body"},{"value":"12345","msg":"密码最小长度为6","param":"password","location":"body"}]}
```
