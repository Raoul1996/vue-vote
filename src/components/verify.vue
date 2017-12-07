<template lang="pug">
  .Verify
    el-form(:inline="true", :model="form")
</template>

<script>
  export default {
    name: 'verify',
    props: {
      'name': {
        type: String,
        required: true
      },
      'path': {
        required: true
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
