<template>
  <div class="change">
    <h1 class="title">Change Password</h1>
    <el-form :model="ruleFormChange" :rules="rulesChange" ref="ruleFormChange" class="demo-ruleForm change-form">
      <el-form-item label="mobile" prop="mobile">
        <el-input v-model="ruleFormChange.mobile" placeholder="Your mobile"></el-input>
      </el-form-item>
      <el-form-item label="oldPassword" prop="oldPassword">
        <el-input type="password" v-model="ruleFormChange.oldPassword" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="newPassword" prop="password">
        <el-input type="password" v-model="ruleFormChange.newPassword" auto-complete="off"
                  placeholder="Create a new password"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPassword">
        <el-input type="password" v-model="ruleFormChange.checkPassword" auto-complete="off"
                  placeholder="Confirm your password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="change-button" size="middle" type="danger" @click="submitForm('ruleFormChange')">
          Change Password
        </el-button>
      </el-form-item>
    </el-form>
    <div>{{token}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/service/axios'
  import { removeStore } from '../../config/localStorage'
  import { mapActions, mapState } from 'vuex'
  import store from '../../store'
  import goto from '../../config/goto'
  export default {
    name: 'change',
    // 提供store接口
    store,
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
          if (this.ruleFormChange.checkPassword !== '') {
            this.$refs.ruleFormChange.validateField('checkPassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleFormChange.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleFormChange: {
          mobile: '',
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rulesChange: {
          mobile: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          oldPassword: [
            {validator: validatePass, trigger: 'blur'}
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
    computed: {
      ...mapState([
        'token'
      ])
    },
    methods: {
      ...mapActions([
        'USER_LOGIN'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
//            const {mobile, oldPassword, newPassword, checkPassword} = this.ruleFormChange
            const opt = this.ruleFormChange
            api.resetPassword(opt).then(({data}) => {
//            console.log(data)
              removeStore('token')
              this.USER_LOGIN(false)
              this.$message.success('Change Password successful')
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
