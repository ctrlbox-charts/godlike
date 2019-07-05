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
const xData = (function() {
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
const options = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            restore : {show: true},
            dataView: { show: true, readOnly: false },
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name:'业务指标',
            type:'gauge',
            splitNumber: 10,       // 分割段数，默认为5
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                splitNumber: 10,   // 每份split细分多少段
                length :12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length :30,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer : {
                width : 5
            },
            title : {
                show : true,
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            detail : {
                formatter:'{value}%',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 50, name: '完成率'}]
        }
    ]
};

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
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'gague',
      // 数据视图
      dataViewVisible: true
    }
  },
  mounted() {
    this.init()
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