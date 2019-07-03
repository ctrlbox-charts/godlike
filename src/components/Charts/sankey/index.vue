<template>
  <!-- 桑基图 -->
  <div class="sankey-echarts-root">
    <div :id="id" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>
<script>
import resize from '../mixins/resize'
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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 桑基主题
    themeName: {
      type: String,
      default: 'light'
    },
    reload: {
      type: Boolean
    },
    // 数据
    series: {
      type: Object,
      default: () => {}
    },
    yAxis: {
      type: Array,
      default: () => []
    },
    xAxis: {
      type: Array,
      default: () => []
    },
    legend: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      options: {
        title: {
          text: this.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#000'
          },
          left: '1%'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { // 数据视图
              show: true
            },
            restore: { // 重置
              show: true
            },
            saveAsImage: {// 保存图片
              show: true
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        series: this.series
      }
    }
  },
  watch: {
    reload(val) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.initChart(this.options, this.themeName)
    },
    options: {
      handler(val) {
        if (!this.chart) {
          return
        }
        this.chart.dispose()
        this.chart = null
        this.initChart(this.options, this.themeName)
      },
      deep: true
    }
  },
  mounted() {
    this.initChart(this.options, this.themeName)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(options, theme) {
      if (!document.getElementById(this.id)) return
      this.chart = this.$echarts.init(document.getElementById(this.id), theme)
      this.chart.setOption(options)
    }
  }
}
</script>