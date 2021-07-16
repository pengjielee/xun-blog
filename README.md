## 构建

```
$ npm run build
```

注意：目录结构

```
hubowriter
	-online //线上发布库
	-posts  //源代码库
```

posts/config.toml
```
publishDir = '../online/public'
```

## 开发

```
$ npm run dev

or

$ npm run start
```

## 创建博客 

```
$ hugo new post/my-first-post.md

or

$ title='hello.md' npm run post
```

## 主题 
  
当前主题： 
themes/mainroad  

创建主题
```
$ hugo new theme zero
``` 