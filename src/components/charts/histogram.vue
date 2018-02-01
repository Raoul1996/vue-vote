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
        chartData: {
          columns: ['count', 'title'],
          rows: this.statistic
        },
        chartSettings: {
          metrics: ['count'],
          dimension: ['title'],
          label: {
            normal: {show: true, position: 'top'}
          }
        }
      }
    },
    watch: {
      statistic () {
        this.chartData.rows = this.statistic
      }
    },
    created () {
      this.chartData = {
        rows: this.statistic
      }
    }
  }
</script>

<style scoped>

</style>
