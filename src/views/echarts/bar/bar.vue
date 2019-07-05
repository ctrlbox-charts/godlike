<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @dataView = 'dataView'
    @xyChange = 'xyChange' 
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
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
const series = [
  {
    name: '蒸发量',
    type: 'bar',
    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    markPoint: {
      data: [
        { type: 'max', name: '最大值' },
        { type: 'min', name: '最小值' }
      ]
    },
    markLine: {
      data: [
        { type: 'average', name: '平均值' }
      ]
    }
  },
  {
    name: '降水量',
    type: 'bar',
    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    markPoint: {
      data: [
        { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18 },
        { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
      ]
    },
    markLine: {
      data: [
        { type: 'average', name: '平均值' }
      ]
    }
  }
]
const legend = {
  x: 25,
  data: ['蒸发量', '降水量']
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
  name: 'barCharts',
  components: { bar, EchartsFilter, eLine },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      reloadDataView: true,
      id: 'bar'
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

