<template lang="pug">
  .info
    .avatar(@click="changeAvatar")
      img(:src="info.avatar")
    ul.users-list
      li.users-item.title {{info.name}}
      <!--li.users-item.email {{info.email}}-->
</template>

<script>
  import { goto } from '../utils.js'

  export default {
    name: 'info',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    methods: {
      changeAvatar () {
        goto(this, '/profile/setting')
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
