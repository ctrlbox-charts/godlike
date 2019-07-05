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
    <bar 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :reloadDataView='reloadDataView'
    :themeType = 'themeType'
    ></bar>
  </div> 
</template>
<script>
import bar from '@/components/Charts/bar'
import eLine from '@/components/Charts/line'
import EchartsFilter from '../echarts-filter'
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
  const list = []
  for (var i = 1; i <= 11; i++) {
    list.push('11月' + i + '日')
  }
  return list
}())
const series = [
  {
    name: '辅助',
    type: 'bar',
    stack: '总量',
    itemStyle: {
      normal: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      },
      emphasis: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      }
    },
    data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
  },
  {
    name: '收入',
    type: 'bar',
    stack: '总量',
    itemStyle: { normal: { label: { show: true, position: 'top' }}},
    data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
  },
  {
    name: '支出',
    type: 'bar',
    stack: '总量',
    itemStyle: { normal: { label: { show: true, position: 'bottom' }}},
    data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
  }
]
const legend = {
  x: 25,
  data: ['支出', '收入']
}
const xAxis = [
  {
    type: 'category',
    data: xData
  }
]
const yAxis = [
  {
    type: 'value'
  }
]
export default {
  name: 'pubuCharts',
  components: { bar, EchartsFilter, eLine },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      reloadDataView: true,
      id: 'pubuChange'
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
          legend: legend,
          xAxis: xAxis,
          yAxis: yAxis,
          xData: xData
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
      // this.chartsData.series.forEach(el => {
      //   this.$set(el, 'smooth', !el.smooth)
      // })
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

