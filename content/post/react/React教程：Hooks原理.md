---
title: "React Hooks原理"
url: "post/deep-dive-react-hooks"
thumbnail: ""
date: 2021-03-29T14:14:15+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---

## useState实现

```javascript
function useState(initialValue) {
  var _val = initialValue;

  function state(){
    return _val;
  }

  function setState(newVal){
    _val = newVal;
  }

  return [state, setState];
}
```

使用
```javascript
var [foo, setFoo] = useState(0) // 数组解构
console.log(foo()); //output: 0

setFoo(1);
console.log(foo()); //output: 1
```

## 在函数组件中使用

```javascript
function Counter() {
  const [count, setCount] = useState(0) // 和上文实现的一样
  return {
    click: () => setCount(count() + 1),
    render: () => console.log('render:', { count: count() })
  }
}

const C = Counter()
C.render() // render: { count: 0 }
C.click()
C.render() // render: { count: 1 }
```

## React中的state需要设计为一个变量而不是一个函数

1、有bug版

```javascript
function useState(initialValue) {
  var _val = initialValue;

  function setState(newVal){
    _val = newVal;
  }

  return [_val, setState];
}

var [foo, setFoo] = useState(0);
console.log(foo); //output: 0

setFoo(1);
console.log(foo); //output: 0
```

2、模块内部的闭包
 
```javascript
var MyReact = (function(){
  let _val;

  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    }
  }
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0) // 和上文实现的一样
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render:', { count: count })
  }
}

let App; 
App = MyReact.render(Counter); // render: { count: 0 }
App.click();
App = MyReact.render(Counter); // render: { count: 1 }
```

## 实现useEffect 

```javascript
var MyReact = (function(){
  let _val, _deps;

  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useEffect(callback, depArray){
      const hasNoDeps = !depArray; //没有依赖项目
      const hasChangedDeps = _deps ? !depArray.every((el,i) => el === _deps[i]) : true; //是否有改变的依赖项目
      if(hasNoDeps || hasChangedDeps){
        callback();
        _deps = depArray;
      }
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    }
  }
})();
```

使用
```javascript
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  MyReact.useEffect(() => {
    console.log('effect', count)
  }, [count])
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render', { count })
  }
}
let App
App = MyReact.render(Counter)
// effect 0
// render {count: 0}

App.click()
App = MyReact.render(Counter)
// effect 1
// render {count: 1}

App.noop()
App = MyReact.render(Counter)
// render {count: 1}

App.click()
App = MyReact.render(Counter)
// effect 2
// render {count: 2}
```

## 接收任意数量的state和effect

```javascript
var MyReact = (function () {
  let hooks = [],
    currentHook = 0; // hooks数组 和 当前hook的索引
  return {
    render(Component) {
      const Comp = Component(); // 执行 effects
      Comp.render();
      currentHook = 0; // 为下一次render重置hook索引
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // 当前hook处理完毕
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // 为了setState引用正确的闭包
      const setState = (newState) => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
})();
```

使用：
```javascript
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  const [text, setText] = MyReact.useState('foo') // 第二个 state hook!
  MyReact.useEffect(() => {
    console.log('effect', count, text)
  }, [count, text])
  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text })
  }
}
let App
App = MyReact.render(Counter)
// effect 0 foo
// render {count: 0, text: 'foo'}

App.click()
App = MyReact.render(Counter)
// effect 1 foo
// render {count: 1, text: 'foo'}

App.type('bar')
App = MyReact.render(Counter)
// effect 1 bar
// render {count: 1, text: 'bar'}

App.noop()
App = MyReact.render(Counter)
// // 没有effect执行
// render {count: 1, text: 'bar'}

App.click()
App = MyReact.render(Counter)
// effect 2 bar
// render {count: 2, text: 'bar'}
```

## 自定义hook 

```javascript
function useSplitURL(str) {
  const [text, setText] = MyReact.useState(str)
  const masked = text.split('.')
  return [masked, setText]
}
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com')
  return {
    type: txt => setText(txt),
    render: () => console.log({ text })
  }
}
let App
App = MyReact.render(Component)
// { text: [ 'www', 'netlify', 'com' ] }

App.type('www.reactjs.org')
App = MyReact.render(Component)
// { text: [ 'www', 'reactjs', 'org' ] }}
```

## More 

29行代码深入React Hooks原理   
https://juejin.cn/post/6844904128326434823   

Deep dive: How do React hooks really work?  
https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/     

ReactHooks原理及简单实现   
https://www.shymean.com/article/ReactHooks%E5%8E%9F%E7%90%86%E5%8F%8A%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0  


