const options = {
  // title: {
  //   text: '预算 vs 开销（Budget vs spending）',
  //   subtext: '纯属虚构'
  // },
  tooltip: {
    trigger: 'axis'
  },
  legend: [{
    // orient: 'vertical',
    // x: 'right',
    // y: 'bottom',
    x: 25,
    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）', 's收入']
  }],
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: false, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    },
    x: 'right'
  },
  polar: [
    {
      indicator: [
        { text: '销售（sales）', max: 6000 },
        { text: '管理（Administration）', max: 16000 },
        { text: '信息技术（Information Techology）', max: 30000 },
        { text: '客服（Customer Support）', max: 38000 },
        { text: '研发（Development）', max: 52000 },
        { text: '市场（Marketing）', max: 25000 }
      ]
    }
  ],
  calculable: true,
  series: [
    {
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // 填充雷达图
      // itemStyle: {
      //   normal: {
      //     areaStyle: {
      //       type: 'default'
      //     }
      //   }
      // },
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: '预算分配（Allocated Budget）'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: '实际开销（Actual Spending）'
        },
        {
          value: [4500, 13000, 27000, 30000, 41000, 20000],
          name: 's收入'
        }
      ]
    }
  ]
}
const wormOptions = {
  // title: {
  //   text: '浏览器占比变化',
  //   subtext: '纯属虚构',
  //   top: 10,
  //   left: 10
  // },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,250,0.2)'
  },
  legend: {
    type: 'scroll',
    // bottom: 100,
    data: (() => {
      var list = []
      for (var i = 1; i <= 28; i++) {
        list.push(i + 2000 + '')
      }
      return list
    })()
  },
  visualMap: {
    top: 'middle',
    right: 10,
    color: ['red', 'yellow'],
    calculable: true
  },
  radar: {
    indicator: [
      { text: 'IE8-', max: 400 },
      { text: 'IE9+', max: 400 },
      { text: 'Safari', max: 400 },
      { text: 'Firefox', max: 400 },
      { text: 'Chrome', max: 400 }
    ]
  },
  series: (function() {
    var series = []
    for (var i = 1; i <= 28; i++) {
      series.push({
        name: '浏览器（数据纯属虚构）',
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1
        },
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)'
          }
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              i * i / 2
            ],
            name: i + 2000 + ''
          }
        ]
      })
    }
    return series
  })()
}
export { options, wormOptions }
