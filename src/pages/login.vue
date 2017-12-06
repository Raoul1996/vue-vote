<template lang="pug">
  .login
    h1.title Sign in to Voter
    el-form.card-border(:model="login", :rules="rules", ref="login")
      el-form-item(label="identifier", prop="identifier")
        el-input(v-model="login.identifier")
      el-form-item(label="password", prop="password")
        el-input(@keyup.native.enter="submitForm('login')", type="password", v-model="login.password", auto-complete="on")
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
  import api from 'service/axios'
  import { setStore } from '../config/localStorage'
  import { lazyGoto, goto } from '@/utils'
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    name: 'login',
    data () {
      return {
        login: {
          identifier: null,
          password: null,
          // 使用的是 web 端
          client: 1,
          token: false
        },
        rules: {
          password: [
            {require: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          identifier: [
            {require: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
//            {type: 'number', message: '手机号码只有数字'}
          ]
        },
        msgFlag: true
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
        'USER_LOGIN'
      ]),
      ...mapMutations([
        'SET_TOKEN'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            const opt = this.login
            api.userLogin(opt).then((data) => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'login successful'
              })
              this.USER_LOGIN(true)
//              console.log(data)
              // 这里我还是选择把token放到了本地，虽然可能不会去使用
              setStore('token', data.token)
              this.SET_TOKEN(data.token)
              lazyGoto(this, 'vote')
            })
//            console.log(data)
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
