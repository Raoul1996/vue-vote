<template>
  <div class="login-status">
    <p>登录状态：{{login}}</p>
    <el-button v-if="login" @click="Logout">登出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { removeStore } from '../config/localStorage'
  import { mapState, mapActions, mapMutations } from 'vuex'
  import goto from '../config/goto'
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
      ...mapMutations([
        'SET_TOKEN'
      ]),
      Logout () {
        removeStore('token')
        this.USER_LOGIN(false)
        this.SET_TOKEN(null)
        this.$message.info('logout successful')
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
