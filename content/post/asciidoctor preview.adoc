---
title: "Asciidoctor Document Preview"
url: "post/asciidoctor--preview"
date: 2021-02-26T14:11:59+08:00
keywords: ''
description: ''
tags: []
categories: []
draft: true
---

== 1、标题 

= h1
== h2
=== h3
==== h4
===== h5
====== h6


== 2、无序列表 


* item 1
* item 2


== 3、有序列表 


. Step 1
. Step 2
.. Step 2a
.. Step 2b
. Step 3


== 4、清单


* [*] checked
* [x] also checked
* [ ] not checked
* normal list item


== 5、代码 


[source,javascript]
const obj2str = (obj) => {
  let w = Object.entries(obj)
  w.forEach((v, i) => {
    w[i] = v.join("=")
  })
  return w.join("&")
}


== 6、图片


image::https://static01.imgkr.com/temp/b399f608741e4305930ca18b06fc977e.jpg[Sunset1,50,50]

.百度
[#img-baidu]
[caption="你妹的",link=https://baidu.com,target="_blank"]
image::https://www.baidu.com/img/flexible/logo/pc/result.png[Sunset,100,50] 


== 7、链接 

http://asciidoctor.org[Asciidoctor]  

https://www.baidu.com[百度]  

https://www.baidu.com['百度（新窗口打开）', role="external", window="\_blank"]


== 8、加粗/斜体


_italic phrase_

*bold phrase*

**b**old le**tt**ers

*_bold italic phrase_*

`monospace phrase` and le``tt``ers

^super^script phrase

2^3^ phrase

log~2~4

~sub~script phrase

~sub~script phrase

'`single curved quotes`'

"`double curved quotes`"


== 9、表格


.Table Title 
|=== 
|Column 1, Header Row |Column 2, Header Row 

|Cell in column 1, row 1
|Cell in column 2, row 1

|Cell in column 1, row 2
|Cell in column 2, row 2
|===


== 10、图表

[ditaa]
----
              +-------------+
              | asciidoctor |-----------+
              |  diagram    |           |
              +-------------+           | image
                    ^                   |
                    | diagram source    |
                    |                   v
 +--------+   +-----+-------+    /---------------\
 |  adoc  |-->+ asciidoctor +    | HTML + image  |
 +--------+   +-------------+    \---------------/
----

