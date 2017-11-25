<template>
  <div class="forget">
    <h1 class="title">Reset Password</h1>
    <el-form :model="forget" :rules="rules" ref="forget" class="forget-form">
      <el-form-item label="mobile" prop="mobile">
        <el-input v-model="forget.mobile" placeholder="Your mobile"></el-input>
      </el-form-item>
      <el-form-item label="newPassword" prop="newPassword">
        <el-input type="password" v-model="forget.newPassword" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPassword">
        <el-input type="password" @keyup.native.enter="submitForm('forget')" v-model="forget.checkPassword" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="forget-button" size="middle" type="warning" @click="submitForm('forget')">
          Reset Password
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/service/axios'
  import { lazyGoto } from '../utils'

  export default {
    name: 'forget',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.ruleFormRegister.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        forget: {
          mobile: '',
          newPassword: '',
          checkPassword: ''
        },
        rules: {
          mobile: [
            {require: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          ],
          newPassword: [
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
            const opt = this.forget
            api.forgetPassword(opt).then(async ({data}) => {
              this.$message.success('Reset Password successful')
              await lazyGoto(this, 'login')
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
      .forget-button {
        width 100%
      }
    }
  }
</style>
