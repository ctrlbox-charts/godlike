<template>
  <div class="chart-container" >
    <chart height="100%" width="60%" 
    className="treeCharts" :id="id"
    :themeType="themeType"
    :chartsData="chartsData"
    :reload="reload"
    />
    <div class="dataTable">
      <h2 style="margin-left:10px;color:#666;">数据视图</h2>
      <div>
        <el-tree :data="data_list" 
        :props="defaultProps" 
        default-expand-all
        ></el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from './tree'
import { treeOptions } from '../themeName'
export default {
  name: 'treeCharts',
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
    // 组件唯一id
    id: {
      type: String,
      default: 'bar'
    },
    // 主题
    themeType: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      header: [], // 头部
      data_list: [], // 数据
      options: treeOptions,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    chartsData() {
      if (this.chartsData) {
        this.updateCharts()
        this.handleData()
      }
    }
  },
  methods: {
    // 动态渲染数据
    handleData() {
      this.data_list = this.chartsData.series.map(x => x.data)[0]
    },
    // 更新数据
    updateCharts() {
      const { toolbox, calculable } = this.options
      this.chartsData.toolbox = toolbox
      this.chartsData.calculable = calculable
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
    height: calc(100vh - 185px);
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


