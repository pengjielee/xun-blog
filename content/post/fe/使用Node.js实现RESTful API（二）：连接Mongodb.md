1、操作mongodb
```javascript
# 创建数据库
$ use testdb;
switched to db testdb

# 查看数据库，刚刚创建的并未显示
$ show dbs;
admin     0.000GB
config    0.000GB
local     0.000GB

# 插入一条记录
$ db.testdb.insert({"name":"testdb"})
WriteResult({ "nInserted" : 1 })

# 再次查看数据库
$ show dbs;
admin     0.000GB
config    0.000GB
local     0.000GB
testdb    0.000GB

# 创建集合
$ db.createCollection("users")
{ "ok" : 1 }

# 往集合中插入一条记录
$ db.users.insert({"name" : "admin"})
WriteResult({ "nInserted" : 1 })

# 查看集合
$ show tables; 
//or show collections;

# 查看集合中的数据	
$ db.users.find()
{ "_id" : ObjectId("611a0fcdd0d4bcd817972903"), "name" : "admin" }
```
2、创建配置文件

src/config.js
```javascript
let config = {
	port: 3000,
	mongodb: 'mongodb://localhost:27017/testdb',
}

module.exports = config;
```
3、安装mongoose
```javascript
npm install mongoose
```
4、连接mongodb
```javascript
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { mongodb, port } = require("./config");

// 创建mongodb数据库连接，并暴露在全局global
global.db = mongoose.createConnection(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 定义User模型
const User = db.model('User', new Schema({
  name: String,
}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 定义路由
app.get("/users", async (req, res) => {
  // 查看所有用户
  const list = await User.find({});
  res.send(list);
});

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});

```
5、运行项目
```javascript
$ npm run dev
```
访问 [http://localhost:3000/users](http://localhost:3000/users)，输出：[{"_id":"611a0fcdd0d4bcd817972903","name":"admin"}]
