<template>
  <div class="chart-container-gague" >
    <gague height="100%" :width="dataViewVisible?width:'100%'" 
    className="gagueCharts"
    :themeType="themeType"
    :chartsData="chartsData"
    :id="id"
    :reload="reload"/>
    <div class="dataTable" v-if="dataViewVisible">
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
import Gague from './index'
export default {
  name: 'gagueCharts',
  components: { Gague },
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
      default: 'gague'
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
      if (this.chartsData && this.chartsData.series && this.chartsData.series.length) {
        this.header = this.chartsData.series.map(x => x.name)
        arr = this.chartsData.series.map(x => x.data)
        this.data_list = this.merge(arr)
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
.chart-container-gague{
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


