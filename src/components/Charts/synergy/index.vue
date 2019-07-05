<template>
<div style="height:100%">
  <div :class="className" :id="id"  :style="{height:height,width:width}"/>
</div>
</template>

<script>
require('echarts/dist/extension/dataTool.js')
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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart() // 初始化
  },
  created() {
    this.initChart() // 初始化
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
      var data = this.$echarts.dataTool.prepareBoxplotData([
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
        [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
        [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
      ])
var options = {
        title: [
          {
            text: 'Michelson-Morley Experiment',
            left: 'center'
          },
          {
            text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
            borderColor: '#999',
            borderWidth: 1,
            textStyle: {
              fontSize: 14
            },
            left: '10%',
            top: '90%'
          }
        ],
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
            }
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data.axisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          axisLabel: {
            formatter: 'expr {value}'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'km/s minus 299,000',
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            data: data.boxData,
            tooltip: {
              formatter: function(param) {
                return [
                  'Experiment ' + param.name + ': ',
                  'upper: ' + param.data[5],
                  'Q3: ' + param.data[4],
                  'median: ' + param.data[3],
                  'Q1: ' + param.data[2],
                  'lower: ' + param.data[1]
                ].join('<br/>')
              }
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: data.outliers
          }
        ]
      }
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(options)
      this.$emit('dataViewOptions', options)
    }
  }
}
</script>

