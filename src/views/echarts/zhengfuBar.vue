<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <bar 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :themeType = 'themeType'
    ></bar>
  </div> 
</template>
<script>
import bar from '@/components/Charts/bar'
import eLine from '@/components/Charts/line'
import EchartsFilter from './echarts-filter'
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
const xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const series = [
  {
    name: '利润',
    type: 'bar',
    itemStyle: { normal: { label: { show: true, position: 'inside' }}},
    data: [200, 170, 240, 244, 200, 220, 210]
  },
  {
    name: '收入',
    type: 'bar',
    stack: '总量',
    barWidth: 5,
    itemStyle: { normal: {
      label: { show: true }
    }},
    data: [320, 302, 341, 374, 390, 450, 420]
  },
  {
    name: '支出',
    type: 'bar',
    stack: '总量',
    itemStyle: { normal: {
      label: { show: true, position: 'left' }
    }},
    data: [-120, -132, -101, -134, -190, -230, -210]
  }
]
const legend = {
  data: ['利润', '支出', '收入']
}
const xAxis = [
  {
    type: 'value'
  }
]
const yAxis = [
  {
    type: 'category',
    axisTick: { show: false },
    data: xData
  }
]
export default {
  name: 'pubuCharts',
  components: { bar, EchartsFilter, eLine },
  data() {
    return {
      themeType: null,
      chartsData: null,
      reload: false,
      id: 'pubu'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 全屏 by wwh
    clickScreen() {
      var full = document.getElementById('bar')
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

