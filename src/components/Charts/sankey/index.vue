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
    chartsData: {
      type: Object,
      default: () => {}
    },
    themeType: {
      type: String,
      default: 'macarons'
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
        series: {
          type: 'sankey',
          layout: 'none',
          focusNodeAdjacency: 'allEdges',
          data: [{
            name: 'a'
          }, {
            name: 'b'
          }, {
            name: 'a1'
          }, {
            name: 'a2'
          }, {
            name: 'b1'
          }, {
            name: 'c'
          }],
          links: [{
            source: 'a',
            target: 'a1',
            value: 5
          }, {
            source: 'a',
            target: 'a2',
            value: 3
          }, {
            source: 'b',
            target: 'b1',
            value: 8
          }, {
            source: 'a',
            target: 'b1',
            value: 3
          }, {
            source: 'b1',
            target: 'a1',
            value: 1
          }, {
            source: 'b1',
            target: 'c',
            value: 2
          }]
        }
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
    initChart() {
      if (!document.getElementById(this.id)) return
      this.chart = this.$echarts.init(document.getElementById(this.id), this.themeType)
      this.chart.setOption(this.options)
    }
  }
}
</script>