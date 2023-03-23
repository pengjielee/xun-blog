---
title: "Nextjs使用总结"
thumbnail: ""
date: 2021-06-30T14:00:51+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: []
draft: true
---

## 1、请求数据

topic.js

```javascript
export default function Topic({ result }) {
  const data = result && result.data || [];

  return ( 
    <ul className="list">
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch('https://cnodejs.org/api/v1/topics');
  const result = await response.json();

  return {
    props: { result }
  };
}
```

## 2、自定义服务器

1、安装express

```bash
$ npm install express
```

2、创建server.js

```javascript
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3100;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

3、更新package.json

```json
"scripts": {
  //"dev": "next dev",
  "dev": "node server.js",
  "build": "next build",
  "start": "next start",
},
```

## 3、配置文件

next.config.js

```javascript
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  //构建目录，默认.next
  distDir: '_next',
  
  //禁止输出x-powered-by
  poweredByHeader: false,
  
  //静态资源路径前缀
  assetPrefix: isProd ? 'https://static.xxx.cn/' : '',

  //环境变量
  env: {
    NEXT_PUBLIC_TARGET: process.env['TARGET'],
  },
};
```

## 4、使用样式

1、使用scss

安装sass

```bash
$ npm install sass
```

2、使用style.module

style.module.css

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 2.4rem;
}
```

home.js

```javascript
import Head from 'next/head';
import styles from './style.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
      </Head>
      <main>
        <h2 className={styles.title}>欢迎使用</h2>
      </main>
    </div>
  );
}
```

3、使用style-in-js

```javascript
import Head from 'next/head';

export default function Home() {
  return (
    <div className="page">
      <Head>
        <title>Home Page</title>
      </Head>
      <style global jsx>
        {`
          body {
            background: red;
          }
          .page {
            font-size: 14px;
          }
        `}
      </style>

      <main className="main">
        <h2 className="title">Home Page</h2>
      </main>
    </div>
  );
}
```

## 5、配置接口代理（需要自定义服务器）

1、安装http-proxy-middleware

```bash
$ npm install http-proxy-middleware
```

2、更新server.js

```javascript
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3100;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 新添加的依赖
const { createProxyMiddleware } = require('http-proxy-middleware');

app.prepare().then(() => {
  const server = express();

  //配置接口代理
  if (dev) {
    server.use(
      '/api',
      createProxyMiddleware({ target: 'http://test.xxx.com', changeOrigin: true }),
    );
  }

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```





