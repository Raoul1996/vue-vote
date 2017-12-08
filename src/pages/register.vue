<template lang="pug">
  .register
    h1.title Register
    el-form.card-border(v-bind:model="register", v-bind:rules="rules", ref="register")
      el-form-item(label="name", prop="name")
        el-input(v-model="register.name", placeholder="Pick a name")
      el-form-item(label="mobile", prop="mobile")
        el-input(v-model="register.mobile", placeholder="Pick a mobile")
      el-form-item(label="password", prop="password")
        el-input(type="password", v-model="register.password", auto-complete="off", placeholder="Create a password")
      el-form-item(label="confirm", prop="checkPassword")
        el-input(type="password", @keyup.native.enter="submitForm('register')", v-model="register.checkPassword", auto-complete="off", placeholder="Confirm your password")
      el-form-item
        el-button.register-button(size="middle", type="primary", @click="submitForm('register')")
          | Sign up for Voter
</template>
<script type="text/ecmascript-6">
  // now Let's try to use axios api~
  import { lazyGoto } from '../utils'

  export default {
    name: 'register',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.register.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        register: {
          name: '',
          mobile: '',
          password: '',
          checkPassword: '',
          token: false
        },
        rules: {
          name: [
            {required: true, message: '请取一个用户名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请填写密码', trigger: 'blur'},
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
            const opt = this.register
            this.$api.userRegister(opt).then(async ({data}) => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'Register successful'
              })
              await lazyGoto(this, 'login')
            })
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: 'submit error'
            })
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
    .register-button {
      width 100%
    }
  }

  @media screen and (max-width: 400px) {
    .register {
      min-width 300px
    }
  }
</style>
