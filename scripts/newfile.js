const path = require('path');
const fs = require('fs-extra');

const options = process.argv.slice(2);
const param = options[0];

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('-') +
    'T' +
    [hour, minute, second].map(formatNumber).join(':') +
    '+08:00'
  );
};

const getContent = title => {
  const date = formatDate(new Date());
  return `---
title: '${title}'
date: ${date}
keywords: ''
description: ''
tags: ['sword2']
categories: []
draft: true
difficulty: ''
---

## 题目


## JS实现 

\`\`\`javascript

\`\`\`
`;
};

if (param) {
  let fileName = param.toLowerCase();
  const { dir, name } = path.parse(fileName);
  const fileDir = path.join(__dirname, '../content/' + dir);

  if (fs.existsSync(path.join(__dirname, '../content/' + fileName))) {
    console.log('existed');
    return;
  }

  if (!fs.existsSync(fileDir)) {
    fs.mkdirpSync(fileDir);
  }

  const filePath = path.join(fileDir, name + '.md');
  const content = getContent(name);
  fs.writeFileSync(filePath, content);
} else {
  console.log('No name provided, try `npm run newfile [name]` instead.');
}
