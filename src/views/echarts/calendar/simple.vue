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
import getVirtulData from './virtulData'

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

var data = getVirtulData(2016)

const series = [
  {
    name: '步数',
    type: 'scatter',
    coordinateSystem: 'calendar',
    data: data,
    symbolSize: function(val) {
      return val[1] / 500
    },
    itemStyle: {
      normal: {
        color: '#ddb926'
      }
    }
  },
  {
    name: '步数',
    type: 'scatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: data,
    symbolSize: function(val) {
      return val[1] / 500
    },
    itemStyle: {
      normal: {
        color: '#ddb926'
      }
    }
  },
  {
    name: 'Top 12',
    type: 'effectScatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: data.sort(function(a, b) {
      return b[1] - a[1]
    }).slice(0, 12),
    symbolSize: function(val) {
      return val[1] / 500
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    itemStyle: {
      normal: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    zlevel: 1
  },
  {
    name: 'Top 12',
    type: 'effectScatter',
    coordinateSystem: 'calendar',
    data: data.sort(function(a, b) {
      return b[1] - a[1]
    }).slice(0, 12),
    symbolSize: function(val) {
      return val[1] / 500
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    itemStyle: {
      normal: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    zlevel: 1
  }
]
const calendarData = [{
  top: 100,
  left: 'center',
  orient: 'horizontal',
  range: ['2016-01-01', '2016-06-30'],
  splitLine: {
    show: true,
    lineStyle: {
      color: '#000',
      width: 4,
      type: 'solid'
    }
  },
  yearLabel: {
    formatter: '{start}  1st',
    textStyle: {
      color: '#fff'
    }
  },
  itemStyle: {
    normal: {
      color: '#323c48',
      borderWidth: 1,
      borderColor: '#111'
    }
  }
}, {
  top: 340,
  left: 'center',
  orient: 'horizontal',
  range: ['2016-07-01', '2016-12-31'],
  splitLine: {
    show: true,
    lineStyle: {
      color: '#000',
      width: 4,
      type: 'solid'
    }
  },
  yearLabel: {
    formatter: '{start}  2nd',
    textStyle: {
      color: '#fff'
    }
  },
  itemStyle: {
    normal: {
      color: '#323c48',
      borderWidth: 1,
      borderColor: '#111'
    }
  }
}]
export default {
  name: 'calendarCharts',
  components: { calendar, EchartsFilter },
  data() {
    return {
      themeType: 'macarons',
      chartsData: null,
      reload: false,
      id: 'calendar'
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

