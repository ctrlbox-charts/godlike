<template>
  <div class="root">
    <div class="page-echarts-box">
      <radar 
      :id="id" 
      :options='chartsDataObj'
      :reload='reload'
      :themeType="themeType"
      class="echarts"
      :class="{'flex-100':!isShowDataView}"
      >
      </radar>
      <div class="dataTable" :class="{'none':!isShowDataView}" v-for='(item, index) in data_list' :key='index'>
        <div>
          <h2>{{item.name}}</h2>
          <div>
            <el-table :data="item.dataList">
              <el-table-column 
              label="#"
              prop='name'
              >
              </el-table-column>
              <el-table-column 
              label="值" 
              prop='value'
              :key="index">
                <template slot-scope="scope">
                  <span>
                    <span style='margin-right: 10px;' v-for='(item,index) in scope.row.value' :key='index'>{{item}}</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import radar from './radar'
import { options, wormOptions } from './options'
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
    // 重新加载数据视图
    reloadDataView: {
      type: Boolean,
      default: false
    },
    // 组件唯一id
    id: {
      type: String,
      default: 'radar'
    },
    routerName: {
      type: String,
      default: 'radar'
    }
  },
  data() {
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
    radar
  },
  watch: {
    chartsData(val) {
      if (val === 'wormhole') {
        this.chartsDataObj = wormOptions
      } else {
        this.chartsDataObj = options
      }
      this.handleData()
      this.updateCharts()
    },
    routerName(val) {
      if (val === 'wormhole') {
        this.chartsDataObj = wormOptions
      } else {
        this.chartsDataObj = options
      }
      this.updateCharts()
    },
    reloadDataView() {
      this.isShowDataView = !this.isShowDataView
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
      if (this.routerName === 'radar' || this.routerName === 'fill') {
        this.chartsDataObj.series = series
        this.chartsDataObj.legend = legend
        this.chartsDataObj.polar = polar
      }
      if (this.routerName === 'fill') {
        this.chartsDataObj.series.forEach(el => {
          this.$set(el, 'itemStyle', this.itemStyle)
        })
      } else {
        this.chartsDataObj.series.forEach(el => {
          this.$set(el, 'itemStyle', {})
        })
      }
    },
    // 动态渲染数据
    handleData() {
      this.data_list = []
      this.chartsData.series.forEach(el => {
        const obj = {}
        obj.name = el.name

        obj.dataList = el.data
        this.data_list.push(obj)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.none{
  display: none;
}
.flex-100{
  flex-basis: 100%!important;
}
.root{
  margin-top: 100px;
  position: relative;
  width: 100%;
  height: calc(100vh - 300px);
   .page-echarts-box{
      position: relative;
      width: 100%;
      height: 100%;
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
