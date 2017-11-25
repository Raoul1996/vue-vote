<template>
  <div class="detail">
    <div v-if="!pub">
      <el-form :inline="true" :model="form" class="" @submit.native.prevent>
        <div class="el-form-item">
          <label class="el-form-item__label">{{name}}</label>
          <div class="el-form-item__content">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-else :content="content">
      <h1 class="title">{{content.title}}（{{voteType}}）</h1>
      <div class="end-time">截止时间：{{end}}</div>
      <div class="option">
        <div class="option-list">
          <el-checkbox-group v-model="options" @change="optionsChange">
            <div v-for="(o, index) in content.options" class="option-list-item">
              <el-checkbox :label="o.id" :index="index">{{o.title}}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <el-button type="primary" :disabled="!enableClickButton" size="medium" @click="submitVote">提交</el-button>
    </div>
  </div>
</template>

<script>
  import api from '../service/axios'
  import format from 'date-fns/format'

  export default {
    name: 'content',
    data () {
      return {
        id: this.$route.params.id,
        pub: +this.$route.query.pub,
        path: this.$route.path,
        content: {},
        name: '密码',
        form: {
          password: null
        },
        options: [],
        enableClickButton: false
      }
    },
    computed: {
      end () {
        return format(this.content.endAt, 'YYYY/DD/MM HH:mm')
      },
      voteType () {
        return this.content.type === 1 ? '单选' : '多选'
      }
    },
    mounted () {
      if (this.$data.pub && this.$route.query) {
        this.getVoteDetail(null, this.$route.params)
      } else {
        this.$message.info('需要密码')
      }
    },
    methods: {
      optionsChange () {
        const {maxChoose = 1} = this.content
        const length = this.options.length
        if (length < maxChoose) {
          // do nothing
        } else if (this.options.length === maxChoose) {
          this.enableClickButton = true
        } else if (this.options.length > maxChoose) {
          this.$message.info(`最多选择${maxChoose}项`)
          this.options.pop()
        }
      },
      submitVote () {
        console.log(this.options)
      },
      getVoteDetail (query, param) {
        console.log(this.$route.params)
        // 这里不知道后端发生了什么，拦截器失效了？
        api.getDetail(query, param).then(({data}) => {
          this.content = data
          this.pub = true
        })
      },
      onSubmit () {
        const {password} = this.$data.form
        console.log(password)
        this.getVoteDetail({password: password}, this.$route.params)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail {
    margin 0 auto
    width 30%
    min-width 400px
    .content {
      background-color #ffffff
      margin-top 10px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .title {
        font-size 1.5em
      }
      .end-time {
        font-size 14px
        text-align right
        color #247cff
      }
      .option {
        text-align center
        margin 1em auto
        min-width 300px
        width 60%
        .option-list {
          display inline-block
          margin-left -3em
          &-item {
            text-align left
            font-size 20px
          }
        }
      }

    }

  }
</style>
