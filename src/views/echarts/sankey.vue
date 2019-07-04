<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @dataView = 'dataView'
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <data-view 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :dataViewVisible = 'dataViewVisible'
    :themeType = 'themeType'
    ></data-view >
  </div> 
</template>
<script>
import DataView from '@/components/Charts/sankey/data-view'
import EchartsFilter from '@/views/echarts/echarts-filter'
// 全屏
function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}
const xData = (function() {
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
const options = {
      series: {
          type: 'sankey',
          layout:'none',
          focusNodeAdjacency: 'allEdges',
          data: [{
              name: 'a'
          }, {
              name: 'b'
          }, {
              name: 'a1'
          }, {
              name: 'a2'
          }, {
              name: 'b1'
          }, {
              name: 'c'
          }],
          links: [{
              source: 'a',
              target: 'a1',
              value: 5
          }, {
              source: 'a',
              target: 'a2',
              value: 3
          }, {
              source: 'b',
              target: 'b1',
              value: 8
          }, {
              source: 'a',
              target: 'b1',
              value: 3
          }, {
              source: 'b1',
              target: 'a1',
              value: 1
          }, {
              source: 'b1',
              target: 'c',
              value: 2
          }]
        }
      }
                    
export default {
  name: 'sankeyCharts',
  components: {DataView,EchartsFilter},
  data() {
    return {
      themeType: 'default',
      chartsData: null,
      reload: false,
      id: 'sankey',
      // 数据视图
      dataViewVisible: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 全屏 by wwh
    clickScreen() {
      var full = document.getElementById(this.id)
      if (full) {
        launchIntoFullscreen(full)
      }
    },
    // 一屏多图 by wwh
    clickScreenAll() {

    },
    // 数据视图
    dataView (val){
      this.dataViewVisible = !this.dataViewVisible
      this.init()
    },
    // 主题切换 by wwh
    themeChange(val) {
      this.themeType = val
    },
    init() {
      setTimeout(() => {
        this.chartsData = options
      }, 10)
    },
    // 坐标切换
    xyChange() {
      const temp = this.chartsData.xAxis
      this.chartsData.xAxis = this.chartsData.yAxis
      this.chartsData.yAxis = temp
      this.reload = !this.reload
    },
    // 图形切换
    chartsChange(type) {
      this.chartsData.series.forEach(item => {
        item.type = type
      })
      this.reload = !this.reload
    }
  }
}
</script>
<style lang="scss" scoped>
.charts-box-root{
  padding-bottom: 100px;
}
</style>