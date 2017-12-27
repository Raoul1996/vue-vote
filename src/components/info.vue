<template lang="pug">
  .info
    .avatar
      img(:src="url")
    ul.users-list
      li.users-item {{info.name}}
      li.users-item {{info.email}}
</template>

<script>
  export default {
    name: 'info',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        url: 'https://avatars3.githubusercontent.com/u/18366474?s=400&u=9d001b5e917bfdeeb99c66051ffe9d6c827797ae&v=4'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .info {
    display flex
    .avatar {
      width 80px
      height 80px
      img {
        max-width 100%
      }
    }
    .users-list {
      display flex
      flex-direction column
      justify-content space-around
      align-items baseline
      padding 0
      .users-item {
        line-height 40px
        list-style none
      }
    }
  }
</style>
