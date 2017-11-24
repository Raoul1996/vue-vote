<template>
  <div class="vote">
    {{msg}}
    <ul class="vote-list">
      <li class="vote-item" v-for="(o, index) in list" :key="index">
        <Card :vote="o"></Card>
      </li>
    </ul>
  </div>
</template>

<script>
  import Card from '../components/Card.vue'
  import api from 'service/axios'

  export default {
    name: 'vote',
    data () {
      return {
        list: '',
        msg: 'this is the side project based on vue'
      }
    },
    mounted () {
      this.getVote()
    },
    methods: {
      getVote () {
        const query = {
          page: 1,
          size: 100,
          time: 1
        }
        api.getVote(query).then(({data}) => {
          const {list} = data
          this.list = list
        })
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
    display flex
    flex-wrap wrap
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
    }
  }

  // 单列布局
  @media screen and (max-width: 690px) {
    .vote-list {
      width 440px
      .vote-item {
        margin 20px auto
      }
    }
  }


</style>
