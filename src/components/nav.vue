<template>
  <div class="components">
    <router-link to="/">
      <el-button type="primary">Index</el-button>
    </router-link>
    <router-link to="hello">
      <el-button>hello</el-button>
    </router-link>
    <router-link to="login">
      <el-button>login</el-button>
    </router-link>
    <router-link to="register">
      <el-button>register</el-button>
    </router-link>
    <router-link to="change-password">
      <el-button>changePassword</el-button>
    </router-link>
    <router-link to="forget">
      <el-button>forget</el-button>
    </router-link>
  </div>
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
