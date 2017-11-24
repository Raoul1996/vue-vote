<template>
  <div id="app">
    <!--<img class="logo" src="./assets/logo.png" alt="" width="50" height="50">-->
    <!--<el-button class="nav" @click="handleClick">Random Router</el-button>-->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <login-status></login-status>
  </div>
</template>
<script>
  import LoginStatus from './components/loginStatus'
  import goto from './config/goto'

  export default {
    components: {LoginStatus},
    name: 'app',
    data () {
      return {
        msg: 'this is the components',
        transitionName: 'slide-fade',
        flag: true,
        routes: ['', 'hello', 'login', 'register', 'change-password', 'forget']
      }
    },
    methods: {
      getRandom (range) {
        return Math.floor(Math.random() * range)
      },
      handleClick () {
        let random = this.getRandom(this.routes.length)
        if (this.flag) {
          goto(this, this.routes[random])
        } else {
          goto(this, 'nav')
        }
        this.flag = !this.flag
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
    padding-top 88px
    height 100%
    .logo {
      /*margin-top 88px*/
    }
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
  @media screen and (max-width: 690px) {
    #app {
      width 440px
    }
  }
</style>
