<template>
  <div id="app">
    <router-link to="components">
      <el-button class="components" >components</el-button>
    </router-link>
    <router-view></router-view>
    <!--<amap></amap>-->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'this is the components'
      }
    },
    components: {}
  }
</script>

<style lang="stylus">
  #app {
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    /*margin-top 60px*/
    .components{
      /*position absolute*/
      /*left 20px*/
      /*top 50px*/
      /*z-index 10*/
    }

  }
</style>
