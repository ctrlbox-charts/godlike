<template>
  <div class="root">
    <div class="page-charts-sankey">
      <sankey 
      height="100%" 
      width="60%" 
      className="sankeyCharts" 
      :id="id"
      :themeType="themeType"
      :chartsData="chartsData"
      title="桑基标题" 
      :options='chartsData'
      :reload='reload'
      :themeName="themeName"
      :series='series'
      class="echarts"
      >
      </sankey>
      <!-- <div class="echarts-table">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import Sankey from './index'
export default {
  props: {
    chartsData: {
      type: Object,
      default: () => {}
    },
    // 视图主题
    themeType:{
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      id: new Date().toString(),
      themeName: 'light',
      value: '',
      reload: false, // 重新加载图形
      header: [], // 头部
      data_list: [], // 数据
      series: {
        type: 'sankey',
        layout:'none',
        focusNodeAdjacency: 'allEdges',
        data: [{
            name: 'a'
        }, {
            name: 'b'
        }, {
            name: 'a1'
        }, {
            name: 'a2'
        }, {
            name: 'b1'
        }, {
            name: 'c'
        }],
        links: [{
            source: 'a',
            target: 'a1',
            value: 5
        }, {
            source: 'a',
            target: 'a2',
            value: 3
        }, {
            source: 'b',
            target: 'b1',
            value: 8
        }, {
            source: 'a',
            target: 'b1',
            value: 3
        }, {
            source: 'b1',
            target: 'a1',
            value: 1
        }, {
            source: 'b1',
            target: 'c',
            value: 2
        }]
      },
    }
  },
  components: {
    Sankey
  },
  watch: {
    chartsData() {
      this.handleData()
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
    handleData() {
      // let arr = []
      // this.header = this.chartsData.series.map(x => x.name)
      // this.header.unshift('#')
      // arr = this.chartsData.series.map(x => x.data)
      // arr.unshift(this.chartsData.xData)
      // this.data_list = this.merge(arr)
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
  }
}
</script>

<style lang="scss" scoped>
.page-charts-sankey{
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