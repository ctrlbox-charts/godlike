<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <calendar 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :themeType = 'themeType'
    ></calendar>
  </div> 
</template>
<script>
import calendar from '@/components/Charts/calendar'
import EchartsFilter from '../echarts-filter'
import echarts from 'echarts'

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
var graphData = [
  [
    1485878400000,
    260
  ],
  [
    1486137600000,
    200
  ],
  [
    1486569600000,
    279
  ],
  [
    1486915200000,
    847
  ],
  [
    1487347200000,
    241
  ],
  [
    1487779200000 + 3600 * 24 * 1000 * 15,
    411
  ],
  [
    1488124800000 + 3600 * 24 * 1000 * 23,
    985
  ]
]

var links = graphData.map(function(item, idx) {
  return {
    source: idx,
    target: idx + 1
  }
})
links.pop()
function getVirtulData(year) {
  year = year || '2019'
  var date = +echarts.number.parseDate(year + '-01-01')
  var end = +echarts.number.parseDate(year + '-12-31')
  var dayTime = 3600 * 24 * 1000
  var data = []
  for (var time = date; time <= end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10000)
    ])
  }
  return data
}
const series = [{
  type: 'graph',
  edgeSymbol: ['none', 'arrow'],
  coordinateSystem: 'calendar',
  links: links,
  symbolSize: 15,
  calendarIndex: 0,
  itemStyle: {
    normal: {
      color: 'yellow',
      shadowBlue: 9,
      shadowOffsetX: 1.5,
      shadowOffsetY: 3,
      shadowColor: '#555'
    }
  },
  lineStyle: {
    normal: {
      color: '#D10E00',
      width: 1,
      opacity: 1
    }
  },
  data: graphData,
  z: 20
}, {
  type: 'heatmap',
  coordinateSystem: 'calendar',
  data: getVirtulData(2017)
}]
const calendarData = {
  top: 'middle',
  left: 'center',
  orient: 'vertical',
  cellSize: 40,
  yearLabel: {
    margin: 50,
    textStyle: {
      fontSize: 30
    }
  },
  dayLabel: {
    firstDay: 1,
    nameMap: 'cn'
  },
  monthLabel: {
    nameMap: 'cn',
    margin: 15,
    textStyle: {
      fontSize: 20,
      color: '#999'
    }
  },
  range: ['2017-02', '2017-03-31']
}
const visualMap = {
  min: 0,
  max: 1000,
  type: 'piecewise',
  left: 'left',
  top: 20,
  seriesIndex: [1],
  orient: 'vertical',
  inRange: {
    // 红蓝相间
    color: ['#5A8BC7', '#7E9FB9', '#A3B5A9', '#C9CB9D', '#ECE191', '#FEDC88', '#FCC080', '#FBA279', '#F98673', '#F7676C']

    // 红色色系
    // color: ['white', '#FFE9BB', '#FFD1A7', '#FFBB95', '#FFA383', '#FF8D70', '#FF745C', '#FF5C4A', '#FF4638', '#FF2E26', '#FF1812']
  }
}
export default {
  name: 'calendarCharts',
  components: { calendar, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'graph'
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
          visualMap: visualMap,
          calendar: calendarData
        }
      }, 10)
    },
    // 坐标切换
    xyChange() {
      this.reload ? this.chartsData.calendar.orient = 'vertical' : this.chartsData.calendar.orient = 'horizontal'
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

