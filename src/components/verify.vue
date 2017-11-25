<template>
  <div class="Verify">
    <el-form :inline="true" :model="form" class="">

    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'verify',
    props: {
      'name': {
        type: String,
        require: true
      },
      'path': {
        require: true
      }
    },
    data () {
      return {
        form: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
