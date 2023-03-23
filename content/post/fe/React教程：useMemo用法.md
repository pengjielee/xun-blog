---
title: "React教程：useMemo用法"
url: "post/react-tutorial-usememo-usage"
thumbnail: "https://i.loli.net/2021/03/08/byc2eVAgKMCWkns.jpg"
date: 2021-03-09T09:11:48+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---


## 看代码  

```javascript
import React, { useState } from 'react';

// 计算斐波那契数
const fibc = n => {
  console.log('calculate...');
  if (n <= 2) {
    return 1;
  }
  return fibc(n - 1) + fibc(n - 2);
};

const Fibc = props => {
  let [number, setNumber] = useState(1);
  let [count, setCount] = useState(0);

  // 优化前
  const result = fibc(number);

  return (
    <div>
      <p>number: {number}</p>
      <p>count: {count}</p>
      <p>fibc result: {result}</p>
      <button onClick={() => setNumber(number + 1)}>add number</button>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  );
};

export default Fibc;
```

问题:   
1、我们有一个计算 斐波那契数 的函数，它依赖number值的改变；  
2、但是我们发现每次改变count值时，fibc()函数还是会重新调用，造成了大量的重复计算。


## 优化 

```javascript 
import React, { useState } from 'react';

const Fibc = props => {
  let [number, setNumber] = useState(1);
  let [count, setCount] = useState(0);

  // 优化前
  // const result = fibc(number);

  // 优化后
  const result = useMemo(() => fibc(number), [number]);

  return (
    <div>
      <p>number: {number}</p>
      <p>count: {count}</p>
      <p>fibc result: {result}</p>
      <button onClick={() => setNumber(number + 1)}>add number</button>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  );
};

export default Fibc;
```

此时：   

1、我们更新count的值时，fibc函数不会再调用了；  
2、只有在number值改变时，fibc函数才会重新调用；    


项目源码见（切换 tag 至 usememo）git checkout usememo： https://github.com/pengjielee/reactapp/tree/main/hello-world  