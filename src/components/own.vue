<template lang="pug">
  .own
    .title {{vote.title}}
    .time {{vote.start_at}} -- {{vote.end_at}}
</template>
<script>
  export default {
    name: 'own',
    props: {
      vote: {
        type: Object,
        required: true
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 三列布局

  .vote-list {
    margin 0 auto
    max-width: 1035px
    width 100%
    display flex
    flex-wrap wrap
    .vote-item {
      display inline-block
      margin 20px
      width 300px
    }
  }

  @media screen and (max-width: 690px) {
    .vote-list {
      .vote-item {
        margin 20px auto
      }
    }

  }
</style>
