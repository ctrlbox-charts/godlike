<template>
  <div class="chart-container" >
    <div style="margin:20px 10px;" >
      <el-row :gutter="20">
        <el-col :span="7">
          <div>
            <span>主题切换: </span>
            <el-select v-model="value" placeholder="请选择" @change="themeChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <span>图表切换: </span>
            <el-select v-model="cvalue" placeholder="请选择" @change="chartsChange">
              <el-option
                v-for="item in chartsOptions"
                :key="item.value"
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-button type="primary" @click="xyChange">坐标切换</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <chart height="100%" width="60%" 
    className="barCharts" id="bar"
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
import themeName from '../themeName'
export default {
  name: 'barCharts',
  components: { Chart },
  props: {
    chartsData: {
      type: Object,
      default: () => {}
    },
    reload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      themeType: 'macarons',
      options: themeName, // 主题名称
      value: 'macarons',
      cvalue: 'bar',
      chartsOptions: [
        {
          value: 'bar',
          label: '柱状图'
        },
        {
          value: 'line',
          label: '折线图'
        },
        {
          value: 'jieti',
          label: '阶梯瀑布图'
        },
        {
          value: 'zucheng',
          label: '组成瀑布图'
        },
        {
          value: 'zhengfu',
          label: '正负柱状图'
        },
        {
          value: 'mix',
          label: '曲线柱状混合图'
        }
      ],
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
    themeChange(val) {
      this.themeType = val
    },
    xyChange() {
      this.$emit('xyChange')
    },
    chartsChange(val) {
      this.$emit('chartsChange', val)
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
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 150px);
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

