const themeName = [
  {
    value: 'default',
    label: 'default'
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
]

const barOptions = {
  // 提示框
  tooltip: {
    trigger: 'axis'
  },
  // 工具栏
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
  calculable: true,
  // 数据区域缩放
  dataZoom: [{
    show: true
  },
  { // 鼠标滚轮缩放
    type: 'inside',
    show: true,
    height: 15,
    start: 1,
    end: 35
  }
  ]
}
const pieOptions = {
  // 提示框
  tooltip: {
    trigger: 'item'
  },
  // 工具栏
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      magicType: {
        show: true,
        type: ['pie', 'funnel'],
        option: {
          funnel: {
            x: '25%',
            width: '50%',
            funnelAlign: 'left',
            max: 1548
          }
        }
      },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
  calculable: true,
  // 数据区域缩放
  timeline: {
    show: true
  }
}
const treeOptions = {
  // 工具栏
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
  calculable: false
}
const calendarOptions = {
  tooltip: {
    position: 'top'
  }
}
export { themeName, barOptions, pieOptions, treeOptions, calendarOptions }
