<template lang="pug">
  .info
    .avatar
      img(:src="url")
    ul.users-list
      li.users-item.title {{info.name}}
      <!--li.users-item.email {{info.email}}-->
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
    .avatar {
      margin 0 auto
      width 150px
      height 150px
      img {
        max-width 100%
      }
    }
    .users-list {
      padding 0
      .users-item {
        list-style none
      }
      .title {
        font-size 2em
      }
      .email {
        font-size 1.2em
      }
    }
  }
</style>
