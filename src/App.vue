<template>
  <div id="app">
    <!--<img class="logo" src="./assets/logo.png" alt="" width="50" height="50">-->
    <!--<el-button class="nav" @click="handleClick">Random Router</el-button>-->
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/create">创建投票</el-menu-item>
      <el-submenu index="/vote/:type">
        <template slot="title">查看投票</template>
        <el-menu-item index="/vote/doing">正在进行</el-menu-item>
        <el-menu-item index="/vote/will">即将开始</el-menu-item>
      </el-submenu>
      <el-menu-item index="/profile">
        个人管理
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
    <transition :name="transitionName">
      <router-view :key="$route.path"></router-view>
    </transition>
  </div>
</template>
<script>
  import { goto } from './utils'

  export default {
    name: 'app',
    data () {
      return {
        transitionName: 'slide-fade',
        activeIndex: '',
        activeIndex2: ''
      }
    },
    beforeUpdate: function () {
      const path = this.$route.matched[0].path
      this.activeIndex = path
      console.log(this.activeIndex)
      console.log(path)
    },
    methods: {
      handleSelect (key, keyPath) {
        goto(this, key)
      }
    }
  }
</script>

<style lang="stylus">
  @import "normalize.css/normalize.css"
  ul, li {
    margin 0
    padding 0
    list-style none
  }

  #app {
    margin 0 auto
    padding-top 0
    height 100%
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @media screen and (max-width: 1018px) and (min-width: 690px) {
    #app {
      width 690px
    }
  }

  // 单列布局
  @media screen and (max-width: 690px) and (min-width: 400px) {
    #app {
      width 400px
    }
  }

  @media screen and (max-width: 400px) {
    #app {
      width 100%
    }
  }
</style>
