<template>
  <div class="forget">
    <h1 class="title">Reset Password</h1>
    <el-form :model="ruleFormForget" :rules="rules2" ref="ruleFormForget" class="demo-ruleForm forget-form">
      <el-form-item label="mobile" prop="mobile">
        <el-input v-model="ruleFormForget.mobile" placeholder="Your mobile"></el-input>
      </el-form-item>
      <el-form-item label="newPassword" prop="newPassword">
        <el-input type="password" v-model="ruleFormForget.newPassword" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPassword">
        <el-input type="password" v-model="ruleFormForget.checkPassword" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="forget-button" size="middle" type="warning" @click="submitForm('ruleFormForget')">
          Reset Password
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/axios'
  import goto from '../../config/goto'
  const ERR_OK = 0
  export default {
    name: 'forget',
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
          if (this.ruleFormForget.checkPassword !== '') {
            this.$refs.ruleFormForget.validateField('checkPassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleFormForget.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormForget: {
          mobile: '',
          newPassword: '',
          checkPassword: ''
        },
        rules2: {
          mobile: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          newPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            const opt = this.ruleFormForget
            api.forgetPassword(opt).then(({data}) => {
              if (data.code === ERR_OK) {
                this.$message.success('Reset Password successful')
                goto(this, 'login')
              } else {
                this.$message.error('Reset Password error')
              }
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
