

1、安装passport及passport-jwt
```javascript
npm install passport passport-jwt
```
2、添加passport授权

修改server.js
```javascript
const passport = require("passport");
const passportJWT = require('passport-jwt');
const { port, secret } = require('./config');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require("./models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    async (jwtPayload, next) => {
      //根据jwt中的id，查找数据库中是否存在该用户
      const user = await User.findOne({ _id: jwtPayload.id });
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }
  )
);

const app = express();
app.use(passport.initialize());
```
3、安装jsonwebtoken
```javascript
npm install jsonwebtoken
```


4、用户登录成功后，生成token

修改src/controller/user.js
```javascript
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
	
  //根据用户名查找数据库是否存在该用户
  const dbUser = await User.findOne({ username });
  if (!dbUser) {
    return res.json({ status: 0, message: "用户不存在" });
  }
	
  //获取数据库中的用户id和密码
  const { _id, password: dbPassword } = dbUser;

  // 如果密码相符，则生成token
  if (password === dbPassword) {
    //获取加密密钥，token过期时间
    const { secret, expiresIn } = config;
    const payload = { id: _id };
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    res.json({ status: 1, message: "ok", data: { token: token } });
  } else {
    res.json({ status: 0, message: "用户名或密码错误" });
  }
};
```


5、添加需要授权的接口


 修改src/server.js
```javascript
app.get(
  '/admin',
  (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(401).json({ status: 0, message: '未授权' });
      }
    })(req, res, next);
  },
  (req, res) => {
    res.json({ status: 1, message: 'profile', data: req.user });
  }
);
```
6、测试

a. 直接访问 

```bash
curl http://localhost:3000/admin

返回：
{"status":0,"message":"未授权"}
```

b. 
调用登录接口获取token
```bash
curl http://localhost:3000/api/user/login -X POST -d '{"username": "pengjielee","password":"123456"}' --header "Content-Type: application/json"


返回：
{
  "status": 1,
  "message": "ok",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWEzNzE2YWYxNDk3MTQxNzNmN2I3NSIsImlhdCI6MTYyOTE2MzQzOSwiZXhwIjoxNjI5MTcwNjM5fQ.IMMdkEstOS9LWUFrvbtBqwGp5Clu6JM50BVE1469Bek"
  }
}
```
添加header头访问，[http://localhost:3000/admin](http://localhost:3000/admin)
```javascript
curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWEzNzE2YWYxNDk3MTQxNzNmN2I3NSIsImlhdCI6MTYyOTE2MzEzNywiZXhwIjoxNjI5MTcwMzM3fQ.W4FN5buKe7ngLVfCCH0cjFRjWAC1T9AqpyOpwY6H3AY' http://localhost:3000/admin

返回：
{
  "status": 1,
  "message": "profile",
  "data": {
    "_id": "611a3716af149714173f7b75",
    "username": "pengjielee",
    "email": "1@qq.com",
    "password": "123456",
    "create_date": "2021-08-16T09:59:50.236Z",
    "update_date": "2021-08-16T09:59:50.236Z",
    "__v": 0
  }
}
```




jwt
[https://jwt.io/](https://jwt.io/)


passport
[http://www.passportjs.org/](http://www.passportjs.org/)

passport-jwt
[https://www.passportjs.org/packages/passport-jwt/](https://www.passportjs.org/packages/passport-jwt/)
