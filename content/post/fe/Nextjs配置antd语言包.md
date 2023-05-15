---
title: "Nextjs配置antd语言包"
date: 2021-06-22T14:47:23+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: ''
draft: true
---

## 需求

antd 目前的默认文案是英文，我们需要使用中文。

## nextjs自定义 App

创建./pages/_app.js  

```javascript
function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp
```

## 安装antd

```bash
$ npm install antd --save

# or

$ yarn add antd
```

## 配置

```javascript
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
```

## More 

antd 国际化  
https://ant.design/docs/react/i18n-cn   

自定义 App   
https://www.nextjs.cn/docs/advanced-features/custom-app



