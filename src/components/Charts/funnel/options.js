const options = {
  // title: {
  //   text: '漏斗图',
  //   subtext: '纯属虚构'
  // },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: false, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['展现', '点击', '访问', '咨询', '订单']
  },
  calculable: true,
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      x: '10%',
      y: 60,
      // x2: 80,
      y2: 60,
      width: '80%',
      // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending', // 'ascending', 'descending'
      gap: 10,
      itemStyle: {
        normal: {
          // color: 各异,
          borderColor: '#fff',
          borderWidth: 1,
          label: {
            show: true,
            position: 'inside'
            // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
          },
          labelLine: {
            show: false,
            length: 10,
            lineStyle: {
              // color: 各异,
              width: 1,
              type: 'solid'
            }
          }
        },
        emphasis: {
          // color: 各异,
          borderColor: 'red',
          borderWidth: 5,
          label: {
            show: true,
            formatter: '{b}:{c}%',
            textStyle: {
              fontSize: 20
            }
          },
          labelLine: {
            show: true
          }
        }
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    }
  ]
}
const moreOptions = {
  // title: {
  //   text: '漏斗图',
  //   subtext: '纯属虚构',
  //   x: 'left',
  //   y: 'bottom'
  // },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    // orient: 'vertical',
    // y: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: false, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    // orient: 'vertical',
    // x: 'left',
    data: ['展现', '点击', '访问', '咨询', '订单']
  },
  calculable: true,
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      width: '40%',
      height: '45%',
      x: '5%',
      y: '50%',
      data: [
        { value: 60, name: '访问' },
        { value: 30, name: '咨询' },
        { value: 10, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: '金字塔',
      type: 'funnel',
      width: '40%',
      height: '45%',
      x: '5%',
      y: '5%',
      sort: 'ascending',
      data: [
        { value: 60, name: '访问' },
        { value: 30, name: '咨询' },
        { value: 10, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: '漏斗图',
      type: 'funnel',
      width: '40%',
      height: '45%',
      x: '55%',
      y: '5%',
      itemStyle: {
        normal: {
          // color: 各异,
          label: {
            position: 'left'
          }
        }
      },
      data: [
        { value: 60, name: '访问' },
        { value: 30, name: '咨询' },
        { value: 10, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: '金字塔',
      type: 'funnel',
      width: '40%',
      height: '45%',
      x: '55%',
      y: '50%',
      sort: 'ascending',
      itemStyle: {
        normal: {
          // color: 各异,
          label: {
            position: 'left'
          }
        }
      },
      data: [
        { value: 60, name: '访问' },
        { value: 30, name: '咨询' },
        { value: 10, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    }
  ]
}
export { options, moreOptions }
