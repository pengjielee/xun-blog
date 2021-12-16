---
title: "Nextjs定制错误页"
thumbnail: ""
date: 2021-06-22T15:54:41+08:00
keywords: ''
description: ''
tags: ['nextjs']
categories: []
draft: true
---

## 定制错误页

```javascript
import Error from 'next/error';

export default function Index({ result }) {
  const { success, data } = result;

  if (!success) {
    return <Error statusCode={500} title="出错了" />;
  }

  return (
    <>
      <style jsx>
        {`
          .list {
            margin: 30px;
          }
        `}
      </style>
      <ul className="list">
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch('https://cnodejs.org/api/v1/topics');
  const result = await response.json();

  return {
    props: { result },
  };
}
```
