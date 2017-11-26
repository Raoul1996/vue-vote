<template>
  <div class="users">
    <p>{{msg}}</p>
    <div class="users-list-wrapper">
      <ul class="users-list" v-for="(item, index) in users">
        <li class="users-item">{{item.mobile || item.email}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import {user} from '../../service/getData'
  import api from '@/service/axios'
  export default {
    name: 'template',
    data () {
      return {
        msg: 'this is the users list!',
        users: []
      }
    },
    created () {
      this.getUserMsg()
    },
    methods: {
      async getUserMsg () {
        await api.getUser().then(({data}) => {
          this.users = data
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .users {
    .users-list-wrapper {
      /*display flex*/
      .users-list {
        flex 1
        padding 0
        .users-item {
          list-style none
        }
      }
    }
  }
</style>
