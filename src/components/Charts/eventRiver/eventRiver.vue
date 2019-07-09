<template>
  <div class="root">
    <div class="page-echarts-box">
      <river title="主题河流图标题"
             :id="id"
             :options='chartsData'
             :reload='reload'
             :themeName="themeName"
             :series='series'
             :yAxis='yAxis'
             :xAxis='xAxis'
             :legend='legend'
             class="echarts">
      </river>
      <!-- <div class="echarts-table">
        <h2>数据视图</h2>
        <div>
          <el-table :data="data_list">
            <el-table-column  :label="date" v-for="(date, index) in header" :key="index">
                  <template slot-scope="scope">
                    {{data_list[scope.$index][index]}}
                  </template>
              </el-table-column>
          </el-table>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import River from './index'
export default {
  name: 'event',
  props: {
    chartsData: {
      type: Object,
      default: () => { }
    },
    id: {
      type: String,
      default: () => 'eventRiver'
    }
  },
  data () {
    return {
      aaa: '111',
      themeName: 'light',
      isSmooth: true,
      value: '',
      reload: false, // 重新加载图形
      isStack: true, // 是否是堆积折线图
      header: [], // 头部
      data_list: [], // 数据
      series: [
        {
          name: '邮件营销',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
        },
        {
          name: '联盟广告',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {},
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
        },
        {
          name: '视频广告',
          type: 'line',
          smooth: true,
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
        }],
      yAxis: [{
        type: 'value',
        name: '(%)',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: '#57617B'
          }
        }
      }],
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      }],
      legend: {
        top: 20,
        data: ['邮件营销', '联盟广告', '视频广告']
      },
      tableData: [
        {
          date: '2019.07.02',
          name: '赵',
          address: '地址'
        },
        {
          date: '2019.07.02',
          name: '赵',
          address: '地址'
        },
        {
          date: '2019.07.02',
          name: '赵',
          address: '地址'
        },
        {
          date: '2019.07.02',
          name: '赵',
          address: '地址'
        }
      ],
      theme: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: 'light',
          label: 'light'
        },
        {
          value: 'macarons',
          label: 'macarons'
        }, {
          value: 'dark',
          label: 'dark'
        }, {
          value: 'infographic',
          label: 'infographic'
        }, {
          value: 'roma',
          label: 'roma'
        }, {
          value: 'shine',
          label: 'shine'
        },
        {
          value: 'vintage',
          label: 'vintage'
        }
      ]
    }
  },
  components: {
    River
  },
  watch: {
    chartsData () {
      // this.handleData()
    }
  },
  beforeDestroy () {
  },
  methods: {
    // 动态渲染数据
    handleData () {
      let arr = []
      this.header = this.chartsData.series.map(x => x.name)
      this.header.unshift('#')
      arr = this.chartsData.series.map(x => x.data)
      arr.unshift(this.chartsData.xData)
      this.data_list = this.merge(arr)
    },
    // 数组处理
    merge (arrs) {
      var maxLen = Math.max(...arrs.map(x => x.length))
      var result = []
      for (let i = 0; i < maxLen; i++) {
        result.push(arrs.filter(x => x.length > i).map(x => x[i]))
      }
      return result
    },
    // 坐标轴切换
    xyChange () {
      var temp = this.xAxis
      this.xAxis = this.yAxis
      this.yAxis = temp
      this.reload = !this.reload
    }
  }
}
</script>
<style lang="scss" scoped>
.root {
  margin-top: 100px;
  position: relative;
  width: 100%;
  height: calc(100vh - 150px);
  .page-title {
    border-left: solid 5px #55a4d8;
    padding-left: 8px;
    margin-bottom: 8px;
    text-align: left;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
  }
  .page-tool {
    text-align: left;
    padding: 8px;
  }
  .page-echarts-box {
    position: relative;
    width: 100%;
    height: calc(100vh - 150px);
    display: flex;
    .echarts {
      flex-basis: 100%;
    }
    .echarts-table {
      position: absolute;
      right: 0;
      top: 0px;
      border: 1px solid #ccc;
      width: 39%;
      height: calc(100vh - 150px);
      overflow-y: scroll;
    }
  }
}
</style>
<style lang='scss'>
.root {
  .el-input--suffix .el-input__inner {
    width: 100px;
    border: none;
    padding: 0px;
  }
}
@media screen and (max-width: 960px) {
  .page-echarts-box {
    .echarts {
      flex-basis: 100% !important;
    }
    .echarts-table {
      display: none !important;
    }
  }
}
</style>
