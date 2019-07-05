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
    chartsData: {
      type: Object,
      default: () => {}
    },
    reload: {
      type: Boolean,
      default: false
    },
    options:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.initChart() // 初始化
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
    options() {
      this.initChart()
    },
    // 改变数据
    reload() {
      if (this.options && Object.keys(this.options).length) {
        this.chart.dispose() // 实例销毁
        this.chart = null
        this.initChart() // 重新初始化
      } else { this.initChart() } // 重新初始化
    }
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id), this.themeType)
      this.chart.setOption(this.options)
    }
  }
}
</script>
