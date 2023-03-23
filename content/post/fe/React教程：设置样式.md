---
title: "React教程：设置样式"
url: "post/react-tutorial-set-the-style"
thumbnail: "https://i.loli.net/2021/03/08/e8c6JDXzFbVZ7Pw.jpg"
date: 2021-03-09T09:11:36+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---

## 设置行内样式 

1、使用行内 style 样式

```javascript
import React from 'react';

const Home = props => {
  const name = 'Home Page';
  return (
    <div
      style={{
        backgroundColor: '#ddd',
        color: 'red',
        fontSize: '30px',
        paddingLeft: '20px',
      }}>
      { name }
    </div>
  );
};

export default Home;
```

注意：

- 行内样式的属性名需使用驼峰命名。  
- 行内样式需要使用双大括号`{{ }}`，变量用单个大括号`{ }`  

2、使用分离的 style 对象 

```javascript
import React from 'react';

const Home = props => {
  const name = 'Home Page';

  const nameStyle = {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '30px',
    paddingLeft: '20px',
    marginTop: '10px',
  };
  return (
    <div>
      <div style={nameStyle}>{name}</div>
    </div>
  );
};

export default Home;
```

## 设置多个class 

1、使用join拼接
```
<div className={['title', active ? 'active' : ''].join(' ')}>
    About Page
</div>
```

2、使用es6模板 

```javascript
<div className={`title ${active ? 'active' : ''}`}>About Page</div>
```

3、完整代码 

style.css

```css
.title {
  color: #000;
}

.title.active {
  color: red;
}
```

about.js

```javascript
import React, { useState } from 'react';

const About = props => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div className={['title', active ? 'active' : ''].join(' ')}>
        About Page
      </div>
      <div className={`title ${active ? 'active' : ''}`}>About Page</div>
      <button onClick={() => setActive(!active)}>toggle</button>
    </div>
  );
};

export default About;
```

## 使用classnames

1、安装 

```bash
$ npm install classnames -save
```

2、使用

```javascript
import classNames from 'classnames';

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
``` 

3、示例

style.css

```css
.btn {
  background: #ddd;
  color: #333;
  border: none;
  padding: 5px 20px;
}
.btn-primary {
  background: blue;
  color: #fff;
}
.btn-active {
  color: red;
}
```

about.js 

```javascript
import React, { useState } from 'react';
import classNames from 'classnames';

const About = props => {
  const [active, setActive] = useState(false);

  const titleCls = classNames({
    title: true,
    active: active ? true : false,
  });

  const btnCls = classNames(
    'btn',
    {
      'btn-primary': true,
    },
    {
      'btn-active': active ? true : false,
    },
  );

  return (
    <div>
      <div className={titleCls}>About Page</div>
      <button className={btnCls} onClick={() => setActive(!active)}>toggle</button>
    </div>
  );
};

export default About;
```

classnames   
https://github.com/JedWatson/classnames  


项目源码见（切换 tag 至 set-style）git checkout set-style： https://github.com/pengjielee/reactapp/tree/main/hello-world
