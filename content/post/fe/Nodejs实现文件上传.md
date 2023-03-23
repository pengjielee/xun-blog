---
title: "Nodejs实现文件上传"
url: "post/nodejs-implements-file-uploading"
date: 2021-02-20T08:46:29+08:00
keywords: '文件上传,大文件上传,form上传,fileupload,ajax上传文件,拖拽上传,文件切片上传'
description: ''
tags: ['Nodejs']
categories: []
draft: true
---

## Form上传

1、前端

```html
<section>
  <h2>上传单个文件</h2>
  <form action="/api/upload/single" method="post" enctype="multipart/form-data">
    <input type="file" name="file" accept="image/*" required="true" />
    <button>上传</button>
  </form>
</section>
```

2、后端

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs-extra');
const multer = require('multer');

var app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const uploadDir = path.join(__dirname, './public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    fs.access(path.resolve(uploadDir, file.originalname), err => {
      if (err) {
        cb(null, file.originalname);
      } else {
        const name = path.parse(file.originalname).name;
        const ext = path.parse(file.originalname).ext;
        const timestamp = Date.now();
        const filename = name + '-' + timestamp + '' + ext;
        cb(null, filename);
      }
    });
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    file.originalname = file.originalname.toLowerCase();
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('只能上传png/jpg/jpeg格式图片'), false);
    }
    cb(null, true);
  },
});

// 上传单个文件
app.post('/api/upload/single', upload.single('file'), (req, res) => {
  res.json(req.file);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
```

## Form上传多个文件 

1、前端

input[type='file']设置multiple属性

```html
<section>
  <h2>上传多个文件</h2>
  <form action="/api/upload/more" method="post" enctype="multipart/form-data">
    <input type="file" name="files" accept="image/*" multiple required="true" />
    <button>上传</button>
  </form>
</section>
```

2、后端

```javascript
// 上传多个文件
app.post('/api/upload/more', upload.array('files'), (req, res) => {
  res.json(req.files);
});
```

## Ajax上传

1、前端html

```html
<section>
  <h2>Ajax上传文件</h2>
  <input type="file" name="files" accept="image/*" multiple style="display: none" id="ajaxInput" />
  <button id="ajaxBtn">上传</button>
  <progress id="ajaxProgress" max="100" value="0">0%</progress>
</section>
```

2、前端JS

```javascript
//上传文件
const uploadFiles = (files, progressBar) => {
  if (files.length <= 0) {
    alert('请至少选择一个文件');
    return;
  }

  var fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append('files', files[i]);
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.upload.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      var precent = Math.floor((e.loaded / e.total) * 100);
      if(progressBar) {
      	progressBar.value = precent;
      	progressBar.innerHTML = precent + '%';
      }
    } else {
      console.log('unable to compute progress information');
    }
  });
  xhr.open('POST', '/api/upload/more');
  xhr.send(fd);
}

//ajax上传
const ajaxUpload = function () {
  const ajaxInput = document.getElementById('ajaxInput');
  const ajaxBtn = document.getElementById('ajaxBtn');
  const ajaxProgress = document.getElementById('ajaxProgress');

  ajaxBtn.addEventListener(
    'click',
    function () {
      ajaxInput.click();
    },
    false,
  );

  ajaxInput.addEventListener(
    'change',
    function () {
      const files = this.files;
      uploadFiles(files, ajaxProgress);
    },
    false,
  );
};
ajaxUpload();
```

## 拖拽上传

1、前端Html

```html
<section>
  <h2>拖拽上传文件</h2>
  <div
    id="dropzone"
    class="dropzone"
    ondrop="dragUpload.drop(event)"
    ondragover="dragUpload.dragover(event)"
  >
    <span>Drop files here</span>
  </div>
  <progress id="dragProgress" max="100" value="0">0%</progress>
</section>
```

2、前端JS

```javascript
const dragUpload = {
  progressBar: document.getElementById('dragProgress'),
  drop: function (ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer;
    var files = data.files;

    uploadFiles(files, this.progressBar);
  },
  dragover: function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  },
};
```

## 大文件上传

1、前端Html

```html
<section>
  <h2>大上传文件</h2>
  <input type="file" name="file" required="true" id="fileInput" />
  <button id="fileUpload">上传</button>
</section>
```

2、前端JS

```javascript
//大文件上传
const bigFileUpload = function () {
  const fileInput = document.querySelector('#fileInput');
  const fileUpload = document.querySelector('#fileUpload');

  const CHUNK_SIZE = 2 * 1024 * 1024; //设置切片大小2MB

  //文件切片
  const slice = (file, piece = 1024 * 1024 * 5) => {
    const totalSize = file.size; // 文件总大小
    let start = 0; // 每次上传的开始字节
    let end = start + piece; // 每次上传的结尾字节
    const chunks = [];
    while (start < totalSize) {
      const blob = file.slice(start, end);
      chunks.push(blob);

      start = end;
      end = start + piece;
    }
    return chunks;
  };

  const obj2str = obj => {
    let w = Object.entries(obj);
    w.forEach((v, i) => {
      w[i] = v.join('=');
    });
    return w.join('&');
  };

  //上传切片
  const uploadChunk = formData => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject('error');
        }
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.open('POST', '/api/chunk/upload');
      xhr.send(formData);
    });
  };

  //合并切片
  const mergeChunk = data => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.onload = function (e) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject('error');
        }
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.open('POST', '/api/chunk/merge');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(obj2str(data));
    });
  };

  // 创建上传切片任务数组
  const createTasks = (file, chunks) => {
    let tasks = [];
    chunks.forEach((chunk, index) => {
      let fd = new FormData();
      fd.append('file', chunk);
      fd.append('index', index + 1);
      fd.append('name', file.name);
      fd.append('size', file.size);
      fd.append('total', chunks.length);
      fd.append('hash', file.name + file.size); //以文件名+大小作为文件唯一标识符
      tasks.push(uploadChunk(fd));
    });
    return tasks;
  };

  fileUpload.addEventListener(
    'click',
    function () {
      const file = fileInput.files[0];
      const chunks = slice(file, CHUNK_SIZE);
      const tasks = createTasks(file, chunks);
      Promise.all(tasks).then(res => {
        console.log(res);
        const data = {
          name: file.name,
          size: file.size,
          total: chunks.length,
          hash: file.name + file.size,
        };
        mergeChunk(data).then(res => console.log(res));
      });
    },
    false,
  );
};
bigFileUpload();
```

3、后端

```javascript
const uploadChunk = multer({ dest: uploadDir }).single('file');

// 上传文件切片
app.post('/api/chunk/upload', (req, res) => {
  uploadChunk(req, res, function (err) {
    if (err) {
      return;
    }
    const { name, total, index, size, hash } = req.body;
    //切片保存的目录（以hash值作为唯一目录名）
    const chunksPath = path.join(uploadDir, hash, '/');
    if (!fs.existsSync(chunksPath)) {
      fs.mkdirSync(chunksPath);
    }
    //重命名切片名称（添加切片序号）
    fs.renameSync(req.file.path, chunksPath + hash + '-' + index);
    res.status = 200;
    res.end('1');
  });
});

// 合并文件切片
app.post('/api/chunk/merge', (req, res) => {
  let { size, name, total, hash } = req.body;
  total = +total;
  const chunksPath = path.join(uploadDir, hash, '/');
  const filePath = path.join(uploadDir, name);
  const chunks = fs.readdirSync(chunksPath);
  // 创建存储文件
  fs.writeFileSync(filePath, '');
  if (chunks.length !== total || chunks.length === 0) {
    res.status = 200;
    res.end('chunk number error');
    return;
  }
  for (let i = 1; i <= total; i++) {
    //追加切片内容
    fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' + i));
    //删除切片文件
    fs.unlinkSync(chunksPath + hash + '-' + i);
  }
  //删除切片保存目录
  fs.rmdirSync(chunksPath);
  res.status = 200;
  res.end('success');
});
```

## 完整代码

server.js  
https://raw.githubusercontent.com/pengjielee/nodeapps/main/examples/upload/server.js  

index.html  
https://raw.githubusercontent.com/pengjielee/nodeapps/main/examples/upload/public/index.html  


## 注意

1、FormData添加多个文件时，不能直接把files添加进去。

```javascript
// 错误的
const files = fileInput.files;
var fd = new FormData();
fd.append('files', files);

// 正确的
const files = fileInput.files;
var fd = new FormData();
for (let i = 0; i < files.length; i++) {
  fd.append('files', files[i]);
}
```

2、XMLHttpRequest.setRequestHeader() 必须在 open() 之后、send() 之前调用 setRequestHeader() 方法。


