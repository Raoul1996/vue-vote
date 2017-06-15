<template>
  <div class="login-status">
    <p>登录状态：{{login}}</p>
    <el-button v-if="login" @click="Logout">登出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { removeStore } from '../config/localStorage'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'loginStatus',
    data () {
      return {
        msg: 'this is the template component!'
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
        console.log('1')
        this.USER_LOGIN(false)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-status {

  }
</style>
