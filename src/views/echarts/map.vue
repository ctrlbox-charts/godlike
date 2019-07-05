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
    <e-map 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :reloadDataView='reloadDataView'
    :themeType = 'themeType'
    ></e-map>
  </div> 
</template>
<script>
import EMap from '@/components/Charts/map'
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
function randomData() {
  return Math.round(Math.random() * 500)
}
var dataList = [
  { name: '北京', value: '100' }, { name: '天津', value: randomData() },
  { name: '上海', value: randomData() }, { name: '重庆', value: randomData() },
  { name: '河北', value: randomData() }, { name: '河南', value: randomData() },
  { name: '云南', value: randomData() }, { name: '辽宁', value: randomData() },
  { name: '黑龙江', value: randomData() }, { name: '湖南', value: randomData() },
  { name: '安徽', value: randomData() }, { name: '山东', value: randomData() },
  { name: '新疆', value: randomData() }, { name: '江苏', value: randomData() },
  { name: '浙江', value: randomData() }, { name: '江西', value: randomData() },
  { name: '湖北', value: randomData() }, { name: '广西', value: randomData() },
  { name: '甘肃', value: randomData() }, { name: '山西', value: randomData() },
  { name: '内蒙古', value: randomData() }, { name: '陕西', value: randomData() },
  { name: '吉林', value: randomData() }, { name: '福建', value: randomData() },
  { name: '贵州', value: randomData() }, { name: '广东', value: randomData() },
  { name: '青海', value: randomData() }, { name: '西藏', value: randomData() },
  { name: '四川', value: randomData() }, { name: '宁夏', value: randomData() },
  { name: '海南', value: randomData() }, { name: '台湾', value: randomData() },
  { name: '香港', value: randomData() }, { name: '澳门', value: randomData() }
]
export default {
  name: 'lineCharts',
  components: { EchartsFilter, EMap },
  data() {
    return {
      themeType: null,
      chartsData: null,
      reload: false,
      reloadDataView: true,
      id: 'map'
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
      this.reload = !this.reload
    },
    init() {
      // 模拟请求数据
      setTimeout(() => {
        this.chartsData = {
          dataList
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

