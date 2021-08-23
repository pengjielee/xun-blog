

1、安装依赖


```javascript
npm install chai chai-http mocha nyc --save-dev
```


2、更新package.json
```javascript
"scripts": {
  "test": "nyc -a mocha --recursive",
},
```


3、创建test目录
```javascript
mkdir test/test.js

目录结构：

/app
  --/src
	--/test
	----test.js	
	--package.json
```


4、更新src/server.js
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World!');
});

//404错误处理
app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

module.exports = app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});
```


5、更新test/test.js
```javascript
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');

let should = chai.should();
chai.use(chaiHttp);

describe('Server', () => {
  it('should respond status 200', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should GET the hello response', (done) => {
    chai
      .request(server)
      .get('/hello')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('Hello World!');
        done();
      });
  });

  it('should respond status 404', (done) => {
    chai
      .request(server)
      .get('/wrongUrl')
      .end((err, res) => {
        res.should.have.status(404);
        res.text.should.equal('Not Found');
        done();
      });
  });
});
```
6、运行 npm run test


输出：
```javascript
My app listening at http://localhost:3000


  Server
    ✔ should respond status 200
    ✔ should GET the hello response
    ✔ should respond status 404


  3 passing (37ms)
```


7、使用chai对express进行单元测试时报错 TypeError: app.address is not a function


错误信息：
```javascript
My app listening at http://localhost:3000


  Server
    1) should respond status 200
    2) should GET the hello response
    3) should respond status 404


  0 passing (17ms)
  3 failing

  1) Server
       should respond status 200:
     TypeError: app.address is not a function
      at serverAddress (node_modules/chai-http/lib/request.js:282:18)
      at new Test (node_modules/chai-http/lib/request.js:271:53)
      at Object.obj.<computed> [as get] (node_modules/chai-http/lib/request.js:239:14)
      at Context.<anonymous> (test/test.js:12:8)
      at processImmediate (internal/timers.js:456:21)
```


如何解决：


在server.js的app.listen(port)前加上 module.exports =
```javascript
app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});

//改为

module.exports = app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});
```
