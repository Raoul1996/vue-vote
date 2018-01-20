<template lang="pug">
  .own
    div(:vote="vote", @click="handleClick(vote.id)")
      .name {{name}}
      .title {{vote.title}}
      .time {{start}} -- {{end}}
    div.histogram(v-if="showHistogram && statistic.length")
      histogram(:statistic="statistic")
</template>
<script>
  import { mapActions, mapMutations } from 'vuex'
  import Histogram from './charts/histogram'

  export default {
    components: {Histogram},
    name: 'own',
    props: {
      vote: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        start: new Date(this.vote.start_at).toLocaleString(),
        end: new Date(this.vote.end_at).toLocaleString(),
        showHistogram: false,
        statistic: []
      }
    },
    destroyed () {
      this.VOTE_STATISTIC([])
    },
    methods: {
      ...mapActions(['getStatisticAction']),
      ...mapMutations(['VOTE_STATISTIC']),
      handleClick (id) {
        // 使用集中存储的 Statistic 会导致有时获取不到信息，所以这里独立处理
        this.getStatisticAction(id).then(res => {
          this.statistic = res
        })
        this.showHistogram = !this.showHistogram
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .hidden {
    display none
  }

  .own {
    text-align left
    margin 1em auto
    border 3px solid #cbcbcb
    border-radius 3px
    padding 2em
    cursor pointer
    .title {
      font-size 1.5em
    }
  }
</style>
