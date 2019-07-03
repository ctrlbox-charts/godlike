<template>
  <div class="root">
    <div class="page-echarts-box">
      <radar 
      title="折线图标题" 
      :id="id" 
      :options='chartsDataObj'
      :reload='reload'
      :themeName="themeName"
      class="echarts"
      >
      </radar>
      <div class="echarts-table">
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
  </div>
</template>

<script>
import radar from './radar'
import options from './options'
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: new Date().toString(),
      themeName: 'light',
      reload: false, // 重新加载图形
      header: [], // 头部
      data_list: [], // 数据
      chartsDataObj: {}
    }
  },
  components: {
    radar
  },
  watch: {
    chartsData(val) {
      this.chartsDataObj = options
      // this.handleData()
      this.updateCharts(val)
    }
  },
  beforeDestroy() {
    // if (!this.chart) {
    //   return
    // }
    // this.chart.dispose()
    // this.chart = null
  },
  methods: {
    // 更新数据
    updateCharts() {
      const { series, legend, polar } = this.chartsData
      this.chartsDataObj.tooltip = series
      this.chartsDataObj.legend = legend
      this.chartsDataObj.polar = polar
    },

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
//   .root{
//     position: relative;
//     width: 100%;
//     height: calc(100vh - 150px);
//   }
//  .echarts-table{
//     position: absolute;
//     right: 0;
//     top: 60px;
//     border: 1px solid #ccc;
//     width: 39%;
//     height: calc(100vh - 150px);
//     overflow-y: scroll;
//   }
.root{
  margin-top: 100px;
  position: relative;
  width: 100%;
  height: calc(100vh - 150px);
   .page-echarts-box{
      position: relative;
      width: 100%;
      height: calc(100vh - 150px);
      display: flex;
      .echarts{
        flex-basis: 60%;
      }
     .echarts-table{
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
.root{
  .el-input--suffix .el-input__inner{
    width: 100px;
    border: none;
    padding: 0px;
  }
}
@media screen and (max-width: 960px){
  .page-echarts-box{
    .echarts{
       flex-basis: 100%!important;
     }
    .echarts-table{
      display: none!important;
    }
  }
}
</style>
