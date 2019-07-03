<template>
  <div>
    <bar 
    :chartsData="chartsData" 
    :reload="reload"
    @xyChange="xyChange"
    @chartsChange="chartsChange"
    ></bar>
  </div> 
</template>
<script>
import bar from '@/components/Charts/bar'
const xData = (function() {
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
const options = {
  xData: xData,
  // 提示框
  tooltip: {
    trigger: 'axis'
  },
  // 图例
  legend: {
    data: ['蒸发量', '降水量']
  },
  // 工具栏
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
  calculable: true,
  // 直角坐标系中横轴数组
  xAxis: [
    {
      type: 'category',
      data: xData
    }
  ],
  // 直角坐标系中纵轴数组
  yAxis: [
    {
      type: 'value'
    }
  ],
  // 通用
  series: [
    // {
    //   name: '辅助',
    //   type: 'bar',
    //   stack: '总量',
    //   itemStyle: {
    //     normal: {
    //       barBorderColor: 'rgba(0,0,0,0)',
    //       color: 'rgba(0,0,0,0)'
    //     }
    //   },
    //   data: [0, 10, 20, 30, 40, 50, 60, 80, 100, 200, 300]
    // },
    {
      name: '蒸发量',
      type: 'bar', // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    },
    {
      name: '降水量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint: {
        data: [
          { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18 },
          { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }
  ],
  // 数据区域缩放
  dataZoom: [{
    show: true,
    start: 10,
    end: 80
  },
  { // 鼠标滚轮缩放
    type: 'inside',
    show: true,
    height: 15,
    start: 1,
    end: 35
  }
  ]
}
export default {
  name: 'barCharts',
  components: { bar },
  data() {
    return {
      chartsData: null,
      reload: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      setTimeout(() => {
        this.chartsData = options
      }, 10)
    },
    xyChange() {
      const temp = this.chartsData.xAxis
      this.chartsData.xAxis = this.chartsData.yAxis
      this.chartsData.yAxis = temp
      this.reload = !this.reload
    },
    chartsChange(type) {
      console.log(type)
      this.chartsData.series.forEach(item => {
        item.type = type
      })
      console.log(this.chartsData.series)
      this.reload = !this.reload
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

