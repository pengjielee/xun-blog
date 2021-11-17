---
title: "React高级：性能优化"
date: 2021-03-13T17:27:11+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---


## 创建项目

```bash
$ npx create-react-app react-try 
```

## 情景一：shouldComponentUpdate

Child.js

```javascript
import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('child did mount');
  }

  componentWillUnmount() {
    console.log('child will mount');
  }

  render() {
    console.log('child render');
    return (
      <div>
        <h1>This is Child</h1>
      </div>
    );
  }
}

export default Child;
```

Parent.js

```javascript
import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.handleTime = this.handleTime.bind(this);
  }

  componentDidMount() {
    console.log('parent did mount');
  }

  componentWillUnmount() {
    console.log('parent will mount');
  }

  handleTime() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    console.log('parent render');
    return (
      <div>
        <h1>This is Parent</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleTime}>更新时间</button>
        <Child />
      </div>
    );
  }
}

export default Parent;
```

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './components/Parent';

ReactDOM.render(
  <React.StrictMode>
    <Parent />
  </React.StrictMode>,
  document.getElementById('root')
);
```

页面初始渲染时，控制台输出：
```  
parent render  
child render  
child did mount   
parent did mount  
```


点击更新时间按钮时，控制台输出：
```  
parent render  
child render  
```

问题：我们发现子组件Child.js没有任何变化，也重新渲染了。这是一个优化的点。

我们在Child.js中添加以下代码：

```javascript
// 组件是否应该更新，默认返回的是true，这里我们返回false，不进行子组件的重新渲染。
shouldComponentUpdate() {
  return false;
}
```

组件卸载顺序为：
```
parent will mount
child will mount
```

## 情景二：shouldComponentUpdate

我们子组件里，依赖一个父组件里传过来的属性number，我们希望number改变时，才去渲染子组件。而不是父组件里每次更新，子组件都会重新渲染。

Child.js

```javascript
import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('child did mount');
  }

  componentWillUnmount() {
    console.log('child will mount');
  }

  render() {
    console.log('child render');
    return (
      <div>
        <h1>This is Child</h1>
        <p>from parent number: {this.props.number}</p>
      </div>
    );
  }
}

export default Child;
```

Parent.js

```javascript
import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      number: 0,
    };

    this.handleTime = this.handleTime.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
  }

  componentDidMount() {
    console.log('parent did mount');
  }

  componentWillUnmount() {
    console.log('parent will mount');
  }

  handleTime() {
    this.setState({
      date: new Date()
    })
  }

  handleNumber(){
    this.setState((state, props) => {
      return {
        number: state.number + 1
      }
    });
  }

  render() {
    console.log('parent render');
    const number = this.state.number;
    return (
      <div>
        <h1>This is Parent</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <p>number: {number}</p>
        
        <Child number={number}/>

        <div>
          <button onClick={this.handleTime}>更新时间</button>
          <button onClick={this.handleNumber}>更新数字</button>
        </div>
      </div>
    );
  }
}

export default Parent;
```

父组件中，我们调用更新时间、更新数字时，子组件都去重新渲染了。怎么优化呢？

Child.js

```javascript
//我们判断下次接受的新属性是否与当前属性值相等，如果相等，我们不去重新渲染
shouldComponentUpdate(nextProps) {
  if(nextProps.number === this.props.number){
    return false;
  }
  return true;
}
```

这时我们再点击更新时间时，子组件不会渲染，只有点击更新数字时，子组件才会渲染。


## More 


浅谈React性能优化的方向   
https://juejin.cn/post/6844903865926549511  

React 性能优化，你需要知道的几个点  
https://www.jianshu.com/p/333f390f2e84  

react性能优化  
https://segmentfault.com/a/1190000016259872