<template>
  <div class="chart-container-gague" >
    <gague  
    className="gagueCharts"
    :themeType="themeType"
    :chartsData="chartsData"
    :options = 'chartsDataObj'
    :id="id"
    class='echarts'
    :reload="reload"
    :class="{'width-100':!dataViewVisible}"
    />
    <div class="dataTable" :class="{'none':!dataViewVisible}">
      <h2>数据视图</h2>
      <div>
        <el-table :data="data_list">
          <el-table-column  :label="date" v-for="(date, index) in header" :key="index">
                <template slot-scope="scope">
                    {{data_list[scope.$index][index].name + ":"+data_list[scope.$index][index].value}}
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Gague from './index'
import { options,moreOptions } from './option'
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
    dataViewVisible: {
      type: Boolean,
      default: 'true'
    },
    width: {
      type: String,
      default: '60%'
    },
    routerName:{
      type: String,
      default: 'single-gague'
    }
  },
  data() {
    return {
      header: [], // 头部
      data_list: [], // 数据
      chartsDataObj: {} // 仪表盘配置项数据 
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
        if (this.routerName == 'multiple-gauge') {
        this.chartsDataObj = moreOptions
      } else {
        this.chartsDataObj = options
      }
      this.handleData()
      }
    },
    // routerName(val) {
    //   if (val == 'multiple-gauge') {
    //     this.chartsDataObj = moreOptions
    //   } else {
    //     this.chartsDataObj = options
    //   }
    //   this.handleData()
    // }
  },
  methods: {
    // 动态渲染数据
    handleData() {
      let arr = []
      if (this.chartsDataObj && this.chartsDataObj.series && this.chartsDataObj.series.length) {
        this.header = this.chartsDataObj.series.map(x => x.name)
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
.none{
  display: none;
}
.width-100{
  width: 100%!important;
}
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
    height: 100%;
    overflow-y: scroll;
}
.echarts{
  width: 60%;
  height: 100%;
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


