<template>
  <div id="app">
    <router-link to="components">
      <el-button class="components">components</el-button>
    </router-link>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <div v-if="login">
      已经登录{{login}}
      <el-button @click="Logout">登出</el-button>
    </div>
    <div v-else>
      没有登录{{login}}
    </div>
  </div>
</template>
<script>
  import { getStore, removeStore } from '../src/config/localStorage'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'this is the components',
        transitionName: 'slide-fade',
        loginStatus: getStore('token')
      }
    },
    computed: {
      ...mapState([
        'login'
      ])
    },
    methods: {
      ...mapActions([
        'USER_LOGIN'
      ]),
      Logout () {
        removeStore('token')
        this.USER_LOGIN(false)
      }
    }
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
