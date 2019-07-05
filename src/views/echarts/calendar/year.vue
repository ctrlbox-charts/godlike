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
var mydate = new Date()
var year = mydate.getFullYear()
var first_half_year = getBetweenDay(year + '-01-01', year + '-06-30')
var maxValue = getMaxValue(first_half_year) // 最大值

// 获取指定日期间的所有日期
function getBetweenDay(begin, end) {
  var betweenTimeArr = []
  var ab = begin.split('-')
  var ae = end.split('-')
  var db = new Date()
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
  var de = new Date()
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
  var unixDb = db.getTime()
  var unixDe = de.getTime()
  for (var k = unixDb; k <= unixDe;) {
    betweenTimeArr.push([new Date(parseInt(k)), Math.floor(Math.random() * 10000)])
    k = k + 24 * 60 * 60 * 1000
  }
  return betweenTimeArr
}

// 获取日期
// function format(pra) {
//   var s = ''
//   var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1)
//     : ('0' + (this.getMonth() + 1))
//   var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate())
//   s += this.getFullYear() + '-' // 获取年份。
//   s += mouth + '-' // 获取月份。
//   if (pra === '01') {
//     s += '01'
//   } else {
//     s += day // 获取日。
//   }
//   return (s) // 返回日期。
// }

/**
 * 获取数据中的最大值
 * @param {*} data 数据
 * @param {*} maxValue 最大值
 */
function getMaxValue(data, maxValue) {
  if (!maxValue) {
    maxValue = 0
  }
  for (var d in data) {
    if (maxValue < data[d][1]) {
      maxValue = data[d][1]
    }
  }
  return maxValue
}

const series = [
  {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    calendarIndex: 0,
    data: first_half_year
  }

]
const calendarData = [{
  top: 100,
  cellSize: ['auto', 18],
  orient: 'horizontal',
  range: [year + '-01-01', year + '-06-30'],
  itemStyle: {
    normal: {
      borderWidth: 0.5
    }
  },
  yearLabel: {
    show: false
  }
}
]
const visualMap = {
  min: 0,
  max: maxValue,
  calculable: true,
  align: 'bottom',
  orient: 'horizontal',
  left: 'center',
  top: 'top',
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
      id: 'year'
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

