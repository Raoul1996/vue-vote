<template>
  <ve-histogram :data="chartData" :settings="chartSettings">

  </ve-histogram>
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
    created: function () {
      this.chartData = {
        columns: ['count', 'title'],
        // count:0
        //created_at:null
        //id:327
        //title:
        rows: this.statistic
      }
      this.chartSettings = {
        metrics: ['count'],
        dimension: ['title']
      }
    }
  }
</script>

<style scoped>

</style>
