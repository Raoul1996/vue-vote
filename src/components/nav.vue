<template lang="pug">
  .components
    router-link(to="/")
      el-button(type="primary") Index
    router-link(to="hello")
      el-button hello
    router-link(to="login")
      el-button login
    router-link(to="register")
      el-button register
    router-link(to="change-password")
      el-button changePassword
    router-link(to="forget")
      el-button forget
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msg: 'this is a test message'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .complements{
    margin 0 auto
  }
</style>
