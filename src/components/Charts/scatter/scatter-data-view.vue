<template>
  <div class="chart-container-scatter" >
      <scatter height="100%" :width="dataViewVisible?width:'100%'" 
      className="scatterCharts"
      title="标准散点图"
      :themeType="themeType"
      :options ="chartsDataObj"
      :id="id"
      class="echarts"
      :reload="reload"/>
      <div class="dataTable" v-if="dataViewVisible">
        <h2>数据视图</h2>
        <div>
          <el-table :data="data_list">
            <el-table-column show-overflow-tooltip :label="date" v-for="(date, index) in header" :key="index">
                  <template slot-scope="scope">
                      {{data_list[scope.$index][0][index]}}
                  </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<script>
import Scatter from './index' 
import {moreOptions, options} from './options'
export default {
  name: 'scatterCharts',
  components: { Scatter },
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
      default: 'scatter'
    },
    // 主题
    themeType: {
      type: String,
      default: 'macarons'
    },
    dataViewVisible:{
      type: Boolean,
      default: 'true'
    },
    width:{
      type: String,
      default: '60%'
    },
    routerName: {
      type: String,
      default: 'scatter'
    }
  },
  data() {
    return {
      header: [], // 头部
      chartsDataObj:{},
      data_list: [] // 数据
    }
  },
  watch: {
    '$route':{
      // 深度监听 属性的变化
      deep:true,
      // 立即处理 进入页面就触发
      immediate: true,  
      // 数据发生变化就会调用这个函数  
      handler( val ) {
        this.routerName = val.name
        if (this.routerName == 'scatter-process') {
        this.chartsDataObj = moreOptions
      } else {
        this.chartsDataObj = options
      }
      this.handleData()
      }
    },
  },
  methods: {
    // 动态渲染数据
    handleData() {
      // console.log(this.chartsData)
      let arr = []
      if (this.chartsDataObj && this.chartsDataObj.series && this.chartsDataObj.series.length) {
        this.header = ["时间","数据1", "数据2"]
        arr = this.chartsDataObj.series.map(x => x.data)
        this.data_list = this.merge(arr)
      } else {
        this.data_list = []
      }
    },
    // 数组处理merge
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
.chart-container-scatter{
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
</style>

<style lang='scss'>
@media screen and (max-width: 960px){
  .chart-container-scatter{
    .echarts{
       flex-basis: 100%!important;
     }
    .dataTable{
      display: none!important;
    }
  }
}
</style>


