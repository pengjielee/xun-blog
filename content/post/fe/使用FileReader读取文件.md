---
title: "使用FileReader读取文件"
url: "post/use-filereader-to-read-the-file"
date: 2021-02-19T17:44:54+08:00
keywords: 'FileReader'
description: ''
tags: ['JavaScript']
categories: ''
draft: false
---

## HTML结构
```
<section class="card">
  <input type="file" class="input" accept="text/*" id="fileInput"/>
  <div class="preview" id="filePreview"></div>
</section>
```

## 读取为文本内容

```
const fileInput = document.getElementById("fileInput");
const filePreview = document.getElementById("filePreview");

fileInput.addEventListener(
  "change",
  function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (evt) {
      const content = evt.target.result;
      filePreview.innerHTML = content;
    };
    reader.readAsText(file);
  },
  false
);
```

## 读取为Base64字符串

```
const file = fileInput.files[0];
const reader = new FileReader();
reader.onload = function (evt) {
  const content = evt.target.result;
  const img = document.createElement('img');
  img.src = content;
  filePreview.innerHTML = '';
  filePreview.appendChild(img);
};
reader.readAsDataURL(file);
```

## 读取为二进制串

```
const file = fileInput.files[0];
const reader = new FileReader();
reader.onload = function (evt) {
  const content = evt.target.result;
};
reader.readAsBinaryString(file);
```


