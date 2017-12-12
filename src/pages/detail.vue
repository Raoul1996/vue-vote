<template lang="pug">
  .detail
    .password-input(v-if="!pub")
      el-form(:inline="true", :model="form", @submit.native.prevent="true")
        .el-form-item
          label.el-form-item__label {{name}}
          .el-form-item__content
            el-input(v-model="form.password", placeholder="请输入密码")
        el-form-item
          el-button(type="primary", @click="onSubmit", :disabled="!form.password") 确定
    .card-border(v-if="pub", :detail="detail")
      h1.title {{detail.vote.title}}（{{detail.vote.voteType}}）
      .end-time 截止时间：{{detail.vote.end}}
      .option
        .option-list
          el-checkbox-group(v-model="options", @change="optionsChange")
            .option-list-item(v-for="(o, index) in detail.options")
              el-checkbox(:label="o.id", :index="index") {{o.title}}
      el-button.button(type="primary", :disabled="!enableClickButton", size="medium", @click="submitVote")
        | 提交
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'detail',
    data () {
      const {path, params: {id}, query: {pub}} = this.$route
      return {
        id: id,
        pub: +pub,
        path: path,
        name: '密码',
        form: {
          password: null
        },
        options: [],
        enableClickButton: false
      }
    },
    computed: {
      ...mapState(['detail'])
    },
    watch: {
      detail: function (val, oldValue) {
        this.$data.pub = true
      }
    },
    mounted () {
      if (this.$data.pub && this.$route.query) {
        this.getDetailAction(this.$route.params.id)
      } else {
        this.$message({
          showClose: true,
          message: '需要密码'
        })
      }
    },
    methods: {
      ...mapActions([
        'submitAction',
        'getDetailAction'
      ]),
      optionsChange () {
        const {maxChoose = 1} = this.detail.options
        const length = this.options.length
        if (length < maxChoose) {
          // do nothing
          this.enableClickButton = false
        } else if (this.options.length === maxChoose) {
          this.enableClickButton = true
        } else if (this.options.length > maxChoose) {
          this.$message({
            showClose: true,
            type: 'info',
            message: `最多选择 ${maxChoose} 项`
          })
          this.options.pop()
        }
      },
      submitVote () {
        // this.getVoteDetail(this.$route.params)
        const opt = {options: this.options}
        this.submitAction(`${this.$route.params.id}`, opt).then(() => {
          this.$message.info('yes')
        })
      },
      onSubmit () {
        const {password} = this.form
        this.$data.pub = true
        this.getDetailAction(`${this.id}?password=${password}`)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail {
    margin 0 auto
    width 40%
    min-width 400px
    .password-input {
      margin-top 60px
    }
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
        .option-list-item {
          padding 20px
          text-align left
        }
      }
    }
    .button {
      margin 1em
      width 50%
    }

  }

  @media screen and (max-width: 400px) {
    .detail {
      min-width 300px
      .content {
        .option {
          text-align left
          .option-list {
            margin-left 0
          }
        }
      }
    }
  }
</style>
