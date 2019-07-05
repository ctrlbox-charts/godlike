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
    <gague-data-view 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :routerName='routerName'
    :dataViewVisible = 'dataViewVisible'
    :themeType = 'themeType'
    ></gague-data-view >
  </div> 
</template>
<script>
import gagueDataView from '@/components/Charts/gauge/gague-data-view'
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
// clearInterval(timeTicket);
// timeTicket = setInterval(function (){
//     options.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
//     myChart.setOption(options,true);
// },2000)
export default {
  name: 'gagueCharts',
  components: {gagueDataView,EchartsFilter},
  data() {
    return {
      themeType: null,
      chartsData: null,
      reload: false,
      id: "gague",
      // 数据视图
      dataViewVisible: true,
      routerName: '', // 区别显示不同的仪表盘
    }
  },
  // mounted() {
  //   this.init()
  // },
  watch: {
    '$route':{
      // 深度监听 属性的变化
      deep:true,
      // 立即处理 进入页面就触发
      immediate: true,  
      // 数据发生变化就会调用这个函数  
      handler( val ) {
        this.routerName = val.name
        this.reload = !this.reload
      }
    }
  },
  mounted() {
    this.routerName = this.$route.name
    this.reload = !this.reload
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