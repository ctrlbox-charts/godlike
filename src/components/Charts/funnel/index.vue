<template>
  <div class="root">
    <div class="page-echarts-box">
      <funnel title="折线图标题"
              :id="id"
              :options='chartsDataObj'
              :reload='reload'
              :themeType="themeType"
              class="echarts"
              :class="{'flex-100':!isShowDataView}">
      </funnel>
      <div class="dataTable"
           :class="{'none':!isShowDataView}">
        <div v-for='(item, index) in data_list'
             :key='index'
             class='table-item'>
          <h4>{{item.name}}</h4>
          <div>
            <el-table :data="item.dataList">
              <el-table-column align='center'
                               prop="name"
                               label='#'>
              </el-table-column>
              <el-table-column align='center'
                               prop="value"
                               label='数量'>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import funnel from './funnel'
import { options, moreOptions } from './options'
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => { }
    },
    // 主题
    themeType: {
      type: String,
      default: 'default'
    },
    // 是否重新加载
    reload: {
      type: Boolean,
      default: false
    },
    // 重新加载数据视图
    reloadDataView: {
      type: Boolean,
      default: false
    },
    // 组件唯一id
    id: {
      type: String,
      default: 'funnel'
    },
    routerName: {
      type: String,
      default: 'radar'
    }
  },
  data () {
    return {
      header: [], // 头部
      data_list: [], // 数据
      isShowDataView: true, // 是否显示数据视图
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default'
          }
        }
      },
      chartsDataObj: {}
    }
  },
  components: {
    funnel
  },
  watch: {
    chartsData (val) {
      if (val === 'more') {
        this.chartsDataObj = moreOptions
      } else {
        this.chartsDataObj = options
      }
      this.handleData()
      this.updateCharts()
    },
    routerName (val) {
      if (val === 'more') {
        this.chartsDataObj = moreOptions
      } else {
        this.chartsDataObj = options
      }
      this.handleData()
      this.updateCharts()
    },
    reloadDataView () {
      this.isShowDataView = !this.isShowDataView
    }
  },
  beforeDestroy () {
    // if (!this.chart) {
    //   return
    // }
    // this.chart.dispose()
    // this.chart = null
  },
  methods: {
    // 更新数据
    updateCharts () {
      // const { series, legend, polar } = this.chartsData
      // if (this.routerName === 'radar' || this.routerName === 'fill') {
      //   this.chartsDataObj.series = series
      //   this.chartsDataObj.legend = legend
      //   this.chartsDataObj.polar = polar
      // }
    },

    // 动态渲染数据
    handleData () {
      this.data_list = []
      if (Array.isArray(this.chartsDataObj.series) && this.chartsDataObj.series.length) {
        this.chartsDataObj.series.forEach(el => {
          const obj = {}
          obj.name = el.name
          obj.dataList = el.data
          this.data_list.push(obj)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.none {
  display: none;
}
.flex-100 {
  flex-basis: 100% !important;
}
.root {
  margin-top: 80px;
  position: relative;
  width: 100%;
  height: calc(100vh - 230px);
  .page-echarts-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    .echarts {
      flex-basis: 60%;
    }
    .dataTable {
      position: absolute;
      right: 0;
      top: 0px;
      border: 1px solid #ccc;
      width: 39%;
      height: 100%;
      overflow-y: auto;
    }
  }
  /*滚动条样式*/
  .dataTable::-webkit-scrollbar {
    width: 7px;
  }
  .dataTable::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(11, 123, 228, 0.6);
    background: rgba(11, 123, 228, 0.6);
  }
  .dataTable::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
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
    .dataTable {
      display: none !important;
    }
  }
}
</style>
