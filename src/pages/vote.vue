<template>
  <div class="vote">
    {{msg}}
    <ul class="vote-list">
      <li class="vote-item" v-for="(o,index) in 7" :key="o">
        <Card></Card>
      </li>
    </ul>
  </div>
</template>

<script>
  import Card from '../components/Card.vue'

  export default {
    name: 'vote',
    data () {
      return {
        msg: 'this is the side project based on vue'
      }
    },
    components: {
      Card
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .vote {
    .vote-list {
      margin 0 auto
      max-width: calc((300px + 40px) * 3)
      display flex
      flex-wrap wrap
      .vote-item {
        display inline-block
        margin 20px
        width 300px
      }
    }

  }

</style>
