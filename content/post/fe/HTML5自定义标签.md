---
title: "HTML5自定义标签"
date: 2021-04-08T13:29:11+08:00
keywords: ''
description: ''
tags: []
categories: ''
draft: true
---

## 定义非标准元素：greeting

```html
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      greeting {
        display: block;
        font-size: 36px;
        color: red;
      }
    </style>
  </head>
  <body>
    <greeting>Hello World</greeting>
  </body>
  <script>
    function customTag(tagName, fn) {
      Array.from(document.getElementsByTagName(tagName)).forEach(fn);
    }

    function greetingHandler(element) {
      element.innerHTML = "你好，世界";
    }

    customTag("greeting", greetingHandler);
  </script>
</html>
```

效果预览    
https://codepen.io/pengjielee-the-lessful/pen/poRWBLX  

## HTMLUnknownElement

```javascript 
var tabs = document.createElement('tabs');

console.log(tabs instanceof HTMLUnknownElement) // true
console.log(tabs instanceof HTMLElement) // true
```

```javascript
var xTabs = document.createElement('x-tabs');

console.log(xTabs instanceof HTMLUnknownElement) // false
console.log(xTabs instanceof HTMLElement) // true
```

## Custom elements: WordCount 

```html
<html>
  <head> </head>
  <body>
    <article contenteditable="">
      <p>Lorem ipsum dolor sit amet</p>
      <p is="word-count"></p>
    </article>
  </body>
  <script>
    // Create a class for the element
    class WordCount extends HTMLParagraphElement {
      constructor() {
        // Always call super first in constructor
        super();

        // count words in element's parent element
        const wcParent = this.parentNode;

        function countWords(node) {
          const text = node.innerText || node.textContent;
          return text.split(/\s+/g).length;
        }

        const count = `Words: ${countWords(wcParent)}`;

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        // Create text node and add word count to it
        const text = document.createElement("span");
        text.textContent = count;

        // Append it to the shadow root
        shadow.appendChild(text);

        // Update count when element content changes
        setInterval(function () {
          const count = `Words: ${countWords(wcParent)}`;
          text.textContent = count;
        }, 200);
      }

      connectedCallback() {
        console.log("added to the document.");
      }

      disconnectedCallback() {
        console.log("removed from the document.");
      }

      attributeChangedCallback(attr, oldValue, newValue) {
        this.value = newValue;
      }
    }

    // Define the new element
    window.customElements.define("word-count", WordCount, { extends: "p" });
  </script>
</html>
```


## More 

HTML5自定义标签  
https://cloud.tencent.com/developer/article/1499073  
 
使用 custom elements   
https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements

Web Components  
https://developer.mozilla.org/zh-CN/docs/Web/Web_Components   

custom-elements
https://github.com/shawnbot/custom-elements