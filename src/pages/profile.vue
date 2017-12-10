<template lang="pug">
  .users.card-border
    .avatar
      img(src='https://avatars3.githubusercontent.com/u/18366474?s=400&u=9d001b5e917bfdeeb99c66051ffe9d6c827797ae&v=4')
    ul.users-list
      li.users-item {{info.name}}
      li.users-item {{info.mobile}}
</template>

<script type="text/ecmascript-6">
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'profile',
    data () {
      return {
        users: {
          id: '',
          name: '',
          email: '',
          mobile: ''
        }
      }
    },
    computed: mapState([
      'info'
    ]),
    created () {
      this.getUserMsg()
    },
    methods: {
      ...mapActions([
        'infoAction'
      ]),
      getUserMsg () {
        // 这里的参数留着以后用
        this.infoAction('')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .users {
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
