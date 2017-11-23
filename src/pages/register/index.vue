<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <el-form :model="ruleFormRegister" :rules="rules" ref="ruleFormRegister" class="register-form">
      <el-form-item label="name" prop="name">
        <el-input v-model="ruleFormRegister.name" placeholder="Pick a name"></el-input>
      </el-form-item>
      <el-form-item label="mobile" prop="mobile">
        <el-input v-model="ruleFormRegister.mobile" placeholder="Pick a mobile"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="ruleFormRegister.password" auto-complete="off"
                  placeholder="Create a password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPassword">
        <el-input type="password" v-model="ruleFormRegister.checkPassword" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-button" size="middle" type="primary" @click="submitForm('ruleFormRegister')">
          Sign up for Voter
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  // now Let's try to use axios api~
  import api from '@/service/axios'

  import { sleep, goto } from '@/utils'

  export default {
    name: 'register',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.ruleFormRegister.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormRegister: {
          name: '',
          mobile: '',
          password: '',
          checkPassword: '',
          token: false
        },
        rules: {
          name: [
            {require: true, message: '请取一个用户名', trigger: 'blur'}
          ],
          mobile: [
            {require: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
//            {type: 'number', message: '手机号码只有数字'}
          ],
          password: [
            {require: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          checkPassword: [
            {require: true, message: '请填写密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            // the opt object is the request body.
            const opt = this.ruleFormRegister
            api.userRegister(opt).then(async ({data}) => {
              this.$message.success('Register successful')
              await sleep(1000)
              goto(this, 'login')
            })
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
  .register {
    width 30%
    min-width 400px
    margin 0 auto
    .register-form {
      background-color #ffffff
      margin-top 30px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .register-button {
        width 100%
      }
    }
  }
</style>
