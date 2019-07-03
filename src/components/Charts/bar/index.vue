<template>
  <div class="chart-container" >
    <chart height="100%" width="60%" 
    className="barCharts" :id="id"
    :themeType="themeType"
    :chartsData="chartsData"
    :reload="reload"/>
    <div class="dataTable">
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
    </div>
  </div>
</template>
<script>
import Chart from './bar'
export default {
  name: 'barCharts',
  components: { Chart },
  props: {
    // 插件数据
    chartsData: {
      type: Object,
      default: () => {}
    },
    // 是否重新加载
    reload: {
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
      data_list: [] // 数据
    }
  },
  watch: {
    chartsData() {
      this.handleData()
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
    }

  }
}
</script>
<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
  .gw-title-icon {
    color: #73dadb;
    cursor: pointer;
    min-width: 30px;
  }
}
.dataTable {
    position: absolute;
    right: 0;
    top: 60px;
    border: 1px solid #ccc;
    width: 39%;
    height: calc(100vh - 150px);
    overflow-y: scroll;
}
</style>
<style lang="scss">
  .gw-charts-filter {
    display: flex;
    margin:20px 30px;
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


