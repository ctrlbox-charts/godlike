<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <funnel 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :routerName='routerName'
    :themeType = 'themeType'
    ></funnel>
  </div> 
</template>
<script>
import funnel from '@/components/Charts/funnel'
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
const series = [
  {
    name: '预算 vs 开销（Budget vs spending）',
    type: 'radar',
    data: [
      {
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: '预算分配（Allocated Budget）'
      },
      {
        value: [5000, 14000, 28000, 31000, 42000, 21000],
        name: '实际开销（Actual Spending）'
      }
    ]
  }
]
const legend = [{
  // orient: 'vertical',
  // x: 'right',
  // y: 'bottom',
  data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
}]
const polar = [
  {
    indicator: [
      { text: '销售（sales）', max: 6000 },
      { text: '管理（Administration）', max: 16000 },
      { text: '信息技术（Information Techology）', max: 30000 },
      { text: '客服（Customer Support）', max: 38000 },
      { text: '研发（Development）', max: 52000 },
      { text: '市场（Marketing）', max: 25000 }
    ]
  }
]
export default {
  name: 'lineCharts',
  components: { EchartsFilter, funnel },
  data() {
    return {
      themeType: null,
      chartsData: null,
      reload: false,
      id: 'line',
      routerName: 'radar' // 区别显示不同的雷达图
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route'(val) {
      this.routerName = val.name
      this.reload = !this.reload
    }
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
      this.reload = !this.reload
    },
    init() {
      // 模拟请求数据
      setTimeout(() => {
        this.chartsData = {
          series: series,
          legend: legend,
          polar
        }
        this.reload = !this.reload
      }, 10)
    },
    // 坐标切换
    xyChange() {
      // const temp = this.chartsData.xAxis
      // this.chartsData.xAxis = this.chartsData.yAxis
      // this.chartsData.yAxis = temp
      // this.reload = !this.reload
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

