<template>
  <div class="hello" style="margin: 20px auto">
    您已经成功注册，请在邮箱中查看激活信件
    <div>
      <el-button type="primary" style="margin: 20px auto" @click="jump">
        前往列表界面
      </el-button>
    </div>
  </div>
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
      this.sendMailAction({email})
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
