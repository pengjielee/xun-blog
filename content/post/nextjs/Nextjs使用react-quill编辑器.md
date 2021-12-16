---
title: "Nextjs使用react-quill编辑器"
thumbnail: ""
date: 2021-06-22T14:53:53+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: []
draft: true
---

## 安装

```javascript
$ npm install react-quill --save

// or

$ yarn add react-quill
```

## React中使用 

```javascript
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyComponent() {
  const [value, setValue] = useState("");

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
```

## Nextjs中使用

```javascript
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [[{ header: 1 }, "bold", { color: [] }], ["clean"]],
};

export default function Editor(props) {
  const [value, setValue] = useState("");

  return (
    <QuillNoSSRWrapper
      theme="snow"
      value={value}
      modules={modules}
      onChange={setValue}
    />
  );
}
```

## 封装组件  

```javascript
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const defaultModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const defaultFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function QuillEditor(props) {
  let { value, onChange, modules, formats } = props;

  const handleChange = (value) => {
    //调用父组件的change方法，把value传回去
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  modules = modules || defaultModules;
  formats = formats || defaultFormats;

  return (
    <QuillNoSSRWrapper
      value={value}
      onChange={(value) => handleChange(value)}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
}
```

## 问题

next.js中如何获取quill编辑器的实例呢？

## More 

react-quill  
https://github.com/zenoamaro/react-quill   

