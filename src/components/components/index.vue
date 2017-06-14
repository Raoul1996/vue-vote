<template>
  <div class="components">
    <p>{{ msg }}</p>
        <el-button>components</el-button>
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
</style>
