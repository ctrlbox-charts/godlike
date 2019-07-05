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
const series = [
  {
    name: '访问来源',
    type: 'pie',
    selectedMode: 'single',
    radius: [0, 70],

    // for funnel
    x: '20%',
    width: '40%',
    funnelAlign: 'right',
    max: 1548,

    itemStyle: {
      normal: {
        label: {
          position: 'inner'
        },
        labelLine: {
          show: false
        }
      }
    },
    data: [
      { value: 335, name: '直达' },
      { value: 679, name: '营销广告' },
      { value: 1548, name: '搜索引擎', selected: true }
    ]
  },
  {
    name: '访问来源',
    type: 'pie',
    radius: [100, 140],

    // for funnel
    x: '60%',
    width: '35%',
    funnelAlign: 'left',
    max: 1048,

    data: [
      { value: 335, name: '直达' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1048, name: '百度' },
      { value: 251, name: '谷歌' },
      { value: 147, name: '必应' },
      { value: 102, name: '其他' }
    ]
  }
]
const legend = {
  orient: 'vertical',
  x: 'left',
  data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
}
export default {
  name: 'pieCharts',
  components: { pie, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'outInPie'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
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

