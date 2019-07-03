<template>
  <div class="gw-charts-filter">
    <div class="gw-filter-theme"> 
      <span>主题切换: </span>
      <el-select v-model="themeType" placeholder="请选择" @change="themeChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="gw-filter-img">
      <span>图表切换: </span>
      <el-select v-model="magicType" placeholder="请选择" @change="chartsChange">
        <el-option
          v-for="item in chartsOptions"
          :key="item.value"
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="gw-filter-ope">
      <span>操作：</span>
      <div title="全屏模式" class="gw-title-icon"><i class="el-icon-full-screen" @click="clickScreen" style="cursor: pointer;"/></div>
      <div title="多图形查看" class="gw-title-icon"> <i class="el-icon-copy-document" @click="clickScreenAll" style="cursor: pointer;"/></div>
      <div title="坐标切换" class="gw-title-icon"> <i class="el-icon-location-outline" @click="xyChange" style="cursor: pointer;"/></div>
    </div>
</div>
</template>
<script>
import { themeName } from '@/components/Charts/themeName'
export default {
  data() {
    return {
      options: themeName, // 主题名称
      themeType: 'default',
      magicType: 'bar',
      // 图形
      chartsOptions: [
        {
          value: 'bar',
          label: '柱状图'
        },
        {
          value: 'line',
          label: '折线图'
        }
      ]
    }
  },
  methods: {
    themeChange(val) {
      this.themeType = val
      this.$emit('themeChange', val)
    },
    chartsChange(val) {
      this.$emit('chartsChange', val)
    },
    xyChange() {
      this.$emit('xyChange')
    },
    clickScreen() {
      this.$emit('clickScreen')
    },
    clickScreenAll() {
      this.$emit('clickScreenAll')
    }
  }
}
</script>

<style lang="scss">
  .gw-charts-filter {
    display: flex;
    margin: 10px 30px;
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
    // width:100%;
    // height: 100%;
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


