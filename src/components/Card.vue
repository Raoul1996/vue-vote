<template>
  <div>
    <el-card :body-style="{ padding: '20px' }">
      <!--<img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">-->
      <!--<div style="padding: 14px;">-->
      <!--<span>好吃的汉堡</span>-->
      <!--<div class="bottom clearfix">-->
      <!--<time class="time">{{ currentDate }}</time>-->
      <!--<el-button type="text" class="button">操作按钮</el-button>-->
      <!--</div>-->
      <!--</div>-->
      <div @click="alertMessage">这里放元信息</div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'card',
    data () {
      return {
        currentDate: new Date()
      }
    },
    mounted () {
      this.alertMessage()
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
</style>
