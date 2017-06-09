<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'vue-amap向你问好！'
      }
    }
  }
</script>

<style lang="stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .amap-wrapper {
      width: 500px;
      height: 500px;
    }

  }
</style>
