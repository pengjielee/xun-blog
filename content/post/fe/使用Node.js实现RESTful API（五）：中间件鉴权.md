 1、添加授权中间件

src/middlewares/auth.js
```bash
const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ status: 0, message: '需要授权' });
    }
  })(req, res, next);
};

module.exports = {
  auth: auth,
};

```


2、使用中间件

修改 src/routes/user.js
```bash
const middleware = require('../middlewares/auth');

router.post('/profile', middleware.auth, Controller.profile);
```
 
修改 src/controllers/user.js
```bash
exports.profile = (req, res) => {
  res.send(req.user);
};
```

3、测试
```bash
curl -X POST http://localhost:3000/api/user/profile

返回：
{"status":0,"message":"需要授权"}
```


```bash
curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWEzNzE2YWYxNDk3MTQxNzNmN2I3NSIsImlhdCI6MTYyOTE2NDIxMiwiZXhwIjoxNjI5MTcxNDEyfQ.hJtv1i2GT78byiz4EFvrpOsIWU4RTlmlRpSpARiHCgg' -X POST http://localhost:3000/api/user/profile


返回：
{"_id":"611a3716af149714173f7b75","username":"pengjielee","email":"1@qq.com","password":"123456","create_date":"2021-08-16T09:59:50.236Z","update_date":"2021-08-16T09:59:50.236Z","__v":0}
```
