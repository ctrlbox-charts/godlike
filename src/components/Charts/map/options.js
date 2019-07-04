const options = {
  // backgroundColor: '#FFFFFF',
  // title: {
  //   text: '全国地图大数据',
  //   subtext: '',
  //   x: 'center'
  // },
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  // 左侧小导航图标
  visualMap: {
    show: true,
    x: 'left',
    y: '60%',
    splitList: [
      { start: 600 },
      { start: 500, end: 600 }, { start: 400, end: 500 },
      { start: 300, end: 400 }, { start: 200, end: 300 },
      { start: 100, end: 200 }, { start: 0, end: 100 }
    ]
    // color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
  },

  // 配置属性
  series: [{
    name: '数据',
    type: 'map',
    mapType: 'china',
    roam: true,
    label: {
      normal: {
        show: false // 省份名称
      },
      emphasis: {
        show: false
      }
    },
    data: [] // 数据
  }]
}
export default options
