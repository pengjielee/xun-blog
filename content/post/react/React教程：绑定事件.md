---
title: "React教程：绑定事件"
url: "post/react-tutorial-bind-events"
thumbnail: ""
date: 2021-03-09T11:08:26+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: true
---


1、在`构造函数中`绑定事件 

```javascript
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('click');
    this.setState({
      number: this.state.number + 1,
    });
  }

  render() {
    return (
      <div>
        <span style={{ marginRight: '5px' }}>number: {this.state.number}</span>
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}
```

2、在`render`中绑定 this 

```javascript
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  handleClick() {
    console.log('click');
    this.setState({
      number: this.state.number + 1,
    });
  }

  render() {
    return (
      <div>
        <span style={{ marginRight: '5px' }}>number: {this.state.number}</span>
        <button onClick={this.handleClick.bind(this)}>click</button>
      </div>
    );
  }
}
```

3、通过`箭头函数`绑定

```
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  handleClick() {
    console.log('click');
    this.setState({
      number: this.state.number + 1,
    });
  }

  render() {
    return (
      <div>
        <span style={{ marginRight: '5px' }}>number: {this.state.number}</span>
        <button onClick={() => this.handleClick()}>click</button>
      </div>
    );
  }
}
```

4、传递参数 

```javascript
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  handleIncrease(steps) {
    console.log('click');
    this.setState({
      number: this.state.number + steps,
    });
  }

  handleDecrease(steps) {
    console.log('click');
    this.setState({
      number: this.state.number - steps,
    });
  }

  render() {
    return (
      <div>
        <span style={{ marginRight: '5px' }}>number: {this.state.number}</span>
        <button onClick={this.handleIncrease.bind(this, 2)}>increase</button>
        <button onClick={e => this.handleDecrease(2, e)}>decrease</button>
      </div>
    );
  }
}
```

5、函数组件中绑定事件及传递参数

```javascript
import React, { useState } from 'react';

const Item4 = () => {
  const [number, setNumber] = useState(0);

  const increase = () => {
    setNumber(number + 2);
  };

  const decrease = () => {
    setNumber(number - 2);
  };

  const add = (steps) => {
    setNumber(number + steps);
  }

  const subtract = (steps) => {
    setNumber(number - steps);
  }

  return (
    <div>
      <span style={{ marginRight: '5px' }}>number: {number}</span>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <button onClick={() => add(2)}>add</button>
      <button onClick={() => subtract(1)}>subtract</button>
    </div>
  );
};
```

项目源码见（切换 tag 至 bindevent）git checkout bindevent： https://github.com/pengjielee/reactapp/tree/main/hello-world

