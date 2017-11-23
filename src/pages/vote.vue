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
  // 三列布局
  .vote-list {
    margin 0 auto
    max-width: 1035px
    column-count 3
    .vote-item {
      display inline-block
      margin 20px
      width 300px
    }
  }
//两列布局
  @media screen and (max-width: 1018px) and (min-width: 690px) {
    .vote-list {
      width 690px
      column-count 2
    }
  }
// 单列布局
  @media screen and (max-width: 690px) {
    .vote-list {
      width 440px
      column-count 1
      .vote-item {
        margin 20px auto
      }
    }
  }


</style>
