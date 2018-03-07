<template lang="pug">
  .forget
    h1.title Reset Password
    el-form.forget-form(:model="forget", :rules="rules", ref="forget")
      el-form-item(label="mobile", prop="mobile")
        el-input(v-model="forget.mobile", placeholder="Your mobile")
      el-form-item(label="pwd", prop="pwd")
        el-input(type="password", v-model="forget.pwd", auto-complete="off", placeholder="Create a new password")
      el-form-item(label="confirm", prop="checkPassword")
        el-input(type="password", @keyup.native.enter="submitForm('forget')", v-model="forget.checkPassword", auto-complete="off", placeholder="Confirm your password")
      el-form-item(label="captcha", prop="captcha")
        div.captcha-wrapper
          el-input.captcha-input(v-model="forget.captcha", placeholder="请输入验证码", type="text")
          captcha.captcha
      el-form-item
        el-button.forget-button(size="middle", type="warning", @click="submitForm('forget')") Reset Password
</template>

<script type="text/ecmascript-6">
  import { lazyGoto } from '../utils'
  import { mapActions } from 'vuex'
  import Captcha from '../components/captcha'

  export default {
    components: {Captcha},
    name: 'forget',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.forget.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        forget: {
          mobile: '',
          pwd: '',
          captcha: '',
          checkPassword: ''
        },
        rules: {
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['forgetAction']),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.forget
            this.forgetAction(opt).then(async () => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'Reset Password successful'
              })
              await lazyGoto(this, 'login')
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .forget {
    width 30%
    min-width 400px
    margin 0 auto
    .forget-form {
      background-color #ffffff
      margin-top 30px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .captcha-wrapper {
        position relative
        padding-right 40%
        text-align left
        .captcha-input {
          width 90%
        }
        .captcha {
          position absolute
          right 0
          bottom 1px
          height 38px
          width 40%
        }
      }
      .forget-button {
        width 100%
      }
    }
  }

  @media screen and (max-width: 400px) {
    .forget {
      min-width 300px
    }
  }
</style>
