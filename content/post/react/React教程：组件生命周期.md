---
title: "React教程：组件生命周期"
url: "post/react-tutorial-component-lifecycle"
thumbnail: ""
date: 2021-03-09T11:08:38+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---

## 版本1

```javascript
import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log('child constructor');
  }

  componentDidMount() {
    console.log('child didMount');
  }

  componentWillUnmount() {
    console.log('child willMount');
  }

  render() {
    console.log('child render');
    return <div>Child</div>;
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    console.log('parent constructor');
  }

  componentDidMount() {
    console.log('parent didMount');
  }

  componentWillUnmount() {
    console.log('parent willMount');
  }

  render() {
    console.log('parent render');

    return (
      <div>
        Parent
        <Child />
      </div>
    );
  }
}

export default Parent;
```

进入页面时页面输出：
parent constructor
parent render
child constructor
child render
child didMount
parent didMount

切换页面时输出：
parent willMount
child willMount


## 版本2：在父组件中更新state 

```
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    console.log('parent constructor');
  }

  componentDidMount() {
    console.log('parent didMount');
  }

  componentWillUnmount() {
    console.log('parent willMount');
  }

  handleClick() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  render() {
    console.log('parent render');

    return (
      <div>
        <div>
          <h1>Parent</h1>
          <div>counter: {this.state.counter} </div>
          <button onClick={this.handleClick.bind(this)}>click</button>
        </div>
        <Child />
      </div>
    );
  }
}
```

页面会重新render，此时输出：
parent render
child render




