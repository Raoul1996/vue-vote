<template>
  <ve-histogram :data="chartData" :settings="chartSettings">

  </ve-histogram>
</template>

<script>

  export default {
    name: 'histogram',
    created: function () {
      this.chartData = {
        columns: ['日期', '成本', '利润', '占比', '其他'],
        rows: [
          {'成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100},
          {'成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100},
          {'成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100},
          {'成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100}
        ]
      }
      this.chartSettings = {
        metrics: ['成本', '利润'],
        dimension: ['日期']
      }
    }
  }
</script>

<style scoped>

</style>
