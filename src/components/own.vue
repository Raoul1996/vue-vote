<template lang="pug">
  .own
    .name {{name}}
    .title {{vote.title}}
    .time {{start}} -- {{end}}
</template>
<script>
  export default {
    name: 'own',
    props: {
      vote: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        start: new Date(this.vote.start_at).toLocaleString(),
        end: new Date(this.vote.end_at).toLocaleString()
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .own {
    text-align left
    .title {
      font-size 1.5em
    }
  }
</style>
