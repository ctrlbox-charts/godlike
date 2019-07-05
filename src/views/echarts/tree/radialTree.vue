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
    <tree 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :reloadDataView='reloadDataView'
    :themeType = 'themeType'
    ></tree>
  </div> 
</template>
<script>
import tree from '@/components/Charts/tree'
import EchartsFilter from '../echarts-filter'
import treeData from './treeData'
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
const series = [
  {
    name: '树图',
    type: 'tree',
    orient: 'horizontal', // vertical horizontal
    rootLocation: { x: 'center', y: 50 }, // 根节点位置  {x: 100, y: 'center'}
    nodePadding: 1,
    top: '18%',
    bottom: '14%',
    layout: 'radial',
    symbol: 'emptyCircle',
    symbolSize: 7,
    initialTreeDepth: 3,
    animationDurationUpdate: 750,
    data: treeData
  }
]
const legend = {
  x: 25,
  data: ['树图']
}
export default {
  name: 'treeCharts',
  components: { tree, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      reloadDataView: true,
      id: 'tree'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 数据视图
    dataView() {
      this.reloadDataView = !this.reloadDataView
      this.reload = !this.reload
    },
    // 全屏 by wwh
    clickScreen() {
      var full = document.getElementById(this.id)
      launchIntoFullscreen(full)
    },
    // 一屏多图 by wwh
    clickScreenAll() {

    },
    // 主题切换 by wwh
    themeChange(val) {
      this.themeType = val
    },
    init() {
      // 模拟请求数据
      setTimeout(() => {
        this.chartsData = {
          series: series,
          legend: legend
        }
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
    },
    // 光滑
    changeSmooth() {
    },
    // 堆叠
    changeStack() {
      this.chartsData.series.forEach(el => {
        if (el.stack) {
          this.$set(el, 'stack', '')
          if (el.hasOwnProperty('areaStyle')) {
            this.$delete(el, 'areaStyle')
          }
        } else {
          this.$set(el, 'stack', '总量')
          this.$set(el, 'areaStyle', {})
        }
      })
    },
    handleChange(val) {
      switch (val) {
        case 'smooth':
          this.changeSmooth()
          break
        case 'coordinate':
          this.xyChange()
          break
        case 'stack':
          this.changeStack()
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.charts-box-root{
  padding-bottom: 100px;
}
</style>

