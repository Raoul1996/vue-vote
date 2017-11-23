<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <el-form :model="ruleFormRegister" :rules="rules2" ref="ruleFormRegister" class="demo-ruleForm register-form">
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
  import api from '@/axios'

  import goto from '../../config/goto'
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
          if (this.ruleFormRegister.checkPassword !== '') {
            this.$refs.ruleFormRegister.validateField('checkPassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleFormRegister.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormRegister: {
          mobile: '',
          password: '',
          checkPassword: ''
        },
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          mobile: [
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
            // the opt object is the request body.
            const opt = this.ruleFormRegister
            api.userRegister(opt).then(({data}) => {
              this.$message.success('Register successful')
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
