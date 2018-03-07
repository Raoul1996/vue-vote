<template lang="pug">
  div.hello(style="margin: 20px auto")
    | 您已经成功注册，发送激活邮件，请到邮箱检查邮件哦~
    div
      <!--el-form.card-bord(:model="send", :rules="rules", ref="send")-->
      el-button(type="primary", style="margin: 20px auto", @click="jump")
        | 确定
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { goto } from 'src/utils'
  import ElButton from 'element-ui/packages/button/src/button'

  export default {
    components: {ElButton},
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      ...mapState([
        'info'
      ])
    },
    mounted () {
      const {email} = this.info
      this.sendMailAction({mail: email})
    },
    methods: {
      ...mapActions([
        'sendMailAction'
      ]),
      jump () {
        goto(this, '/vote')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
