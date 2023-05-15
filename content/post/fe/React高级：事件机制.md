---
title: "React高级：事件机制"
date: 2021-03-13T17:24:53+08:00
keywords: ''
description: ''
tags: ['React']
categories: ''
draft: true
---

## 1、

```javascript
import React from "react";

export default class App extends React.Component {
  innerClick = () => {
    console.log("A: react inner click.");
  };

  outerClick = () => {
    console.log("B: react outer click.");
  };

  componentDidMount() {
    document.getElementById("outer").addEventListener("click", () => {
      console.log("C: native outer click");
    });
    document.getElementById("inner").addEventListener("click", () => {
      console.log("D: native inner click");
    });
  }

  render() {
    return (
      <div id="outer" onClick={this.outerClick}>
        <button id="inner" onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    );
  }
}
```

输出：
```
D: native inner click
C: native outer click
A: react inner click.
B: react outer click.
```

## 2、

```javascript
export default class App extends React.Component {
  innerClick = (e) => {
    console.log("A: react inner click.");
    e.stopPropagation();
  };

  outerClick = () => {
    console.log("B: react outer click.");
  };

  componentDidMount() {
    document.getElementById("outer").addEventListener("click", () => {
      console.log("C: native outer click");
    });
    document.getElementById("inner").addEventListener("click", () => {
      console.log("D: native inner click");
    });
  }

  render() {
    return (
      <div id="outer" onClick={this.outerClick}>
        <button id="inner" onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    );
  }
}
```

输出：
```
D: native inner click
C: native outer click
A: react inner click.
```

## 3、

```javascript
import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props)
    document.addEventListener('click', () => {
      console.log('C: native document click')
    })
  }

  innerClick = () => {
    console.log('A: react inner click.')
  }

  outerClick = () => {
    console.log('B: react outer click.')
  }

  render() {
    return (
      <div id='outer' onClick={this.outerClick}>
        <button id='inner' onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    )
  }
}
```

输出：
```
A: react inner click.
B: react outer click.
C: native document click
C: native document click
```

## 4、

```javascript
import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props)
    document.addEventListener('click', () => {
      console.log('C: native document click')
    })
  }

  innerClick = (e) => {
    console.log('A: react inner click.')
    e.nativeEvent.stopImmediatePropagation()
  }

  outerClick = () => {
    console.log('B: react outer click.')
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      console.log('D: native document click')
    })
  }

  render() {
    return (
      <div id='outer' onClick={this.outerClick}>
        <button id='inner' onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    )
  }
}
```

输出：
```
A: react inner click.
B: react outer click.
```


## 事件委托

对于li的点击事件，绑定在父元素ul上；

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  const $ul = document.querySelector('ul')
  $ul.addEventListener('click', (e) => {
    console.log(e.target.innerText)
  });
</script>
```


## 事件执行顺序

```html
<element1>
	<element2></element2>
</element1>
```

两者都有一个onClick事件处理程序。如果用户单击element2，他将在element1和element2中都引起click事件。但是哪个事件首先触发？应该先执行哪个事件处理程序？换句话说，事件顺序是什么？

毫不奇怪，在过去的糟糕日子里，Netscape和Microsoft得出了不同的结论。

Netscape说，element1上的事件首先发生。这称为事件捕获。
Microsoft坚持认为element2上的事件优先。这称为事件冒泡。

1、事件捕获

使用事件捕获时，element1的事件处理程序首先触发，element2的事件处理程序最后触发。

2、事件冒泡

使用事件冒泡时，element2的事件处理程序首先触发，element1的事件处理程序最后触发。

3、W3C模型  

W3C事件模型中发生的任何事件 都首先被捕获，直到到达目标元素，然后再次冒泡。

```
//如果它的最后一个参数是true为捕获阶段设置的事件处理程序，则如果它是 false为冒泡阶段设置的事件处理程序。
addEventListener()
```

## DOM事件模型：例1

```html
<style>
.outer {
  width: 150px;
  height: 150px;
  background: #ddd;
}
</style>
<div id="outer" class="outer">
  <button id="btn">Button</button>
</div>
<script>
  const $outer = document.querySelector('#outer')
  const $btn = document.querySelector('#btn')

  document.addEventListener('click', () => {
    console.log('document click')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 1')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 2')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 3')
  })

  $btn.addEventListener('click', () => {
    console.log('button click')
  })
</script>
```

addEventListener的第三个参数默认为false，表示在冒泡阶段捕获事件。事件触发的顺序是从下至上（从里到外），同一个元素上的事件按照绑定的顺序执行
。

测试：
```
//点击页面空白，控制台输出：
document click

//点击outer区域，控制台输出：
div click 1
div click 2
div click 3
document click

//点击按钮，控制台输出：
button click
div click 1
div click 2
div click 3
document click
```

## DOM事件模型：例2阻止冒泡

```html
<style>
.outer {
  width: 150px;
  height: 150px;
  background: #ddd;
}
</style>
<div id="outer" class="outer">
  <button id="btn">Button</button>
</div>
<script>
  const $outer = document.querySelector('#outer')
  const $btn = document.querySelector('#btn')

  document.addEventListener('click', () => {
    console.log('document click')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 1')
  })

  $outer.addEventListener('click', (e) => {
  	e.stopPropagation()
    console.log('div click 2')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 3')
  })

  $btn.addEventListener('click', () => {
    console.log('button click')
  })
</script>
```

新加了一句 e.stopPropagation()，其作用是阻止事件扩散，所以 document 上的事件监听函数就不会执行了。

测试：
```
//点击页面空白，控制台输出：
document click

//点击outer区域，控制台输出：
div click 1
div click 2
div click 3

//点击按钮，控制台输出：
button click
div click 1
div click 2
div click 3
```

## DOM事件模型：例3

```html
<style>
.outer {
  width: 150px;
  height: 150px;
  background: #ddd;
}
</style>
<div id="outer" class="outer">
  <button id="btn">Button</button>
</div>
<script>
  const $outer = document.querySelector('#outer')
  const $btn = document.querySelector('#btn')

  document.addEventListener('click', () => {
    console.log('document click')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 1')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 2')
  },true)

  $outer.addEventListener('click', (e) => {
    console.log('div click 3')
  },true)

  $btn.addEventListener('click', () => {
    console.log('button click')
  })
</script>
```

这里把 div 的两个事件监听函数绑定在捕获阶段。当事件触发的时候会先执行捕获阶段的监听函数，执行顺序是从上而下（从外到里），相同元素上仍然按照绑定顺序执行。

测试：
```
//点击页面空白，控制台输出：
document click

//点击outer区域，控制台输出：
div click 2
div click 3
div click 1
document click

//点击按钮，控制台输出：
div click 2
div click 3
button click
div click 1
document click
```

## DOM事件模型：例4

```html
<style>
.outer {
  width: 150px;
  height: 150px;
  background: #ddd;
}
</style>
<div id="outer" class="outer">
  <button id="btn">Button</button>
</div>
<script>
  const $outer = document.querySelector('#outer')
  const $btn = document.querySelector('#btn')

  document.addEventListener('click', () => {
    console.log('document click')
  })

  $outer.addEventListener('click', (e) => {
    console.log('div click 1')
  })

  $outer.addEventListener('click', (e) => {
    e.stopImmediatePropagation()
    console.log('div click 2')
  },true)

  $outer.addEventListener('click', (e) => {
    console.log('div click 3')
  },true)

  $btn.addEventListener('click', () => {
    console.log('button click')
  })
</script>
```

新增了 e.stopImmediatePropagation()，该方法是加强版的 stopPropagation，不仅可以阻止向其他元素扩散，也可以在本元素内部阻止扩散。

测试：
```
//点击页面空白，控制台输出：
document click

//点击outer区域，控制台输出：
div click 2

//点击按钮，控制台输出：
div click 2
```


## More

通过几个例子来理解 React 的事件系统  
https://mp.weixin.qq.com/s/NLJlcdhMcPPgrS8KrnmQ9A  

Event order  
https://www.quirksmode.org/js/events_order.html#link4