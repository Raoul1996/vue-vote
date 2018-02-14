# koa-vote
[![Build Status](https://travis-ci.org/Raoul1996/koa-vote.svg?branch=master)](https://travis-ci.org/Raoul1996/koa-vote)
[![bitHound Overall Score](https://www.bithound.io/github/Raoul1996/koa-vote/badges/score.svg)](https://www.bithound.io/github/Raoul1996/koa-vote)
[![bitHound Dev Dependencies](https://www.bithound.io/github/Raoul1996/koa-vote/badges/devDependencies.svg)](https://www.bithound.io/github/Raoul1996/koa-vote/master/dependencies/npm)
[![bitHound Dependencies](https://www.bithound.io/github/Raoul1996/koa-vote/badges/dependencies.svg)](https://www.bithound.io/github/Raoul1996/koa-vote/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/Raoul1996/koa-vote/badges/code.svg)](https://www.bithound.io/github/Raoul1996/koa-vote)
[![Maintainability](https://api.codeclimate.com/v1/badges/b50d10d1c5fbedf542c5/maintainability)](https://codeclimate.com/github/Raoul1996/koa-vote/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b50d10d1c5fbedf542c5/test_coverage)](https://codeclimate.com/github/Raoul1996/koa-vote/test_coverage)

> 使用 Koa2 进行 Vote 后端的编写，实践各种工具（side-project）

## 线上接口地址:
[Voter API文档地址](https://raoul1996.github.io/koa-vote/)

## 技术栈

1. koa2 框架
2. mysql 模块
3. koa-jwt 中间件
4. Promise

## 存在问题

- ~~20171217：Inner join 返回的数组，如何仅仅只获取自己需要的值，而不返回 password~~
- 20171219：在创建投票的时候，获取用户 user_id 的需求，目前采用的方式是在用户登录的时候将 token 存到数据库中，和 user_id 和 ip 对应。但是这样会出现的问题就是如果token的查询失败了之后，就会出现获取不到用户 id 的情况。比较通用的token校验方案将token存入数据库中，然后每次进行读取，考虑重构。
- 20171219：出现了 res.setHeader 错误
- ~~20171219：无法配置静态服务器，目前的解决方案是在 ci 中配置，将使用 apicoc 生成的 文档自动 push 到 gh-pages 分支~~
- 20171219: 考虑重构 register 接口和 login 接口
- 20171219：考虑使用 webpack，require 的方式实在是不优雅。
- ~~20171222: 出了一个脑残的 bug：因为config.js 中配置了mail 的相关信息，所以没有 push 到 github，导致线上版本使用 CI 自动部署的时候丢了mail的配置信息，找了一晚上。~~
- 20171223：使用 ccap 模块生成验证码，但是面临的一个大问题就是缓存的问题。目前使用的办法是声明一个全局变量，保存验证码的内容然后请求的时候比对，**出现并发的时候绝对会完蛋**。
- 20170214：在编写 Dockerfile 的时候，由于 `ccap` 模块依赖于 `node-gyp`，所以需要配置 Python 环境
## 实现了什么

- 使用 mysql 数据库
- 使用 pm2,任务常驻后台
- 使用 Travis CI 进行自动化编译部署到服务器
- 使用 codeclimate 进行代码检查（函数复杂度）
- 基于 token 的校验，实现单点登录（koa-jwt）,开发过程中暂时关闭
- 使用 [Codacy](https://www.codacy.com/app/Raoul1996/koa-vote/dashboard) 检查安全性
- [前台自己写](https://github.com/Raoul1996/vue-vote),吼吼
- 使用 bitHound 进行代码风格检查（ESLint），依赖安全性检查
- 使用 [fundebug](https://fundebug.com/dashboard/5a335abe14a0ae0013688a60/errors/inbox?filters=%7B%22startTime%22:1513229880000,%22endTime%22:1513316280000%7D&sortby=%7B%22sortfield%22:%22lastSeen%22,%22sortvalue%22:%22descending%22%7D&search=&eventId=&errorStatus=) 监控
- detail 和 vote 信息分开存储
- 密码加盐存储
- 使用 api-docs 书写接口文档
- 邮件服务
- 静态资源服务器
- 图片验证码
- 文件上传
- excel 解析
- Dockerizing（Docker 化）

## 待实现一些什么

1. ~~邮件服务（已经完成）~~
2. 统一用户系统（big，big，future）
3. 代码覆盖率检查（基于 TravisCI 实现自动化检查）
4. 再写一套服务端的模板（pug）？
5. ~~集成 redis 缓存(big,big,future)~~
6. 配置化（更大的 future）
7. ~~安全模块（）~~
8. 单元测试
9. 实践 TDD
10. ~~文件上传功能（已经完成）~~
11. 使用 webpack 进行编译（第二次重构）
12. 前端后端组合到一个项目中，仿照 koa-boilerplate 项目
13. 站内信功能
14. 图片验证码缓存区的问题，拟使用 redis
## 优秀资料
- [一点都不高大上，手把手教你使用Travis CI实现持续部署](https://zhuanlan.zhihu.com/p/25066056 )
- [Koa 学习笔记](https://chenshenhai.github.io/koa2-note/note/upload/pic-async.html)

## 未学习资料
- [node.js下redis简单操作实例](https://cnodejs.org/topic/5200755c44e76d216a1620df)
- [[译]使用 Async 函数和 Koa 2 构建服务端应用](https://www.w3ctech.com/topic/1917)
- [大家有用vue解析过服务端推送过来的protobuf数据吗](https://cnodejs.org/topic/595a7487acfce9295ba07386)

## 实际操作
- [Nodejs进阶：MD5入门介绍及crypto模块的应用](https://segmentfault.com/a/1190000009163658),密码加盐
- [用travis和git hook搞个一键部署](https://segmentfault.com/a/1190000005804780),本地编译，不是很自动化
- [Travis-ci自动编译部署github上的项目](https://troyyang.com/2017/06/24/Travis_Auto_Build_Deploy_Github_Projects/)，只做了github 的自动化提交，做 hexo 博客还行
- [利用travis-ci持续部署nodejs应用](https://cnodejs.org/topic/5885f19c171f3bc843f6017e),五星好评，基本上是参考这篇博文做的 travis
- [Mysql----Join用法(Inner join,Left join,Right join, Cross join, Union模拟Full join)及---性能优化](http://blog.csdn.net/oChangWen/article/details/52346610)
- [nodejs获取客户端真实ip默认是ipv6格式](http://www.jianshu.com/p/bcab08f2f924),如何指定默认为 IPV6 格式的 ctx.request.ip 为 IPV4
- [使用 Node.js 的 nodemailer 模块发送邮件](http://www.lovebxm.com/2017/07/21/node-mail/)
- [Node读写Excel文件探究实践](https://aotu.io/notes/2016/04/07/node-excel/index.html)
- [Git只获取部分目录的内容（稀疏检出）](https://zhgcao.github.io/2016/05/11/git-sparse-checkout/)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [An Exhaustive Guide to Writing Dockerfiles for Node.js Web Apps](https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4)
- [如何制作一个定制的 Python 基础 Docker 镜像](http://open.daocloud.io/ru-he-zhi-zuo-yi-ge-ding-zhi-de-python-ji-chu-docker-jing-xiang/)
## 学习笔记
### 21071209
- Node 的 8.11.1 版本并不支持 ...Obj 这种语法，所用使用了 Object.assign 方法，参见[这个 commit](https://github.com/Raoul1996/koa-vote/commit/8b0fb6612f9f8d8fb30e2973de5b7e3d9fc73f05)

### 20171213
- 配置 ESLint，进行代码风格校验配置。注意和有 webpack 环境下的配置方法不太一样，参见[这个 commit](https://github.com/Raoul1996/koa-vote/commit/feb60996a3e7ff87defd1f0c96faf9f2b105def1)

### 20171215
- 密码加盐的目的是防止使用彩虹表反查密码。所以说只要盐是**随机盐**，可以直接存到数据库中，不必加密。校验的时候，查到盐之后，按照相同的规则加密，然后直接和数据库中保存的密码进行比对即可。参见[这个 commit](https://github.com/Raoul1996/koa-vote/commit/ebb0d97beecfe0e7224c6c03f21c5560081b98e0)

### 20171217
- 如果只想返回 aTable 中的数据，而不返回join进来的 bTable 的数据可以使用这样的语句进行查询：

  ```sql
  SELECT aTable.* FROM aTable INNER JOIN bTable ON aTable.bid=bTable.aid
  ```
### 20171218
- 接口文档不用 koa-docs 了，因为有一个不靠谱的依赖，改用 apidoc，[api 文档地址](https://raoul1996.github.io/koa-vote/)

### 20171218
- 在数据库中设计了一个 `token` 的表，功能是记录用户的 token 以及用户的IP地址。从[stackoverflow](https://stackoverflow.com/questions/37688712/get-client-ip-in-koa-js) 给出了解决方法：ctx.request.ip 就可以获取到，但是地址的格式是 ipv6，并不是常见的 IPV4 格式。需要在 app 中的listen 方法中进行设置 httpServer 监听的 ip 地址为 0.0.0.0
- 在数据库中避免重复插入的方法：[mysql忽略主键冲突、避免重复插入的几种方式？](https://www.zhihu.com/question/41053844)

### 20171222
- 使用 nodemailer 的时候想要返回发送信息的状态，暂时没有实现。官方文档中也没有描述
- 在 koa2 中设置静态资源服务器的方法和 express 以及其他 node 框架略有不同,参见[这个 commit](https://github.com/Raoul1996/koa-vote/commit/73cfbafa59fcb670bf85872158c05afa0494a114)

### 20171224
- 平安夜快乐，因为没有女盆友所以自己和代码瞎几把过完事。有女朋友的过 shengdan 节，没女盆友的就乖乖的过圣诞节吧。
- **验证码遗留的大坑：并发之后没法处理，暂时出现这个问题的几率不大，但是绝对是大坑。**
- 配置文件因为放了 mail 的配置信息，所以 ignore 掉了。配置文件的模板在 config-tpl.js 中
- 返回图片的时候指定 ctx.type="image/png"，或者说返回其他 MIME 类型的东西都需要指定。
### 20171224
- 平安夜吃完了苹果，可以睡觉了
- 如何确保用户只能投票一次？难道要再设计一张表吗？
### 20171228
- ccap 模块中对于 width 的配置是失效的，只会限制宽度而不会限制实际生成验证码的位数，使用的时候需要注意
### 20180102 - 20180103
- 为域名配置 ssl 证书，配置文件如下

```
# 转发 http 到 https
server {
    listen 80;
    server_name api.raoul1996.cn;

    index index.html index.htm index.php;

    # open_log_file_cache max=1000 inactive=60s;

    add_header Strict-Transport-Security max-age=2592000;

    rewrite ^/.*$ https://$host$request_uri? permanent;

    location ~ .*\.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$ {
        expires      30d;
    }
    location ~ .*\.(js|css)?$ {
        expires      1h;
    }

}
server {
	listen 443;
	server_name api.raoul1996.cn;

	root html;
	index index.html index.htm;

	ssl on;
	ssl_certificate path-to-your-crt-file;
	ssl_certificate_key path-to-your-key-file;

	ssl_session_timeout 5m;

	ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
	ssl_prefer_server_ciphers on;

	location / {
	  # nginx 端口转发到 3000 端口
		proxy_pass    http://0.0.0.0:3000;
        	# force timeouts if the backend dies
        	proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        	# set headers
        	proxy_set_header Host $host;
       		proxy_set_header X-Real-IP $remote_addr;
        	proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        	# Let the OpenERP web service know that we're using HTTPS, otherwise
        	# it will generate URL using http:// and not https://
        	proxy_set_header X-Forwarded-Proto https;
        	# by default, do not forward anything
        	proxy_redirect off;
	}
}

```
- 备注：由于 `SSLv3` 不安全，所以删掉了对该协议的支持
- 隐藏证书文件路径

### 20180108 - 20180114
- 学习微信小程序，暂时暂停 vote 项目开发

### 20180120
- jwt 部分的开发
  - 使用 [koa-jwt](https://www.npmjs.com/package/koa-jwt#usage) 中间件进行 jwt 用户校验的开发，其中中间件在验证 token 之后会将 token 中的内容解密存入 `ctx.state.user` 对象中，方便后面获取用户 id
  - 学习 `Angular 安全 —— 使用 JSON 网络令牌（JWT）的身份认证：完全指南` 一文。该文章由我自己进行翻译，[原文链接](https://blog.angular-university.io/angular-jwt-authentication/)，译文链接暂时还没有，虽然是 Angular + Express，但是在思路上还是共通的。
- 401 未授权问题

### 20180121
- 文件上传功能开发

### 20180205
- git 稀疏检出
- excel 文件解析

### 20180214
- 编写 Dockerfile, 创建 Docker 镜像
- `ccap` 模块依赖于 `node-gyp`，需要同时配置 python 环境
- 编写基础的 Dockerfile 主要参考了 [Node 官网](https://nodejs.org)中的 [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) 文档
- 运行命令：`docker run -p 3000:3000 -d raoul1996/koa-vote:$(TAG)`，可以让进程在后台运行
