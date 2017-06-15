<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <el-form :model="ruleFormRegister" :rules="rules2" ref="ruleFormRegister" class="demo-ruleForm">
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleFormRegister.username" placeholder="Pick a username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="pass">
        <el-input type="password" v-model="ruleFormRegister.pass" auto-complete="off"
                  placeholder="Create a password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPass">
        <el-input type="password" v-model="ruleFormRegister.checkPass" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFormRegister')">Sign up for vue-login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Message } from 'element-ui'
  import { sendRegister } from '../../service/getData'
  import goto from '../../config/goto'
  const ERR_OK = 0
  export default {
    name: 'register',
    data () {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        setTimeout(() => {
          callback()
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleFormRegister.checkPass !== '') {
            this.$refs.ruleFormRegister.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleFormRegister.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormRegister: {
          username: '15033517219',
          pass: '123456',
          checkPass: '123456'
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            const {username, pass, checkPass} = this.ruleFormRegister
            let data = await sendRegister(username, pass)
            if (data.code === ERR_OK) {
              Message.success('Register successful')
              goto(this, 'hello')
            } else {
              Message.error('Register error')
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
  .register {
    width 50%
    margin 0 auto
  }
</style>
