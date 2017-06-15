<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <el-form :model="ruleFormLogin" :rules="rules2" ref="ruleFormLogin" class="demo-ruleForm">
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleFormLogin.username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="pass">
        <el-input type="password" v-model="ruleFormLogin.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFormLogin')">Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  import { Message } from 'element-ui'
  import { sendLogin } from '../../service/getData'
  import { setStore } from '../../config/localStorage'
  import goto from '../../config/goto'
  import { mapActions, mapMutations } from 'vuex'
  const ERR_OK = 0
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
          username: '15033517219',
          pass: '123456'
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'USER_LOGIN'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            const {username, pass} = this.ruleFormLogin
            let data = await sendLogin(username, pass)
            console.log(data)
            if (data.code === ERR_OK) {
              Message.success('login successful')
              this.login = true
              this.USER_LOGIN(true)
              setStore('token', data.data.token)
              goto(this, 'hello')
            } else {
              Message.error('Login error')
            }
          } else {
            Message.error('submit error')
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
    width 50%
    margin 0 auto
  }
</style>
