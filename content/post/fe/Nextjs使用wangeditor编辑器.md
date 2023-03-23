---
title: "Nextjs使用wangeditor"
thumbnail: ""
date: 2021-06-22T15:18:51+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: []
draft: true
---

## 安装

```bash
$ npm install wangeditor-for-react
```

## React中使用

```javascript
import { useState } from "react";
import ReactWEditor from "wangeditor-for-react";

function Editor() {
  const [value, setValue] = useState("");

  return <ReactWEditor defaultValue={value} onChange={setValue} />;
}

export default Editor;
```

## Nextjs中使用

```javascript
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactWEditor = dynamic(import("wangeditor-for-react"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const config = {
  height: 500,
  menus: ["bold", "link", "image"],
  showFullScreen: true,
  customUploadImg: function (resultFiles, insertImgFn) {
    // 获取上传的文件
    const file = resultFiles[0];
    // 上传图片，返回结果，将图片插入到编辑器中
    insertImgFn('imgUrl');
  },
};

function Editor() {
  const [value, setValue] = useState("");

  return (
    <ReactWEditor
      config={config}
      defaultValue={value}
      onChange={setValue}
    ></ReactWEditor>
  );
};

export default Editor;
```

## More 

wangeditor-for-react   
https://www.npmjs.com/package/wangeditor-for-react  

wangEditor   
https://github.com/wangeditor-team/wangEditor/  
https://www.wangeditor.com/doc/  