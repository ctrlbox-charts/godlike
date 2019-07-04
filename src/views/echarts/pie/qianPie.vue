<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <pie 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :themeType = 'themeType'
    ></pie>
  </div> 
</template>
<script>
import pie from '@/components/Charts/pie'
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
const series = (function() {
  var series = []
  for (var i = 0; i < 30; i++) {
    series.push({
      name: '浏览器（数据纯属虚构）',
      type: 'pie',
      itemStyle: { normal: {
        label: { show: i > 28 },
        labelLine: { show: i > 28, length: 20 }
      }},
      radius: [i * 4 + 40, i * 4 + 43],
      data: [
        { value: i * 128 + 80, name: 'Chrome' },
        { value: i * 64 + 160, name: 'Firefox' },
        { value: i * 32 + 320, name: 'Safari' },
        { value: i * 16 + 640, name: 'IE9+' },
        { value: i * 8 + 1280, name: 'IE8-' }
      ]
    })
  }
  series[0].markPoint = {
    symbol: 'emptyCircle',
    symbolSize: series[0].radius[0],
    effect: { show: true, scaleSize: 12, color: 'rgba(250,225,50,0.8)', shadowBlur: 10, period: 30 },
    data: [{ x: '50%', y: '50%' }]
  }
  return series
})()
const legend = {
  orient: 'vertical',
  x: 'left',
  data: ['Chrome', 'Firefox', 'Safari', 'IE9+', 'IE8-']
}
export default {
  name: 'pieCharts',
  components: { pie, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'pie'
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

