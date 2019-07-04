<template>
  <div class="root">
    <!-- <div class="page-title">{{title}}</div> -->
    <div class="page-tool">
      <!-- 切换主题：
      <el-select 
      v-model="value" 
      placeholder="请选择"
      @change="changeTheme"
      >
        <el-option
          v-for="item in theme"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <span style="font-size:14px;">折线风格：</span>
      <el-dropdown @command="change" trigger="click">
        <span class="el-dropdown-link cur" :class="{'c0c':!typeValue}">
          {{typeValue?typeValue:'请选择'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
          v-for='(item,index) in option'
          :key="index"
          :command='item'
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="page-echarts-box">
      <LineChart 
      title="折线图标题" 
      :id="id" 
      :options='chartsDataObj'
      :reload='reload'
      :themeType="themeType"
      class="echarts"
      >
      </LineChart>
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
  </div>
</template>

<script>
import LineChart from './line'
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
      default: 'line'
    }
  },
  data() {
    return {
      title: '折线统计图',
      isSmooth: true,
      value: '',
      typeValue: '',
      isStack: true, // 是否是堆积折线图
      header: [], // 头部
      data_list: [], // 数据
      theme: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: 'light',
          label: 'light'
        },
        {
          value: 'macarons',
          label: 'macarons'
        }, {
          value: 'dark',
          label: 'dark'
        }, {
          value: 'infographic',
          label: 'infographic'
        }, {
          value: 'roma',
          label: 'roma'
        }, {
          value: 'shine',
          label: 'shine'
        },
        {
          value: 'vintage',
          label: 'vintage'
        }
      ],
      option: [
        {
          value: 'smooth',
          label: '平滑'
        },
        {
          value: 'coordinate',
          label: '切换坐标轴'

        },
        {
          value: 'stack',
          label: '堆叠折线图'
        }
      ],
      chartsDataObj: {}
    }
  },
  components: {
    LineChart
  },
  watch: {
    chartsData: {
      handler: function(val) {
        this.chartsDataObj = options
        this.updateCharts(val)
        this.handleData()
      },
      deep: true
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
      const { series, legend, xAxis, yAxis, xData } = this.chartsData
      this.chartsDataObj.series = series
      this.chartsDataObj.legend = legend
      this.chartsDataObj.xAxis = xAxis
      this.chartsDataObj.yAxis = yAxis
      this.chartsDataObj.xData = xData
    },
    // 动态渲染数据
    handleData() {
      let arr = []
      this.header = this.chartsDataObj.series.map(x => x.name)
      this.header.unshift('#')
      arr = this.chartsDataObj.series.map(x => x.data)
      arr.unshift(this.chartsDataObj.xData)
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
    change(val) {
      this.typeValue = val.label
      switch (val.value) {
        case 'smooth':
          this.changeSmooth()
          break
        case 'coordinate':
          this.xyChange()
          break
        case 'stack':
          this.changeStack()
          break
        default:
          break
      }
    },
    // 坐标轴切换
    xyChange() {
      var temp = this.chartsDataObj.xAxis
      this.chartsDataObj.xAxis = this.chartsDataObj.yAxis
      this.chartsDataObj.yAxis = temp
    },
    // 折线是否平滑
    changeSmooth() {
      this.chartsDataObj.series.forEach(el => {
        this.$set(el, 'smooth', !el.smooth)
      })
    },
    // 堆叠
    changeStack() {
      this.chartsDataObj.series.forEach(el => {
        if (el.stack) {
          this.$set(el, 'stack', '')
          if (el.hasOwnProperty('areaStyle')) {
            this.$delete(el, 'areaStyle')
          }
        } else {
          this.$set(el, 'stack', '总量')
          this.$set(el, 'areaStyle', {})
        }
      })
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
  .page-title{
     border-left: solid 5px #55A4D8;
     padding-left: 8px;
     margin-bottom: 8px;
     text-align: left;
     font-weight: 700;
     font-style: normal;
     font-size: 16px;
   }
   .page-tool{
     text-align: left;
     padding: 8px;
   }
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
