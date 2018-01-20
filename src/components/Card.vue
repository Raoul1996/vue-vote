<template lang="pug">
  div.card(@click="getDetail(id)")
    el-card(:body-style="{ padding: '20px' }")
      div.clearfix(slot="header")
        span {{title}}
      div.content
        div {{voteType}}
      div.bottom
        div.time {{start}} ---- {{end}}
</template>
<script>
  import { goto } from '../utils'
  import { mapMutations } from 'vuex'
  export default {
    name: 'item',
    props: {
      'vote': {
        type: Object,
        required: true
      }
    },
    data () {
      const {id = '', title = '', type = '', is_public = 0} = this.vote
      return {
        id,
        title,
        button: id,
        type: type,
        path: this.$route.path,
        isPublic: is_public
      }
    },
    computed: {
      voteType: function () {
        return this.type === 0 ? '单选' : '多选'
      },
      start: function () {
        return new Date(this.vote.start_at).toLocaleString()
      },
      end: function () {
        return new Date(this.vote.end_at).toLocaleString()
      }
    },
    methods: {
      ...mapMutations([
        'VOTE_DETAIL_MSG'
      ]),
      getDetail (id) {
        this.VOTE_DETAIL_MSG(Object.assign({}, this.vote, {voteType: this.voteType, start: this.start, end: this.end}))
        goto(this, `${this.path}/${id}?pub=${this.isPublic}`)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .card {
    text-align left
    .time {
      font-size 13px
      color #999
    }
    .bottom {
      margin-top 13px
      /*border-top 1px solid #e6ebf5*/
      line-height 12px
    }

    .button {
      padding 0
      float right
    }

    .image {
      width 100%
      display block
    }

    .clearfix:before,
    .clearfix:after {
      display table
      content ""
    }

    .clearfix:after {
      clear both
    }
  }
</style>
