<template>
  <div id="app">
    <router-link to="components">
      <el-button class="components">components</el-button>
    </router-link>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <div v-if="loginStatus">
      已经登录
      <el-button @click="cleanLocalStorage">清空localStorange</el-button>
    </div>
    <div v-else>
      没有登录
    </div>
  </div>
</template>

<script>
  import ElButton from '../node_modules/element-ui/packages/button/src/button'
  import { getStore, removeStore } from '../src/config/localStorage'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'this is the components',
        transitionName: 'slide-fade',
        loginStatus: getStore('token')
      }
    },
//    watch: {
//      '$route' (to, form) {
//        const toDepth = to.path.split('/').length
//        const fromDepth = form.path.split('/').length
//        this.slideFade = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//      }
//    },
    methods: {
      cleanLocalStorage () {
        removeStore('token')
        window.history.go(0)
      }
    },
    components: {ElButton}
  }
</script>

<style lang="stylus">
  #app {
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
</style>
