<template>
<div style="height:100%">
  <div :class="className" :id="id"  :style="{height:height,width:width}"/>
</div>
</template>

<script>
import resize from '../mixins/resize'
import echarts from 'echarts'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    themeType: {
      type: String,
      default: 'macarons'
    },
    reload: {
      type: Boolean,
      default: false
    },
    // 数据参数
    chartsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    // 主题切换
    themeType() {
      this.chart.dispose() // 实例销毁
      this.chart = null
      this.initChart() // 重新初始化
    },
    // 获取数据
    chartsData() {
      this.initChart()
    },
    // 改变数据
    reload() {
      if (Object.keys(this.chartsData).length) {
        this.chart.dispose() // 实例销毁
        this.chart = null
        this.initChart() // 重新初始化
      } else { this.initChart() } // 重新初始化
    }
  },
  methods: {
    // 初始化
    initChart() {
      const self = this
      this.chart = this.$echarts.init(document.getElementById(this.id), this.themeType)
      this.chart.setOption(this.chartsData)
      // 日历饼图渲染
      if (self.chartsData && self.chartsData.scatterData) {
        var app = window
        var pieInitialized
        setTimeout(function() {
          pieInitialized = true
          self.chart.setOption({ series: self.getPieSeries(self.chartsData.scatterData, self.chart) })
        }, 10)

        app.onresize = function() {
          if (pieInitialized) {
            self.chart.setOption({
              series: self.getPieSeriesUpdate(self.chartsData.scatterData, self.chart)
            })
          }
        }
      }
    },
    // 获取饼图数据
    getPieSeries(scatterData, chart) {
      return echarts.util.map(scatterData, function(item, index) {
        var center = chart.convertToPixel('calendar', item)
        return {
          id: index + 'pie',
          type: 'pie',
          center: center,
          label: {
            normal: {
              formatter: '{c}',
              position: 'inside'
            }
          },
          radius: 30,
          data: [
            { name: '工作', value: Math.round(Math.random() * 24) },
            { name: '娱乐', value: Math.round(Math.random() * 24) },
            { name: '睡觉', value: Math.round(Math.random() * 24) }
          ]
        }
      })
    },

    // 更新饼图数据
    getPieSeriesUpdate(scatterData, chart) {
      return echarts.util.map(scatterData, function(item, index) {
        var center = chart.convertToPixel('calendar', item)
        return {
          id: index + 'pie',
          center: center
        }
      })
    }
  }
}
</script>
