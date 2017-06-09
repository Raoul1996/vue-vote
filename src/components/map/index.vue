<template>
  <div class="map">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap
        :vid="amap-vues"
        :map-manager="amapManager"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        :events="events"
        class="amap-demo">
      </el-amap>
      <div class="toolbar">
        <button class="toolbar-button" @click="getMap()">get map</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueAMap from 'vue-amap'
  /* eslint-disable no-duplicate-imports */
  /* eslint-disable no-new */
  let amapManager = new VueAMap.AMapManager()
  export default {
    data () {
      return {
        amapManager,
        zoom: 12,
        center: [121.59996, 31.197646],
        events: {
          'moveend': () => {
          },
          'zoomchage': () => {
          },
          'click': (e) => {
            console.log(e)
            alert('map clicked')
          }
        },
        'plugin': [
          'ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init (o) {
                console.log(o)
              }
            }
          }
        ],
        msg: 'this is the map components based on vue-amap'
      }
    },
    methods: {
      getMap () {
        console.log(amapManager._componentMap)
        console.log(amapManager._map)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .amap-wrapper {
    .amap-demo {
      height 300px
      border 1px #333 solid
    }
  }
</style>
