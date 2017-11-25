<template>
  <div class="content">
    <div v-if="!pub">
      <el-form :inline="true" :model="form" class="">
        <div class="el-form-item">
          <label class="el-form-item__label">{{name}}</label>
          <div class="el-form-item__content">
            <el-input v-model="form.password" @keyup.native.enter="onSubmit" placeholder="请输入密码"></el-input>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-for="(o, key) in content">
      {{key}}:{{o}}
    </div>
    <div :content="content">
      <!--<h2>{{content.title}}</h2>-->
      <div v-for="(o, key) in content.options">
        {{o}}
      </div>
      <div>截止时间：{{end}}</div>
    </div>
  </div>
</template>

<script>
  import api from '../service/axios'
  import format from 'date-fns/format'

  export default {
    name: 'content',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        id: this.$route.params.id,
        pub: +this.$route.query.pub,
        path: this.$route.path,
        content: {},
        name: '密码',
        form: {
          password: null
        }
      }
    },
    computed: {
      end () {
        return format(this.content.endTime, 'YYYY/DD/MM HH:mm')
      }
    },
    mounted () {
      console.dir(!!this.$data.pub)
      if (this.$data.pub && this.$route.query) {
        this.getVoteDetail(null, this.$route.params)
      } else {
        this.$message.info('需要密码')
      }
    },
    methods: {
      getVoteDetail (query, param) {
        console.log(this.$route.params)
        // 这里不知道后端发生了什么，拦截器失效了？
        api.getDetail(query, param).then(({data}) => {
          this.content = data
          this.pub = true
        })
      },
      onSubmit () {
        const {password} = this.$data.form
        console.log(password)
        this.getVoteDetail({password: password}, this.$route.params)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
