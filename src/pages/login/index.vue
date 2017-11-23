<template>
  <div class="login">
    <h1 class="title">Sign in to Voter</h1>
    <el-form :model="ruleFormLogin" :rules="rulesLogin" ref="ruleFormLogin" class="demo-ruleForm login-form">
      <el-form-item label="mobile" prop="mobile">
        <el-input v-model="ruleFormLogin.mobile"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="ruleFormLogin.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="forget" class="forget">Forgot password?</router-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" size="middle" @click="submitForm('ruleFormLogin')">Sign in
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
  import api from '@/axios'
  import { setStore } from '../../config/localStorage'
  import goto from '../../config/goto'
  import { mapActions, mapState, mapMutations } from 'vuex'

  const ERR_OK = 0
  const ERR_USER = 10001
  const ERR_PASS = 10002
  export default {
    name: 'login',
    data () {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        ruleFormLogin: {
          mobile: '',
          password: ''
        },
        rulesLogin: {
          password: [
            {validator: validatePass, trigger: 'blur'},
            {}
          ],
          mobile: [
            {validator: checkUsername, trigger: 'blur'}
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
//            const {mobile, password} = this.ruleFormLogin
            const opt = this.ruleFormLogin
            api.userLogin(opt).then(({data}) => {
              if (data.code === ERR_OK) {
                this.$message.success('login successful')
                this.USER_LOGIN(true)
                // 这里我还是选择把token放到了本地，虽然可能不会去使用
                setStore('token', data.data.token)
                this.SET_TOKEN(data.data.token)
                goto(this, 'hello')
              } else {
                this.$message.error(data.data.msg)
              }
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
    width 30%
    min-width 400px
    margin 0 auto
    .login-form {
      background-color #ffffff
      margin-top 10px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .forget {
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
