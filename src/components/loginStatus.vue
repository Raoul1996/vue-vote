<template>
  <div class="login-status">
    <p>登录状态：{{login}}</p>
    <el-button v-if="login" @click="Logout">登出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { removeStore } from '../config/localStorage'
  import { mapState, mapActions } from 'vuex'
  import goto from '../config/goto'
  import { Message } from 'element-ui'
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
        this.USER_LOGIN(false)
        Message.info('logout successful')
        goto(this, '/login')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-status {

  }
</style>
