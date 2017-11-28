<template lang="pug">
  .users
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
    .users-list {
      flex 1
      padding 0
      .users-item {
        list-style none
      }
    }
  }
</style>
