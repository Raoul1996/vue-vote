<template>
  <div class="login">
    <h1 class="title">Sign in to Voter</h1>
    <el-form :model="login" :rules="rules" ref="login" class="login-form">
      <el-form-item label="identifier" prop="identifier">
        <el-input v-model="login.identifier"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input @keyup.native.enter="submitForm('login')" type="password" v-model="login.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="forget" class="forget">Forgot password?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" size="middle" @click="submitForm('login')">Sign in
        </el-button>
      </el-form-item>
    </el-form>
    <div class="register-form">
      New to Voter?
      <router-link to="register" class="register">
        Create an account.
      </router-link>
    </div>
  </div>
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
        this.$message.info('Please Login')
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
              this.$message.success('login successful')
              this.USER_LOGIN(true)
              // 这里我还是选择把token放到了本地，虽然可能不会去使用
              setStore('token', data.token)
              this.SET_TOKEN(data.token)
              lazyGoto(this, 'vote')
            })
//            console.log(data)
          } else {
            this.$message.error('submit error')
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
    .login-form {
      background-color #ffffff
      margin-top 10px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .forget {
        margin-top -1em
        margin-bottom -1em
        float right
      }
      .login-button {
        width 100%
      }
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
</style>
