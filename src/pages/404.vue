<template lang="pug">
  .not-found
    h1 {{msg}}
</template>

<script type="text/ecmascript-6">
  export default {
    name: '404',
    data () {
      return {
        msg: 'this page not fond!'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
