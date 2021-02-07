---
title: "My First Asciidoctor Post"
date: 2021-02-07T15:43:24+08:00
draft: true
---

Hi there, you just reached my blog.

= Hello, AsciiDoc!
Doc Writer <doc@example.com>

An introduction to http://asciidoc.org[AsciiDoc].

== First Section

* item 1
* item 2

[source,ruby]
puts "Hello, World!"

.Table Title 
|=== 
|Column 1, Header Row |Column 2, Header Row 

|Cell in column 1, row 1
|Cell in column 2, row 1

|Cell in column 1, row 2
|Cell in column 2, row 2
|===

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
