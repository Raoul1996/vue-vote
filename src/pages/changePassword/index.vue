<template>
  <div class="change">
    <h1 class="title">Change Password</h1>
    <el-form :model="ruleFormChange" :rules="rulesChange" ref="ruleFormChange" class="demo-ruleForm change-form">
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleFormChange.username" placeholder="Your username"></el-input>
      </el-form-item>
      <el-form-item label="oldPassword" prop="oldPass">
        <el-input type="password" v-model="ruleFormChange.oldPass" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="newPassword" prop="pass">
        <el-input type="password" v-model="ruleFormChange.pass" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPass">
        <el-input type="password" v-model="ruleFormChange.checkPass" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="change-button" size="middle" type="danger" @click="submitForm('ruleFormChange')">
          Change Password
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Message } from 'element-ui'
  import { changePassword } from '../../service/getData'
  import { removeStore } from '../../config/localStorage'
  import { mapActions } from 'vuex'
  import goto from '../../config/goto'
  const ERR_OK = 0
  export default {
    name: 'change',
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
          if (this.ruleFormChange.checkPass !== '') {
            this.$refs.ruleFormChange.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleFormChange.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormChange: {
          username: '15033517219',
          oldPass: '123456',
          pass: '1234567',
          checkPass: '1234567'
        },
        rulesChange: {
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          oldPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
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
            const {username, oldPass, pass, checkPass} = this.ruleFormChange
            let data = await changePassword(username, oldPass, pass)
            if (data.code === ERR_OK) {
              removeStore('token')
              this.USER_LOGIN(false)
              Message.success('Change Password successful')
              goto(this, 'login')
            } else {
              Message.error('Change Password error')
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
  .change {
    width 30%
    min-width 400px
    margin 0 auto
    .change-form {
      background-color #ffffff
      margin-top 30px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .change-button {
        width 100%
      }
    }
  }
</style>
