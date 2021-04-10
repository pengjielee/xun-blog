---
title: "React高级：虚拟DOM"
date: 2021-03-13T15:37:28+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: true
---

## 什么是虚拟DOM

虚拟DOM就是一个普通的 JavaScript 对象，包含了 tag、props、children 三个属性。

虚拟 DOM 的优势是：

- diff 算法，减少 JavaScript 操作真实 DOM 的带来的性能消耗；
- 抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种GUI。

## 定义JSX

```javascript
// 使用jsx定义的元素
const element = <h1 title="foo">Hello</h1>
// 获取根节点
const container = document.getElementById("root");
// 插入元素到真实DOM树中
ReactDOM.render(element, container)
```

## JSX编译为React.createElement

```javascript
// 使用babel将jsx编译为React.createElement方法
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
​
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

## 使用Babel编译JSX

```bash
// 创建test目录
$ mkdri test 
$ cd test 

// 初始化项目
$ npm init -y

// 安装依赖
$ npm install --save-dev @babel/core @babel/cli
$ npm install --save-dev @babel/preset-react
```

创建babel.config.json
```json
{
  "presets": ["@babel/preset-react"]
  "comments": false
}
```

创建test.jsx
```jsx
const element = <h1 title="foo">Hello</h1>;

const hello = () => {
  return <h1 title="foo">Hello</h1>;
}

const foo = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
```

编译jsx
```bash
$ npx babel test.jsx --out-file test.js
```

编译后的test.js
```javascript
const hello = () => {
  return React.createElement(
    "h1",
    {
      title: "foo",
    },
    "Hello"
  );
};

const element = React.createElement(
  "h1",
  {
    title: "foo",
  },
  "Hello"
);

const foo = React.createElement(
  "div",
  {
    id: "foo",
  },
  React.createElement("a", null, "bar"),
  React.createElement("b", null)
);
```

## React.createElement的结果

```javascript
const element = React.createElement("h1", {
  title: "foo"
}, "Hello");

//虚拟DOM对象 
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
```

## 根据虚拟DOM构建真实DOM

```javascript
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}

const container = document.getElementById("root")

//根据类型创建元素
const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("")
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)
```

## 实现createElement 

```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
```

测试：
```
createElement("div")
Output:
{
  "type": "div",
  "props": { "children": [] }
}

createElement("div", null, a)
Output:
{
  "type": "div",
  "props": { "children": [a] }
}

createElement("div", null, a, b)
Output:
{
  "type": "div",
  "props": { "children": [a, b] }
}
```

完善：
```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

## 实现render 

```javascript
function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}
```

## More  

虚拟 DOM 到底是什么？  
https://juejin.cn/post/6844903870229905422   

build-your-own-react   
https://pomb.us/build-your-own-react/

