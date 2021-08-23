1、安装express-validator
```bash
npm install express-validator
```
2、修改src/routes/user.js
```bash
const express = require("express");
const { header, body } = require("express-validator");
const router = express.Router();
const Controller = require('../controllers/user');


// 修改密码
router.post(
  "/changepwd",
  header("Authorization").exists(),
  Controller.changePwd
);


router.post(
  "/register",
  body("username")
    .isLength({ min: 5 })
    .withMessage("用户名最小长度为5"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("密码最小长度为6"),
  Controller.register
);

module.exports = router;
```
3、修改src/controllers/user.js
```bash
const { validationResult } = require("express-validator");

exports.changePwd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, message: errors.array() });
  }
  res.json({ status: 1, message: "修改密码" });
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, message: errors.array() });
  }
  res.json({ status: 1, message: "注册成功" });
};
```
4、测试
​

a. 注册接口
```bash
curl -X POST 'http://localhost:3000/api/user/register'

返回：
{"status":0,"message":[{"msg":"用户名最小长度为5","param":"username","location":"body"},{"msg":"密码最小长度为6","param":"password","location":"body"}]}


curl -X POST 'http://localhost:3000/api/user/register' -d'username=pengjielee&password=123456'

返回：
{"status":1,"message":"注册成功"}
```


b. 修改密码接口
```bash
curl -X POST 'http://localhost:3000/api/user/changepwd'

返回：
{"status":0,"message":[{"msg":"Invalid value","param":"authorization","location":"headers"}]}


curl -H 'Authorization: Bearer' -X POST 'http://localhost:3000/api/user/changepwd'

返回：
{"status":1,"message":"修改密码"}
```
