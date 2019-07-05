<template>
  <div class="chart-container" >
    <chart
    className="barCharts" :id="id"
    :themeType="themeType"
    :chartsData="chartsData"
    :reload="reload"
    class="barCharts"
    :class="{'width-100':!isShowDataView}"
    />
    <div class="dataTable" :class="{'none':!isShowDataView}">
      <h2 style="padding-left:10px">数据视图</h2>
      <div>
        <el-table :data="data_list">
          <el-table-column  :label="date" v-for="(date, index) in header" :key="index">
                <template slot-scope="scope">
                    {{data_list[scope.$index][index]}}
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from './bar'
import { barOptions } from '../themeName'
export default {
  name: 'barCharts',
  components: { Chart },
  props: {
    // 通用参数
    chartsData: {
      type: Object,
      default: () => {}
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
      default: 'bar'
    },
    // 主题
    themeType: {
      type: String,
      default: 'macarons'
    }
  },
  data() {
    return {
      header: [], // 头部
      data_list: [], // 数据
      options: barOptions,
      isShowDataView: true // 是否显示数据视图
    }
  },
  watch: {
    chartsData() {
      if (this.chartsData) {
        this.handleData()
        this.updateCharts()
      }
    },
    // 监听数据视图
    reloadDataView() {
      this.isShowDataView = !this.isShowDataView
    }
  },
  methods: {
    // 动态渲染数据
    handleData() {
      let arr = []
      this.header = this.chartsData.series.map(x => x.name)
      this.header.unshift('#')
      arr = this.chartsData.series.map(x => x.data)
      arr.unshift(this.chartsData.xData)
      this.data_list = this.merge(arr)
    },
    // 数组处理
    merge(arrs) {
      var maxLen = Math.max(...arrs.map(x => x.length))
      var result = []
      for (let i = 0; i < maxLen; i++) {
        result.push(arrs.filter(x => x.length > i).map(x => x[i]))
      }
      return result
    },
    // 更新数据
    updateCharts() {
      const { tooltip, toolbox, calculable, dataZoom } = this.options
      this.chartsData.tooltip = tooltip
      this.chartsData.toolbox = toolbox
      this.chartsData.calculable = calculable
      this.chartsData.dataZoom = dataZoom
    }

  }
}
</script>
<style lang="scss" scoped>
.none{
  display: none;
}
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 180px);
  .gw-title-icon {
    color: #73dadb;
    cursor: pointer;
    min-width: 30px;
  }
}
.barCharts {
  width: 60%;
  height: 100%;
}
.width-100 {
  width: 100%;
}
.dataTable {
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #ccc;
    width: 39%;
    height: 100%;
    overflow-y: scroll;
}
</style>
<style lang="scss">
  .gw-charts-filter {
    display: flex;
    margin:10px 30px;
    font-size: 14px;
    .el-select {
      max-width: 140px;
    }
    .el-input--suffix .el-input__inner {
      border:none;
    }
    .gw-filter-theme,.gw-filter-img {
      margin-right: 20px;
    }
    .gw-filter-ope {
      display: flex;
      align-items: center;
      i {
        min-width: 20px;
      }
    }
  }
.gw-statics {
  width:100%;
  height: 100%;
  margin-top: 0px !important;
  .el-dialog__header {
    text-align: center;
    .gw-title-icon {
      color: #73dadb;
      cursor: pointer;
    }
  }
  .el-dialog__body {
    // width:100%;
    // height: 100%;
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0px;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto;
  }
  @media only screen and (min-width: 1000px) {
    .gw-chart {
      display: flex;
      align-items: center;
    }
  }
}
.gw-download-dialog {
  width: 30%;
  .el-dialog__header {
    text-align: center;
  }
  .el-dialog__body {
    text-align: center;
  }
  .dialog-foot {
    margin-top: 30px;
  }
}
</style>


