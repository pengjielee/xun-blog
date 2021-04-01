---
title: "React教程：使用React Router"
url: "post/react-tutorial-using-the-react-router"
thumbnail: "https://i.loli.net/2021/03/01/CaK1qUkv8gwsMrZ.jpg"
date: 2021-03-04T12:39:57+08:00
keywords: ''
description: ''
tags: ['React']
categories: []
draft: true
---

## 代码 

1、安装

```bash
$ npm install react-router-dom
```

2、创建多页面

文件结构：
```
/src
  /views
    /blog
      detail.js
      list.js
    about.js
    home.js
  app.js
  index.js
```

home.js
```javascript
import React from 'react';

const Home = props => {
  return <div>Home Page</div>;
};

export default Home;
```

about.js
```javascript
import React from 'react';

const About = props => {
  return <div>About Page</div>;
};

export default About;
```

blog/list.js
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = props => {
  const blogs = [
    {
      id: 1,
      title: '将React应用部署到GitHub Pages',
      url: 'https://cnodejs.org/topic/604059c54655ea7d122199c9',
    },
    {
      id: 2,
      title: '关于js超过19位的数字丢失精度的问题',
      url: 'https://cnodejs.org/topic/603f57704655ead84621978b',
    },
  ];
  return (
    <div>
      <ul>
        {blogs.map(item => {
          return (
            <li key={item.id}>
              <Link to={`/blog/${item.id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogList;
```

blog/detail.js
```javascript
import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';

const BlogDetail = props => {
  const match = useRouteMatch();
  const params = useParams();
  console.log(match);
  console.log(params);

  return <div>{params.id}</div>;
};

export default BlogDetail;
```

app.js
```javascript
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './views/home';
import About from './views/about';
import BlogList from './views/blog/list';
import BlogDetail from './views/blog/detail';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blogs">
            <BlogList />
          </Route>
          <Route path="/blog/:id">
            <BlogDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
```

index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/base.css';

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
```

## 详解

1、两种路由模式

- BrowserRouter，H5路由（history API）；
- HashRouter，哈希路由；

使用BrowserRouter路由时，当我们刷新页面时，会发现出错了；

开发时可以更改 webpack.config.js，配置 historyApiFallback 为true：
```javascript
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true, 
  },
}
```

上线需要服务端同学设置一下，把页面的所有请求都重新发送到单页面上，以使用前端路由，以 express 服务器为例：
```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// 把所有请求重新发送到单面上
app.get('/*', (req, res) => {
  const file = path.resolve(__dirname, 'public/index.html');
  res.sendFile(file);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
```

2、路由匹配

Switch组件路由匹配时，`/` 根路由要放在最后。 

3、获取路由参数

```javascript
import { useParams } from 'react-router-dom';

const BlogDetail = props => {
  const params = useParams();

  return <div>{params.id}</div>;
};
```


项目源码见（切换 tag 至 react-router）git checkout react-router： https://github.com/pengjielee/reactapp/tree/main/hello-world







