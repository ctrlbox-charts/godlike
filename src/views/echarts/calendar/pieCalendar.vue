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

var cellSize = [80, 80]

function getVirtulData() {
  var date = +echarts.number.parseDate('2017-02-01')
  var end = +echarts.number.parseDate('2017-03-01')
  var dayTime = 3600 * 24 * 1000
  var data = []
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10000)
    ])
  }
  return data
}

// 赋值日历数据
var scatterData = getVirtulData()
const series = [{
  id: 'label',
  type: 'scatter',
  coordinateSystem: 'calendar',
  symbolSize: 1,
  label: {
    normal: {
      show: true,
      formatter: function(params) {
        return echarts.format.formatTime('dd', params.value[0])
      },
      offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
      textStyle: {
        color: '#000',
        fontSize: 14
      }
    }
  },
  data: scatterData
}]
const legend = {
  data: ['工作', '娱乐', '睡觉'],
  top: 20
}
const calendarData = {
  top: 'middle',
  left: 'center',
  orient: 'vertical',
  cellSize: cellSize,
  yearLabel: {
    show: false,
    textStyle: {
      fontSize: 30
    }
  },
  dayLabel: {
    margin: 20,
    firstDay: 1,
    nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  },
  monthLabel: {
    show: false
  },
  range: ['2017-02']
}

export default {
  name: 'calendarCharts',
  components: { calendar, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'pieCalendar'
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
          scatterData: scatterData,
          legend: legend,
          calendar: calendarData
        }
      }, 10)
    },
    // 坐标切换
    xyChange() {
      this.chartsData.calendar.forEach(item => {
        if (this.reload) {
          item.orient = 'horizontal'
        } else {
          item.orient = 'vertical'
        }
      })
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

