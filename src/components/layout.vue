<template>
  <div class="layout"></div>
</template>

<script>
  export default {
    name: 'layout',
    props: {},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 三列布局
  .layout {
    margin 0 auto
    max-width: 1035px
    display flex
    flex-wrap wrap
  }

  //两列布局
  @media screen and (max-width: 1018px) and (min-width: 690px) {
    .layout {
      width 690px
    }
  }

  // 单列布局
  @media screen and (max-width: 690px) {
    .layout {
      width 440px
    }
  }
</style>
