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
    <scatter-data-view 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :routerName='routerName'
    :dataViewVisible = 'dataViewVisible'
    :themeType = 'themeType'
    ></scatter-data-view >
  </div> 
</template>
<script>
import ScatterDataView from '@/components/Charts/scatter/scatter-data-view'
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
    title : {
        text : '时间坐标散点图',
        subtext : 'dataZoom支持'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    toolbox: {
        show: true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom: {
        show: true,
        start : 30,
        end : 70
    },
    legend : {
        // data : ['series1']
    },
    dataRange: {
        min: 0,
        max: 100,
        orient: 'horizontal',
        y: 30,
        x: 'center',
        color:['lightgreen','orange'],
        splitNumber: 5
    },
    grid: {
        y2: 80
    },
    xAxis : [
        {
            type : 'time',
            splitNumber:10
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    animation: false,
    series : [
        {
            // name:'series1',
            type:'scatter',
            tooltip : {
                trigger: 'axis',
                formatter : function (params) {
                    var date = new Date(params.value[0]);
                    return params.seriesName 
                           + ' （'
                           + date.getFullYear() + '-'
                           + (date.getMonth() + 1) + '-'
                           + date.getDate() + ' '
                           + date.getHours() + ':'
                           + date.getMinutes()
                           +  '）<br/>'
                           + params.value[1] + ', ' 
                           + params.value[2];
                },
                axisPointer:{
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            symbolSize: function (value){
                return Math.round(value[2]/10);
            },
            data: (function () {
                var d = [];
                var len = 0;
                var now = new Date();
                var value;
                while (len++ < 1500) {
                    d.push([
                        new Date(2014, 9, 1, 0, Math.round(Math.random()*10000)),
                        (Math.random()*30).toFixed(2) - 0,
                        (Math.random()*100).toFixed(2) - 0
                    ]);
                }
                return d;
            })()
        }
    ]
};
                    
export default {
  name: 'scatterCharts',
  components: {ScatterDataView,EchartsFilter},
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'scatter',
      routerName: 'scatter', // 区别显示不同的sandian
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