<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    
    <e-line 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :themeType = 'themeType'
    ></e-line>
  </div> 
</template>
<script>
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
const xData = ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
const series = [
  {
    name: '邮件营销',
    type: 'line',
    smooth: false,
    // stack: '总量',
    // areaStyle: {},
    data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
  },
  {
    name: '联盟广告',
    type: 'line',
    smooth: false,
    // stack: '总量',
    // areaStyle: {},
    data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
  },
  {
    name: '视频广告',
    type: 'line',
    smooth: false,
    // stack: '总量',
    // areaStyle: {},
    data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
  }]
const legend = [{
  top: 10,
  // icon: 'rect',
  // itemWidth: 14,
  // itemHeight: 5,
  // itemGap: 13,
  data: ['邮件营销', '联盟广告', '视频广告']
  // right: '4%',
  // textStyle: {
  //   fontSize: 12,
  //   color: '#F1F1F3'
  // }
}]
const xAxis = [{
  type: 'category',
  boundaryGap: false,
  axisLine: {
    lineStyle: {
      color: '#57617B'
    }
  },
  data: xData
}]
const yAxis = [{
  type: 'value',
  name: '(%)',
  axisTick: {
    show: false
  },
  axisLine: {
    lineStyle: {
      color: '#57617B'
    }
  },
  axisLabel: {
    margin: 10,
    textStyle: {
      fontSize: 14
    }
  },
  splitLine: {
    lineStyle: {
      // color: '#57617B'
    }
  }
}]
export default {
  name: 'lineCharts',
  components: { EchartsFilter, eLine },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'line'
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
        this.reload = !this.reload
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
    }
  }
}
</script>
<style lang="scss" scoped>
.charts-box-root{
  padding-bottom: 100px;
}
</style>

