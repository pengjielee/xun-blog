---
title: "我的bash配置"
url: "post/my-bash-config"
date: 2020-12-08T11:42:27+08:00
keywords: 'bash配置'
description: ''
tags: ['Tool']
categories: ''
draft: false
---

## 打开bash_profile

```Bash
$ cd ~

$ vi .bash_profile
```
 
## 内容

1、快速切换到常用目录

```Bash
alias cd.pw="cd /Users/pengjie/work/panda-wechat"
alias cd.p5="cd /Users/pengjie/work/panda-h5"
alias cd.doc="cd /Users/pengjie/www/doc.pengjielee.cn"
alias cd.www="cd /Users/pengjie/www"
alias cd.try="cd /Users/pengjie/try"
alias cd.nginx="cd /usr/local/etc/nginx/"
```

2、bash编辑更新

```Bash
BASH_PROFILE_PATH="$HOME/.bash_profile"
alias bash.open="open ${BASH_PROFILE_PATH}"
alias bash.src="source ${BASH_PROFILE_PATH}"
```

3、git操作快捷键

```Bash
alias gs="git status "
alias ga="git add "
alias gaa="git add -A "
alias gb="git branch "
alias gc="git commit "
alias gcm="git commit -m "
alias gck="git checkout "
alias gp="git push "
```

4、登录服务器

```Bash
alias login33="ssh root@192.168.6.33"
alias login23="ssh lipengjie@192.168.6.23 -p 60022"
```

5、备份站点和数据库

```Bash
alias backupsite="rsync -av root@45.77.122.94:/data/www/myserver/src/static/uploads /Users/pengjie/百度云同步盘/m.pengjielee.cn"
alias backupdb="rsync -av root@45.77.122.94:/data/mongodb_bak/mongodb_bak_list /Users/pengjie/百度云同步盘/m.pengjielee.cn"
```