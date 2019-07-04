<template>
<div style="height:100%">
  <div :class="className" :id="id"  :style="{height:height,width:width}"/>
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
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id), this.themeType)
      this.chart.setOption(this.chartsData)
    }
  }
}
</script>
