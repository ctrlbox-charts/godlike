<template>
  <div class="root">
    <div class="page-echarts-box">
      <e-map 
      title="折线图标题" 
      :id="id" 
      :options='chartsDataObj'
      :reload='reload'
      :themeType="themeType"
      class="echarts"
      >
      </e-map>
      <div class="dataTable">
        <h2>数据视图</h2>
        <div>
          <el-table :data="data_list">
            <el-table-column
            label='省份'
            align='center'
            prop='name'
            >
            </el-table-column>
            <el-table-column
            label='数量'
            align='center'
            prop='value'
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import EMap from './map'
import options from './options'
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => {}
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
    // 组件唯一id
    id: {
      type: String,
      default: 'map'
    }
  },
  data() {
    return {
      data_list: [], // 数据
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
    EMap
  },
  watch: {
    chartsData(val) {
      this.chartsDataObj = options
      this.handleData()
      this.updateCharts()
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
      const { dataList } = this.chartsData
      this.chartsDataObj.series.forEach(el => {
        this.$set(el, 'data', dataList)
      })
    },

    // 动态渲染数据
    handleData() {
      this.data_list = this.chartsData.dataList || []
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
     .dataTable{
        position: absolute;
        right: 0;
        top: 0px;
        border: 1px solid #ccc;
        width: 39%;
        height: calc(100vh - 150px);
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
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
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
    .dataTable{
      display: none!important;
    }
  }
}
</style>
