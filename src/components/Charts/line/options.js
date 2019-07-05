const options = {
  // backgroundColor: '#394056',
  title: {
    text: this.title,
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      // color: '#F1F1F3'
      color: '#000'
    },
    left: '1%'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { // 数据视图
        show: false
      },
      restore: { // 重置
        show: true
      },
      // dataZoom: { //数据缩放视图
      //   show: true
      // },
      saveAsImage: {// 保存图片
        show: true
      }
      // magicType: {// 动态类型切换
      //   type: ['bar', 'line', 'pie']
      // }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B'
      }
    }
  },
  legend: [{
    // top: 20,
    x: 25,
    // icon: 'rect',
    // itemWidth: 14,
    // itemHeight: 5,
    // itemGap: 13,
    data: ['邮件营销', '联盟广告', '视频广告']
    // right: '4%',
    // textStyle: {
    //   fontSize: 12,
    //   color: '#F1F1F3'
    // }
  }],
  grid: {
    top: 100,
    left: '2%',
    right: '2%',
    bottom: '50',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
  }],
  yAxis: [{
    type: 'value',
    name: '(%)',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      lineStyle: {
        color: '#57617B'
      }
    }
  }],
  // 数据区域缩放
  dataZoom: [
    // {
    //     show: true,
    //     start: 10,
    //     end: 80
    // },
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty'
    },
    { // 鼠标滚轮缩放
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ],
  series: [
    {
      name: '邮件营销',
      type: 'line',
      smooth: true,
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
    },
    {
      name: '联盟广告',
      type: 'line',
      smooth: true,
      stack: '总量',
      areaStyle: {},
      data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
    },
    {
      name: '视频广告',
      type: 'line',
      smooth: true,
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
    }]
}
export default options
