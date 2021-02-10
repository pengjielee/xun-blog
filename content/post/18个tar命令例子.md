---
title: "18个tar命令例子"
url: "post/18-examples-of-tar-command"
date: 2020-11-11T10:52:27+08:00
keywords: 'tar,linux command,linux压缩,linux解压'
description: ''
tags: ['Linux']
categories: []
draft: false
---

## Prepare

```
$ mkdir dist
$ cd dist
$ touch file1.txt file2.txt
$ mkdir js
```

## 1. Create tar Archive File

```
$ tar -cvf dist.tar ./dist

a dist
a dist/file2.txt
a dist/file1.txt
a dist/js
```

NOTE:
c – Creates a new .tar archive file.
v – Verbosely show the .tar file progress.
f – File name type of the archive file.

## 2. Create tar.gz Archive File

```
$ tar cvzf dist.tar.gz ./dist
or
$ tar cvzf dist.tgz ./dist

a ./dist
a ./dist/file2.txt
a ./dist/file1.txt
a ./dist/js
```

Note:
z - Create a compressed gzip archive file.

Note:
tar.gz and tgz both are similar

```
$ ls -l

-rw-r--r--  1 pengjie  staff  3072 Nov 11 11:00 dist.tar
-rw-r--r--  1 pengjie  staff   180 Nov 11 11:05 dist.tar.gz
-rw-r--r--  1 pengjie  staff   180 Nov 11 11:05 dist.tgz
```

## 3. Create tar.bz2 Archive File

```
$ tar cvfj dist.tar.bz2 ./dist
or
$ tar cvfj dist.tar.tbz ./dist
or
$ tar cvfj dist.tar.tb2 ./dist

a ./dist
a ./dist/file2.txt
a ./dist/file1.txt
a ./dist/js
```

Note:
j - create highly compressed tar file.

Note:
tar.bz2 and tbz is similar as tb2

```
$ ls -l

-rw-r--r--  1 pengjie  staff  3072 Nov 11 11:00 dist.tar
-rw-r--r--  1 pengjie  staff   180 Nov 11 11:05 dist.tgz
-rw-r--r--  1 pengjie  staff   180 Nov 11 11:05 dist.tar.gz
-rw-r--r--  1 pengjie  staff   205 Nov 11 11:19 dist.tar.bz2
-rw-r--r--  1 pengjie  staff   205 Nov 11 11:19 dist.tar.tbz
-rw-r--r--  1 pengjie  staff   205 Nov 11 11:19 dist.tar.tb2
```

## 4. Untar tar Archive File

```
// 解压在当前目录
$ tar -xvf dist.tar

// 解压在指定目录
$ tar -xvf dist.tar -C /home/www
```

## 5. Uncompress tar.gz Archive File

```
$ tar -xvf dist.tar.gz
```

## 6. Uncompress tar.bz2 Archive File

```
$ tar -xvf dist.tar.bz2
```

## 7. List Content of tar Archive File

```
$ tar -tvf dist.tar

drwxr-xr-x  0 pengjie staff       0 Nov 11 10:59 dist/
-rw-r--r--  0 pengjie staff       0 Nov 11 10:55 dist/file2.txt
-rw-r--r--  0 pengjie staff       0 Nov 11 10:55 dist/file1.txt
drwxr-xr-x  0 pengjie staff       0 Nov 11 10:57 dist/js/
```

## 8. List Content tar.gz Archive File

```
$ tar -tvf dist.tar.gz

drwxr-xr-x  0 pengjie staff       0 Nov 11 10:59 ./dist/
-rw-r--r--  0 pengjie staff       0 Nov 11 10:55 ./dist/file2.txt
-rw-r--r--  0 pengjie staff       0 Nov 11 10:55 ./dist/file1.txt
drwxr-xr-x  0 pengjie staff       0 Nov 11 10:57 ./dist/js/
```

## 9. List Content tar.bz2 Archive File

```
$ tar -tvf dist.tar.bz2
```

## 10. Untar Single file from tar File

```
$ tar -xvf dist.tar dist/file1.txt
or
$ tar --extract --file=dist.tar dist/file1.txt


$ tar -xvf file1.tar file1.txt
or
$ tar --extract --file=file1.tar file1.txt
```

## 11. Untar Single file from tar.gz File

```
$ tar -zxvf file1.tar.gz file1.txt
or
$ tar --extract --file=file1.tar.gz file1.txt
```

## 12. Untar Single file from tar.bz2 File

```
$ tar -jxvf dist.tar.bz2 dist/file1.txt
or
$ tar --extract --file=dist.tar.bz2 dist/file1.txt
```

## 13. Untar Multiple files from tar, tar.gz and tar.bz2 File

```
$ tar -xvf dist.tar "dist/file1.txt" "dist/file2.txt" 

$ tar -zxvf dist.tar.gz "dist/file1.txt" "dist/file2.txt" 

$ tar -zxvf dist.tar.bz2 "dist/file1.txt" "dist/file2.txt" 
```

## 14. Extract Group of Files using Wildcard

```
$ tar -xvf dist.tar --wildcards '*.txt' 

$ tar -zxvf dist.tar.gz --wildcards '*.txt' 

$ tar -zxvf dist.tar.bz2 --wildcards '*.txt' 
```

## 15. Add Files or Directories to tar Archive File

```
$ tar -rvf dist.tar file3.txt

$ tar -rvf dist.tar css
```

## 16. Add Files or Directories to tar.gz and tar.bz2 files

```
$ tar -rvf dist.tar.gz file3.txt

$ tar -rvf dist.tar.gz css
```

## 17. How To Verify tar, tar.gz and tar.bz2 Archive File

```
$ tar tvfW dist.tar
```

Note: 
You cannot do verification on a compressed ( \*.tar.gz, \*.tar.bz2 ) archive file

## 18. Check the Size of the tar, tar.gz and tar.bz2 Archive File

```
$ tar -czf - dist.tar | wc -c
10240

$ tar -czf - dist.tar.gz | wc -c
10240

$ tar -czf - dist.tar.bz2 | wc -c
10240
```

## Tar Usage and Options

c – create a archive file.  
x – extract a archive file.  
v – show the progress of archive file.  
f – filename of archive file.  
t – viewing content of archive file.  
j – filter archive through bzip2.  
z – filter archive through gzip.  
r – append or update files or directories to existing archive file.  
W – Verify a archive file.  
wildcards – Specify patterns in unix tar command.  

## Source
https://www.tecmint.com/18-tar-command-examples-in-linux/