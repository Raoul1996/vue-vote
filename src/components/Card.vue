<template>
  <div class="card" @click="alertMessage(id)">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">{{button}}</el-button>-->
      </div>
      <div class="content">
        <div>{{voteType}}</div>
      </div>
      <div class="bottom">
        <div class="time">{{start}} ---- {{end}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import { goto } from '../utils'

  export default {
    name: 'card',
    props: {
      'vote': {
        type: Object,
        require: true
      }
    },
    data () {
      const {id = '', title = '', type = '', isPublic = 0} = this.vote
      return {
        id: id,
        title: title,
        button: id,
        type: type,
        // TODO:使用 Vuex 进行传参
        isPublic: isPublic
      }
    },
    computed: {
      voteType: function () {
        return this.type === 1 ? '单选' : '多选'
      },
      start: function () {
        return format(this.vote.startAt, 'YYYY/DD/MM HH:mm')
      },
      end: function () {
        return format(this.vote.endAt, 'YYYY/DD/MM HH:mm')
      }
    },
    mounted () {
//      this.alertMessage()
    },
    methods: {
      alertMessage (id) {
//        this.$message.success('you click me')
//        console.log(id)
        goto(this, `/vote/${id}?pub=${this.$data.isPublic}`)
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
