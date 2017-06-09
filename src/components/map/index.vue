<template>
    <div class="map">
      <h3 class="title">{{ msg }}</h3>
      <div class="amap-wrapper">
        <el-amap :vid="'amap-vues'"></el-amap>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msg: 'this is the map components based on vue-amap'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
</style>
