<template lang="pug">
  .users.card-border
    .avatar
      img(src='https://avatars3.githubusercontent.com/u/18366474?s=400&u=9d001b5e917bfdeeb99c66051ffe9d6c827797ae&v=4')
    ul.users-list
      li.users-item {{users.name}}
      li.users-item {{users.mobile}}
</template>

<script type="text/ecmascript-6">
  import api from '../service/axios'

  export default {
    name: 'template',
    data () {
      return {
        msg: 'this is the users list!',
        users: {
          id: '',
          name: '',
          email: '',
          mobile: ''
        }
      }
    },
    created () {
      this.getUserMsg()
    },
    methods: {
      getUserMsg () {
        api.getUser().then(({user}) => {
          this.users = user
        })
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
