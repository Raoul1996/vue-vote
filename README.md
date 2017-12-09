# Vue-vote——一款在线投票系统 (side project)

[![Build Status](https://travis-ci.org/Raoul1996/vue-vote.svg?branch=master)](https://travis-ci.org/Raoul1996/vue-vote)
[![Maintainability](https://api.codeclimate.com/v1/badges/b68da294651f58e8d2f7/maintainability)](https://codeclimate.com/github/Raoul1996/vue-vote/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b68da294651f58e8d2f7/test_coverage)](https://codeclimate.com/github/Raoul1996/vue-vote/test_coverage)

> 使用 Vue 重构了 Vote 项目，实践各种东西

## 文件结构
```
.
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Card.vue
│   ├── HelloWorld.vue
│   ├── layout.vue
│   ├── loginStatus.vue
│   ├── nav.vue
│   └── verify.vue
├── config
│   ├── api.js
│   ├── codeMap.js
│   ├── env.js
│   ├── localStorage.js
│   └── rem.js
├── main.js
├── pages
│   ├── 404.vue
│   ├── Hello.vue
│   ├── create.vue
│   ├── detail.vue
│   ├── forget.vue
│   ├── login.vue
│   ├── profile.vue
│   ├── register.vue
│   ├── update.vue
│   └── vote.vue
├── router
│   └── index.js
├── service
│   └── axios.js
├── store
│   ├── actions.js
│   ├── getters.js
│   ├── index.js
│   ├── mutation-types.js
│   └── mutations.js
└── utils.js

7 directories, 32 files

```
## 技术栈

1. Vue
2. Vuex
3. pug
4. element-ui
5. axios
6. Promise

## 学习 && 改进
1. [vue项目中对axios的二次封装](https://juejin.im/post/5a293e50f265da432153f190)
## 实现了些什么？

1. 使用 pug 模板简化代码（练习jade）[html2pug](http://html2jade.vida.io/)
2. 使用 element-ui 进行快速开发
3. 使用 Travis CI 进行自动化编译、打包、以及部署到服务器
4. 使用 codeclimate 进行代码检查
5. [用自己的后台](https://github.com/Raoul1996/koa-vote)，吼吼

## 将会实现些什么？

1. 使用 `vuex` 进行状态集中管理（还没做呢）
2. 自己写组件

## 如何启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
