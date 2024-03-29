---
title: "React高级：JSX"
date: 2021-03-13T13:46:50+08:00
keywords: ''
description: ''
tags: []
categories: ''
draft: true
---

## jsx句法

```javascript
/** @jsx h */
let foo = <div id="foo" className="foo">Hello!</div>
```

## h函数

```javascript
function h(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return {
    nodeName,
    attributes,
    children,
  };
}
```

## JSX编译

```javascript
h('div', {id: "foo", className: "foo"}, 'Hello!');
```

## JSX编译为虚拟DOM

```javascript
var foo = h('div', {id: "foo", className: "foo"}, 'Hello!');

//Output: 
{
  "nodeName": "div",
  "attributes": { "id": "foo", "className": "foo" },
  "children": ["Hello!"]
}
```

## render函数

```javascript
function render(vnode) {
  // Strings just convert to #text Nodes:
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  // create a DOM element with the nodeName of our VDOM element:
  let n = document.createElement(vnode.nodeName);

  // copy attributes onto the new node:
  let a = vnode.attributes || {};
  Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  // render (build) and then append child nodes:
  (vnode.children || []).forEach((c) => n.appendChild(render(c)));

  return n;
}
```

生成真实DOM：

```javascript
var foo = h('div', {id: "foo", className: "foo"}, 'Hello!');

render(foo);
//Output: <div id="foo" className="foo">Hello!</div>
```

## 使用JSX

```javascript
// JSX
let jsx = <div id="foo" className="foo">Hello!</div>;

// JSX编译
h('div', {id: "foo", className: "foo"}, 'Hello!')

// JSX -> VDOM:
let vdom = h('div', {id: "foo", className: "foo"}, 'Hello!');

// VDOM -> DOM:
let dom = render(vdom);

// add the tree to <body>:
document.body.appendChild(dom);
```

## More

WTF is JSX  
https://jasonformat.com/wtf-is-jsx/  

hyperscript   
https://github.com/hyperhype/hyperscript  