---
title: "React Hook使用"
url: "post/the-react-hook-use"
date: 2020-11-11T10:34:27+08:00
keywords: 'react hook'
description: ''
tags: ['React']
categories: []
draft: false
---

## useState

```
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className='title'>You clicked {count} times</p>
      <br />
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

## useEffect：设置标题

```
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p className='title'>You clicked {count} times</p>
      <br />
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

## useEffect：监听滚动/移除滚动

```
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    const fn = function () {
      console.log('scroll');
    };

    window.addEventListener('scroll', fn, false);
    return function () {
      window.removeEventListener('scroll', fn, false);
    };
  });

  return (
    <div>
      {new Array(100).fill(1).map((item, index) => {
        return (
          <p className='title' key={index}>
            You clicked {count} times
          </p>
        );
      })}
      <br />
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

## useEffect：网络请求

```
import React, { useState, useEffect } from 'react';

function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=1&limit=10`)
      .then((data) => data.json())
      .then((list) => {
        setPhotos(list);
      })
      .catch((e) => {
        return e;
      });
  }, []);

  return (
    <div>
      {photos.map((item) => {
        return <img src={item.download_url} style={{ width: '100%', marginBottom: '20px' }} />;
      })}
    </div>
  );
}

export default Photos;
```

## useEffect：网络请求（分页）

```
import React, { useState, useEffect } from 'react';

function Photos2() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=2`)
      .then((data) => data.json())
      .then((list) => {
        setPhotos(photos.concat(list));
      })
      .catch((e) => {
        return e;
      });
  }, [page]);

  return (
    <div>
      {photos.map((item) => {
        return <img src={item.download_url} style={{ width: '100%', marginBottom: '20px' }} />;
      })}
      <div style={{ textAlign: 'center' }}>
        {page < 5 ? (
          <button onClick={() => setPage(page + 1)}>Load More</button>
        ) : (
          <span>No More</span>
        )}
      </div>
    </div>
  );
}

export default Photos2;
```

## useReducer

```
import React, { useState, useEffect, useReducer } from 'react';

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'STACK_PHOTOS':
      return { ...state, photos: state.photos.concat(action.photos) };
    case 'FETCHING_PHOTOS':
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
};

const pageReducer = (state, action) => {
  switch (action.type) {
    case 'ADVANCE_PAGE':
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

function Photos3() {
  const [pageData, pageDispatch] = useReducer(pageReducer, { page: 1 });
  const [photoData, photoDispatch] = useReducer(photoReducer, {
    photos: [],
    fetching: true,
  });

  const { page } = pageData;
  const { fetching, photos } = photoData;

  useEffect(() => {
    photoDispatch({ type: 'FETCHING_PHOTOS', fetching: true });
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=2`)
      .then((data) => data.json())
      .then((list) => {
        photoDispatch({ type: 'STACK_PHOTOS', photos: list });
        photoDispatch({ type: 'FETCHING_PHOTOS', fetching: false });
      })
      .catch((e) => {
        photoDispatch({ type: 'FETCHING_PHOTOS', fetching: false });
        return e;
      });
  }, [page]);

  return (
    <div>
      {photos.map((item) => {
        return <img src={item.download_url} style={{ width: '100%', marginBottom: '20px' }} />;
      })}
      <div style={{ textAlign: 'center' }}>
        {page < 5 ? (
          <button onClick={() => pageDispatch({ type: 'ADVANCE_PAGE' })}>Load More</button>
        ) : (
          <span>No More</span>
        )}
      </div>
    </div>
  );
}

export default Photos3;
```

## useRef

```
import React, { useState, useEffect, useRef } from 'react';

import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

function Banners() {
  const swiperRef = useRef();

  const [photos, setPhotos] = useState([]);

  const initSwiper = () => {
    new Swiper(swiperRef.current, {
      loop: true,
      spaceBetween: 20,
      watchOverflow: true,
      autoplay: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  };

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=1&limit=5`)
      .then((data) => data.json())
      .then((list) => {
        setPhotos(list);
        initSwiper();
      })
      .catch((e) => {
        return e;
      });
  }, []);

  return (
    <div>
      <div ref={swiperRef} className='swiper-container'>
        <div className='swiper-wrapper'>
          {photos.map((item) => {
            return (
              <div className='swiper-slide' key={item.id}>
                <img src={item.download_url} style={{ width: '100%' }} />
              </div>
            );
          })}
        </div>
        <div className='swiper-pagination'></div>
      </div>
    </div>
  );
}

export default Banners;
```