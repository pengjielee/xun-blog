---
title: "React中使用TypeScript"
url: "post/use-typescript-in-react"
thumbnail: "https://i.loli.net/2021/03/01/ajSIkp5bDs8EYv9.jpg"
date: 2020-11-11T10:34:27+08:00
keywords: 'React,TypeScript'
description: ''
tags: ['React','TypeScript']
categories: []
draft: false
---

## 初始化

```bash
$ mkdir react-ts-app
$ cd react-ts-app
$ npm init -y
$ npm install react react-dom

$ mkdir src
$ cd src
$ touch index.html
$ touch App.tsx
```

## src/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>React + TypeScript</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="main"></div>
  <script src="./App.tsx"></script>
</body>
</html>
```

## 安装Parcel

```bash
$ npm i parcel-bundler -D
$ npm i typescript -D
$ npm i -D @types/react @types/react-dom
```

package.json

```json
{
  "name": "react-ts-app",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "parcel src/index.html"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

## Counter.tsx

```javascript
import * as React from 'react';

export default class Counter extends React.Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState({
      count: (this.state.count + 1)
    });
  };

  decrement = () => {
    this.setState({
      count: (this.state.count - 1)
    });
  };

  render () {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
```

## src/App.tsx

```javascript
import * as React from 'react';
import { render } from 'react-dom';

import Counter from './Counter';

render(<Counter />, document.getElementById('main'));
```

## 运行 (http://localhost:1234)

```bash
$ npm run dev
```

## Count1.tsx (verseion1)

```javascript
import * as React from 'react';

const Count1: React.FunctionComponent<{
  count: number;
}> = (props) => {
  return <h1>{props.count}</h1>;
};

export default Count1;
```

## Count2.tsx (verseion2)

```javascript
import * as React from 'react';

interface Props {
  count: number;
}

const Count2: React.FunctionComponent<Props> = (props) => {
  return <h1>{props.count}</h1>;
};

export default Count2;
```

## Count3.tsx (verseion3: Default Props)

```javascript
import * as React from 'react';

interface Props {
  count?: number;
}

export default class Count extends React.Component<Props> {
  static defaultProps: Props = {
    count: 10
  };

  render () {
    return <h1>{this.props.count}</h1>;
  }
}
```

## Counter.tsx

```javascript
import * as React from 'react';

import Count1 from './Count1';
import Count2 from './Count2';
import Count3 from './Count3';

interface Props {}

interface State {
  count: number;
};

export default class Counter extends React.Component<Props, State> {
  state: State = {
    count: 0
  };

  increment = () => {
    this.setState({
      count: (this.state.count + 1)
    });
  };

  decrement = () => {
    this.setState({
      count: (this.state.count - 1)
    });
  };

  render () {
    return (
      <div>
        <Count1 count={this.state.count} />
        <Count2 count={this.state.count} />
        <Count3 />
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
```

## Source

https://www.digitalocean.com/community/tutorials/react-typescript-with-react