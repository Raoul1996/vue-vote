<template lang="pug">
  .login
    h1.title Sign in to Voter
    el-form.card-border(v-bind:model="login", ref="login", v-bind:rules="rules")
      el-form-item(label="email", prop="email")
        el-input(v-model="login.email", placeholder="请输入邮箱")
        <!--el-select(v-model="login.email", filterable, placeholder="请输入邮箱地址" class="el-input", @change="ChangeConsole")-->
        <!--el-option(v-for="item in login.options", :key="item.value", :label="item.label", :value="item.value")-->
      <!--el-form-item(label="mobile", prop="mobile")-->
      <!--el-input(v-model="login.mobile" placeholder="请输入手机号")-->
      el-form-item(label="password", prop="pwd")
        el-input(@keyup.native.enter="submitForm('login')", type="password", v-model="login.pwd", placeholder="请输入密码", auto-complete="on")
      el-form-item(label="captcha", prop="captcha")
        div.captcha-wrapper
          el-input.captcha-input(v-model="login.captcha", placeholder="请输入验证码", type="text", )
          captcha.captcha
      el-form-item
        router-link.forget(to="forget") Forgot password?
      el-form-item
        el-button.login-button(type="primary", size="middle", @click="submitForm('login')")
          | Sign in
    .register-form
      | New to Voter?
      router-link.register(to="register")
        | Create an account.
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  import { lazyGoto } from 'src/utils'
  import { mapActions } from 'vuex'
  import Captcha from '../components/captcha'

  export default {
    components: {Captcha},
    name: 'login',
    data () {
      return {
        login: {
          email: '',
          // mobile: null,
          pwd: null,
          captcha: '',
          // 使用的是 web 端
          client: 1
        },
        rules: {
          email: [
            {required: true, message: '请填写邮箱', trigger: 'blur'},
            {type: 'email', message: '请填写正确的邮箱', trigger: 'blur'}
          ],
          // mobile: [
          //   {required: true, message: '请填写手机号码', trigger: 'blur'},
          //   {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          // ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ]
        },
        msgFlag: true
      }
    },
    watch: {
      email: function (val, oldValue) {
        console.log(val)
        console.log(oldValue)
      }
    },
    mounted () {
      if (this.msgFlag) {
        this.$message({
          showClose: true,
          type: 'info',
          message: 'Please Login'
        })
        this.msgFlag = !this.msgFlag
      }
    },
    methods: {
      ...mapActions([
        'loginAction'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.login
            this.loginAction(opt).then(async () => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'login successful'
              })
              await lazyGoto(this, 'vote')
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
  .login {
    margin 0 auto
    width 30%
    min-width 400px
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
    .forget {
      margin-top -1em
      margin-bottom -1em
      float right
    }
    .login-button {
      width 100%
    }
    .forget, .register {
      text-decoration none
      color #1c8de0
      font-size 1em
    }
    .register-form {
      margin-top 30px
      padding 10px 50px

      border-radius 5px
      border 1px solid #d8dee2
    }
  }

  @media screen and (max-width: 400px) {
    .login {
      min-width 300px
    }
  }
</style>
