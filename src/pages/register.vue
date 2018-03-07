<template lang="pug">
  .register
    h1.title Register
    el-form.card-border(:model="register", :rules="rules", ref="register")
      el-form-item(label="name", prop="name")
        el-input(v-model="register.name", placeholder="Pick a name")
      el-form-item(label="email", prop="email")
        el-input(v-model="register.email", placeholder="Input Your email")
      el-form-item(label="mobile", prop="mobile")
        el-input(v-model="register.mobile", placeholder="Pick a mobile")
      el-form-item(label="password", prop="pwd")
        el-input(type="password", v-model="register.pwd", auto-complete="off", placeholder="Create a password")
      el-form-item(label="confirm", prop="confirm")
        el-input(type="password", @keyup.native.enter="submitForm('register')", v-model="register.confirm", auto-complete="off", placeholder="Confirm your password")
      el-form-item(label="captcha", prop="captcha")
        div.captcha-wrapper
          el-input.captcha-input(v-model="register.captcha", placeholder="请输入验证码", type="text")
          captcha.captcha
      el-form-item
        el-button.register-button(size="middle", type="primary", @click="submitForm('register')")
          | Sign up for Voter
</template>
<script type="text/ecmascript-6">
  import { lazyGoto } from '../utils'
  import { mapActions } from 'vuex'
  import Captcha from '../components/captcha'

  export default {
    components: {Captcha},
    name: 'register',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.register.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        register: {
          name: '',
          mobile: '',
          email: '',
          captcha: '',
          pwd: '',
          confirm: '',
          token: false
        },
        rules: {
          name: [
            {required: true, message: '请取一个用户名', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请填写邮箱', trigger: 'blur'},
            {type: 'email', message: '请填写正确的邮箱', trigger: 'blur'}
          ],
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
          confirm: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'registerAction'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.register
            this.registerAction(opt).then(async () => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'Register successful'
              })
              await lazyGoto(this, 'send')
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
  .register {
    width 30%
    min-width 400px
    margin 0 auto
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
    .register-button {
      width 100%
    }
  }

  @media screen and (max-width: 400px) {
    .register {
      min-width 300px
    }
  }
</style>
