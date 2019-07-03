<template>
  <div class="line-echarts-root">
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
    // 折线图主题
    themeName: {
      type: String,
      default: 'light'
    },
    // options: {
    //   type: Object,
    //   default: () => {}
    // },
    reload: {
      type: Boolean
    },
    // 数据
    series: {
      type: Array,
      default: () => []
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
        // backgroundColor: '#394056',
        title: {
          text: this.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            // color: '#F1F1F3'
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
            // dataZoom: { //数据缩放视图
            //   show: true
            // },
            saveAsImage: {// 保存图片
              show: true
            },
            magicType: {// 动态类型切换
              type: ['bar', 'line', 'pie']
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
        legend: this.legend,
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '50',
          containLabel: true
        },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        // 数据区域缩放
        dataZoom: [
          // {
          //     show: true,
          //     start: 10,
          //     end: 80
          // },
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty'
          },
          { // 鼠标滚轮缩放
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
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
<style lang="scss" scoped>
</style>