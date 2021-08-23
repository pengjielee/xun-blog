1、定义项目结构
```javascript
src
  /controllers
		/user.js
  /middlewares
  /models
     /user.js
  /routes
		 /user.js
	/config.js
	/server.js
```
2、定义Model


src/models/user.js
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'create_date', updatedAt: 'update_date' } }
);

module.exports = db.model('User', modelSchema);
```
3、定义Controller


src/controllers/user.js
```javascript
const Model = require('../models/user');

//获取用户列表
exports.list = async (req, res, next) => {
  let { page = 1, size = 10 } = req.query;
  page = parseInt(page);
  size = parseInt(size);
  const number = (page - 1) * size;
  const data = await Model.find({})
    .sort({ create_date: -1 })
    .limit(size)
    .skip(number);
  res.json({ status: 1, message: 'ok', data: data });
};

//获取用户详情
exports.detail = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findById(id);

  res.json({ status: 1, message: 'ok', data: data });
};

//添加用户
exports.add = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newModel = new Model({
    username,
    email,
    password,
  });
  const data = await newModel.save();
  if (!data) {
    res.json({ status: 0, message: 'error' });
  } else {
    res.json({ status: 1, message: 'ok', data: data });
  }
};

//删除用户
exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findByIdAndRemove(id);
  if (!data) {
    res.json({ status: 0, message: 'error' });
  } else {
    res.json({ status: 1, message: 'ok', data: data });
  }
};

//更新用户
exports.update = async (req, res, next) => {
  const { id, username, email, password } = req.body;
  const data = await Model.findByIdAndUpdate(id, {
    username,
    email,
    password,
  });
  if (!data) {
    res.json({ status: 0, message: 'error' });
  } else {
    res.json({ status: 1, message: 'ok', data: data });
  }
};
```


4、定义路由


src/routes/user.js
```javascript
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user');

router.get('/', Controller.list);
router.get('/:id', Controller.detail);
router.post('/', Controller.add);
router.delete('/:id', Controller.delete);
router.put('/', Controller.update);

module.exports = router;

```


5、安装body-parser
```javascript
npm install body-parser
```


6、更新server.js
```javascript
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const config = require('./config');
const { mongodb, port } = config;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

//创建monbodb数据库连接，并暴露全局变量db
global.db = mongoose.createConnection(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//添加user路由
const user = require("./routes/user");
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});
```


7、测试接口


a. 获取用户列表
```javascript
curl http://localhost:3000/api/user

返回：
{
  "status": 1,
  "message": "ok",
  "data": [
    {
      "_id": "611a0fcdd0d4bcd817972903",
      "name": "admin",
      "create_date": "2021-08-16T08:34:59.169Z",
      "update_date": "2021-08-16T08:34:59.169Z"
    }
  ]
}
```
b. 添加用户
```javascript
curl -d'username=admin&password=123456&email=386276251@qq.com' -X POST http://localhost:3000/api/user

返回：
{
  "status": 1,
  "message": "ok",
  "data": {
    "_id": "611a25cc0bb46d120c48d1ca",
    "username": "admin",
    "email": "386276251@qq.com",
    "password": "123456",
    "create_date": "2021-08-16T08:46:04.135Z",
    "update_date": "2021-08-16T08:46:04.135Z",
    "__v": 0
  }
}
```
c. 删除用户
```javascript
curl -X DELETE http://localhost:3000/api/user/611a0fcdd0d4bcd817972903

返回：
{
  "status": 1,
  "message": "ok",
  "data": {
    "_id": "611a0fcdd0d4bcd817972903",
    "name": "admin",
    "create_date": "2021-08-16T08:58:48.584Z",
    "update_date": "2021-08-16T08:58:48.584Z"
  }
}
```
d. 更新用户
```javascript
curl -d'id=611a291a757c7112578ec31a&username=admin1&password=1234561&email=386276251@qq.com' -X PUT http://localhost:3000/api/user
```
