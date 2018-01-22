<template lang="pug">
  div
    info.info-card(:info="info")
    .card-border
      ul.vote-list
        li.vote-item(v-for="(o, index) in ownVote", :key="index")
          own(:vote="o", :name="info.name")
</template>

<script type="text/ecmascript-6">
  import { mapActions, mapState } from 'vuex'
  import own from '../../components/own'
  import Statistic from '../../components/statistic'
  import Info from '../../components/info'

  export default {
    components: {
      Info,
      Statistic,
      own
    },
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
      'info',
      'statistic',
      'ownVote'
    ]),
    created () {
      this.getUserMsg()
    },
    methods: {
      ...mapActions([
        'infoAction',
        'getStatisticAction',
        'getOwnVoteAction'
      ]),
      getUserMsg () {
        // 这里的参数留着以后用
        this.infoAction(this.info.id)
        this.getOwnVoteAction(this.info.id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .info-card {
    margin 30px
  }
</style>
