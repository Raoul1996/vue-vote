<template>
  <div class="card">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="alertMessage">{{button}}</el-button>
      </div>
      <div class="content">
        <div>这里放元信息{{content}}</div>
      </div>
      <div class="bottom">
        <div class="time">{{currentDate}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import format from 'date-fns/format'

  export default {
    name: 'card',
    props: {
      'content': {
        type: String,
        require: true
      }
    },
    data () {
      return {
        title: 'this is the card title',
        button: 'share',
        currentDate: format(new Date(), 'YYYY/DD/MM HH:mm')
      }
    },
    mounted () {
//      this.alertMessage()
    },
    methods: {
      alertMessage () {
        this.$message.success('you click me')
        console.log(10086)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .card {
    text-align left
    .time {
      font-size: 13px;
      color: #999;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
