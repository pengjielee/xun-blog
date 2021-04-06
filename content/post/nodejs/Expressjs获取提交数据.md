---
title: "Express获取提交数据"
url: "post/express-gets-the-commit-data"
date: 2021-02-20T14:37:50+08:00
keywords: 'expressjs,获取get数据,获取post数据,'
description: ''
tags: ['Nodejs']
categories: []
draft: true
---

## 获取url中的参数

```javascript
app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send(id);
});
```

请求：/blog/1   
输出：1 

## 获取url中?后的参数

```javascript
app.get('/blog', (req, res) => {
  const query = req.query;
  res.send(query);
});
```

请求：/blog?id=1&name=jie   
输出：{"id":"1","name":"jie"}

## 获取post提交的数据

Enctype: application/x-www-form-urlencoded (default)

```javascript
app.post('/blog', (req, res) => {
  res.send(req.body);
});
```

```javascript
<form action="/blog" method="post">
  <div class="form-group">
    <label>
      标题：
      <input type="text" name="title" />
    </label>
  </div>
  <div class="form-group">
    <label>
      日期：
      <input type="date" name="date" />
    </label>
  </div>
  <button>submit</button>
</form>
```

提交form，输出：{"title":"user","date":"2021-02-05"}

## 获取post提交的数据

Enctype: multipart/form-data

```javascript
const formidable = require('formidable');
const uploadDir = path.join(__dirname, './public/uploads');

app.post('/api/user', (req, res, next) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});
```

```html
<form action="/api/user" method="post" enctype="multipart/form-data">
  <div class="form-group">
    <label>
      昵称
      <input type="text" required name="nickname" />
    </label>
  </div>
  <div class="form-group">
    <label>
      头像
      <input type="file" required name="avatar" />
    </label>
  </div>
  <button>submit</button>
</form>
```

提交表单，输出：
```json
{
  "fields": { "nickname": "12212" },
  "files": {
    "avatar": {
      "size": 8795,
      "path": "/examples/params/public/uploads/upload_9c0eb3aba2c76ce09f2db6581e41c5aa.png",
      "name": "logo.png",
      "type": "image/png",
      "mtime": "2021-02-20T06:57:00.849Z"
    }
  }
}
```

## 完整代码 

app.js  
https://raw.githubusercontent.com/pengjielee/nodeapps/main/examples/params/app.js 

index.html 
https://raw.githubusercontent.com/pengjielee/nodeapps/main/examples/params/public/index.html 

