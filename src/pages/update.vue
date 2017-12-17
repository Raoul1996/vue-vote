<template lang="pug">
  .update
    h1.title update Password
    el-form.card-border(:model="update", :rules="rules", ref="update")
      // <el-form-item label="mobile" prop="mobile">
      // <el-input v-model="update.mobile" placeholder="Your mobile"></el-input>
      // </el-form-item>
      el-form-item(label="oldPassword", prop="oldPassword")
        el-input(type="password", v-model="update.oldPassword", auto-complete="off", placeholder="Create a new password")
      el-form-item(label="newPassword", prop="password")
        el-input(type="password", v-model="update.newPassword", auto-complete="off", placeholder="Create a new password")
      el-form-item(label="confirm", prop="checkPassword")
        el-input(type="password", @keyup.native.enter="submitForm('update')", v-model="update.checkPassword", auto-complete="off", placeholder="Confirm your password")
      el-form-item
        el-button.update-button(size="middle", type="danger", @click="submitForm('update')")
          | update Password
    div {{token}}

</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { lazyGoto } from '../utils'

  export default {
    name: 'update',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.update.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        update: {
          mobile: '',
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rules: {
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          ],
          oldPassword: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          newPassword: [
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
      ...mapActions([
        'resetPasswordAction'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /* eslint-disable no-unused-vars */
            const opt = this.update
            this.resetPasswordAction(opt).then(async () => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'update Password successful'
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
  .update {
    width 30%
    min-width 400px
    margin 0 auto
    .update-button {
      width 100%
    }
  }

  @media screen and (max-width: 400px) {
    .update {
      min-width 300px
    }
  }
</style>
