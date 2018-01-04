<template lang="pug">
  .create
    h1.title 创建投票
    el-form(:model="create", :rules="rules", ref="create", label-position="left")
      .create-card
        el-form-item(prop="isPublic", required="")
          el-switch(v-model="create.isPublic", active-text="公开投票", inactive-text="私密投票")
        el-form-item(label="投票名称", prop="title", required="")
          el-input(v-model.trim="create.title", placeholder="请填写投票名称")
        el-form-item(label="投票类型", prop="type")
          el-select(v-model="create.type", placeholder="请选择投票类型")
            el-option(label="单选", value=0)
            el-option(label="多选", value=1)
        el-form-item(label="选项上限", prop="max", v-if="+create.type")
          el-input(v-model.number="create.max", placeholder="请输入选项上限")
            el-option(label="单选", value=0)
            el-option(label="多选", value=1)
        el-form-item(label="投票密码", prop="password", v-if="!create.isPublic")
          el-input(v-model="create.password", placeholder="请填写投票密码")
      .create-card
        el-form-item(label="开始时间", required="")
          el-form-item(prop="startAt")
            el-date-picker(v-model="create.startAt", type="datetime", placeholder="选择日期时间")
        el-form-item(label="结束时间", required="")
          el-form-item(prop="endAt")
            el-date-picker(v-model="create.endAt", type="datetime", placeholder="选择日期时间")
      .create-card
        el-form-item(v-for="(option, index) in create.options", :label="'选项' + (index + 1)", :key="option.key", :prop="'options.' + index + '.value'", :rules="{required: true, message: '选项内容不能为空', trigger: 'blur'}")
          .options
            el-input.option-item(v-model="option.value")
            el-button.option-button(@click.prevent="removeOption(option)") 删除
        el-form-item
          el-button.el-button.add-button(@click="addOption") 新增选项
          // <el-button @click="resetForm('create')">重置</el-button>
      el-form-item
        .submit-button-wrapper
          el-button.el-button(@click="submitForm('create')", type="primary") 立即创建
        // <el-button @click="resetForm('create')">重置</el-button>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === null && !this.create.isPublic) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        create: {
          title: '',
          password: null,
          type: '',
          max: 1,
          startAt: '',
          endAt: '',
          isPublic: 1,
          options: [{
            value: ''
          }]
        },
        rules: {
          title: [
            {required: true, message: '请输入投票名称', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择投票类型', trigger: 'change'}
          ],
          max: [
            {required: true, message: '请输入选项上限', trigger: 'blur'}
          ],
          startAt: [
            {type: 'date', required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          endAt: [
            {type: 'date', required: true, message: '请选择结束时间', trigger: 'change'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['vote'])
    },
    methods: {
      ...mapActions(['createVoteAction']),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const opt = this.create
            if (opt.isPublic) {
              opt.password = null
            }
            this.createVoteAction(opt).then(() => {
              console.log(this.vote)
              this.$message({
                showClose: true,
                type: 'success',
                message: 'create successful'
              })
            })
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: 'submit error'
            })
            return false
          }
        })
      },
      removeOption (item) {
        let index = this.create.options.indexOf(item)
        if (index !== -1) {
          this.create.options.splice(index, 1)
        }
      },
      addOption () {
        this.create.options.push({
          value: '',
          key: Date.now()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-input, .el-select {
    width 100%
    max-width: 400px
  }

  .el-button {
    width 100%
    max-width 480px
  }

  .create {
    width 30%
    min-width 500px
    margin 0 auto
    .create-card {
      background-color #ffffff
      margin 10px auto
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2

      .options {
        width 100%
        clear: both;
        text-align left
        .option-item {
          width 78%
        }
        .option-button {
          padding-left 0
          padding-right 0
          width 20%
        }
      }
      .create-button {
        width 100%
      }
      .add-button {
        width 100%
        border 1px dashed #d9d9d9
      }
    }
  }

  .line {
    border 1px solid #d8dee2
  }

  @media screen and (max-width: 500px) and (min-width: 400px) {
    .el-input, .el-select {
      max-width: 400px
    }

    .el-picker-panel .el-date-picker .el-popper {
      width 100%
    }

    .create {
      min-width 400px
      .create-card {
        padding 20px 20px
      }
    }
  }

  @media screen and (max-width: 400px) {
    .el-input, .el-select {
      max-width: 300px
    }

    .el-picker-panel .el-date-picker .el-popper {
      width 100%
    }

    .create {
      min-width 300px
      .create-card {
        padding 20px 20px
      }
    }
  }

</style>
