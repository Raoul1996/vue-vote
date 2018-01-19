<template lang="pug">
  ve-histogram(:data="chartData", :settings="chartSettings")
</template>
<script>
  export default {
    name: 'histogram',
    props: {
      statistic: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        chartData: {}
      }
    },
    created () {
      this.chartData = {
        columns: ['count', 'title'],
        rows: this.statistic
      }
      this.chartSettings = {
        metrics: ['count'],
        dimension: ['title']
      }
    },
    mounted () {
      this.chartData = {
        rows: this.statistic
      }
    }
  }
</script>

<style scoped>

</style>
