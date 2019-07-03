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
    title: {
      type: String,
      default: '统计图标题'
    },
    // 折线图主题
    themeType: {
      type: String,
      default: 'light'
    },
    options: {
      type: Object,
      default: () => {}
    },
    reload: {
      type: Boolean
    }
  },
  data() {
    return {
      chart: null,
      seriesArr: []
    }
  },
  watch: {
    reload(val) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.initChart(this.options)
    },
    themeType(val) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.initChart(this.options)
    },
    options: {
      handler(val) {
        if (!this.chart) {
          return
        }
        this.chart.dispose()
        this.chart = null
        this.initChart(this.options)
      },
      deep: true
    }
  },
  mounted() {
    this.initChart(this.options)
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
      this.chart = this.$echarts.init(document.getElementById(this.id), this.themeType)
      this.chart.setOption(options)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>