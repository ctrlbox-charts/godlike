<template>
  <div class="gw-charts-components">
    <echarts-filter 
    @themeChange = 'themeChange'  
    @chartsChange="chartsChange" 
    @xyChange = 'xyChange' 
    @dataView = 'dataView'
    @clickScreen = 'clickScreen'
    @clickScreenAll = 'clickScreenAll'
    />
    <event-river-data-view 
    :chartsData="chartsData" 
    :reload="reload"
    :id="id"
    :dataViewVisible = 'dataViewVisible'
    :themeType = 'themeType'
    ></event-river-data-view>
  </div> 
</template>
<script>
import EventRiverDataView from '@/components/Charts/eventRiver/event-river-data-view'
import EchartsFilter from '@/views/echarts/echarts-filter'
// 全屏
function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}
const xData = (function() {
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
const options = {
    title : {
        text: 'Event River',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'item',
        enterable: true
    },
    legend: {
        data:['财经事件', '政治事件']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            type : 'time',
            boundaryGap: [0.05,0.1]
        }
    ],
    series : [
        {
            "name": "财经事件", 
            "type": "eventRiver", 
            "weight": 123, 
            "data": [
                {
                    "name": "阿里巴巴上市", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-01", 
                            "value": 14, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-02", 
                            "value": 34, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-03", 
                            "value": 60, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-04", 
                            "value": 40, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-05", 
                            "value": 10, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }, 
                {
                    "name": "阿里巴巴上市2", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-02", 
                            "value": 10, 
                            "detail": {
                                "link": "www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-03", 
                            "value": 34, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-04", 
                            "value": 40, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-05", 
                            "value": 10, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }, 
                {
                    "name": "三星业绩暴跌", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-03", 
                            "value": 24, 
                            "detail": {
                                "link": "www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-04", 
                            "value": 34, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-05", 
                            "value": 50, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-06", 
                            "value": 30, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-07", 
                            "value": 20, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }
            ]
        }, 
        {
            "name": "政治事件", 
            "type": "eventRiver", 
            "weight": 123, 
            "data": [
                {
                    "name": "Apec峰会", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-06", 
                            "value": 14, 
                            "detail": {
                                "link": "www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-07", 
                            "value": 34, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-08", 
                            "value": 60, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-09", 
                            "value": 40, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-10", 
                            "value": 20, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }, 
                {
                    "name": "运城官帮透视", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-08", 
                            "value": 4, 
                            "detail": {
                                "link": "www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-09", 
                            "value": 14, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-10", 
                            "value": 30, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-11", 
                            "value": 20, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-12", 
                            "value": 10, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }, 
                {
                    "name": "底层公务员收入超过副部长", 
                    "weight": 123, 
                    "evolution": [
                        {
                            "time": "2014-05-11", 
                            "value": 4, 
                            "detail": {
                                "link": "www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-12", 
                            "value": 24, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-13", 
                            "value": 40, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-14", 
                            "value": 20, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-15", 
                            "value": 15, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }, 
                        {
                            "time": "2014-05-16", 
                            "value": 10, 
                            "detail": {
                                "link": "http://www.baidu.com", 
                                "text": "百度指数", 
                                "img": '../asset/ico/favicon.png'
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
export default {
  name: 'eventRiverCharts',
  components: {EventRiverDataView,EchartsFilter},
  data() {
    return {
      themeType: null,
      chartsData: null,
      reload: false,
      id: 'eventRiver',
      // 数据视图
      dataViewVisible: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 全屏 by wwh
    clickScreen() {
      var full = document.getElementById(this.id)
      if (full) {
        launchIntoFullscreen(full)
      }
    },
    // 一屏多图 by wwh
    clickScreenAll() {

    },
    // 数据视图
    dataView (val){
      this.dataViewVisible = !this.dataViewVisible
      this.init()
    },
    // 主题切换 by wwh
    themeChange(val) {
      this.themeType = val
    },
    init() {
      setTimeout(() => {
        this.chartsData = options
      }, 10)
    },
    // 坐标切换
    xyChange() {
      const temp = this.chartsData.xAxis
      this.chartsData.xAxis = this.chartsData.yAxis
      this.chartsData.yAxis = temp
      this.reload = !this.reload
    },
    // 图形切换
    chartsChange(type) {
      this.chartsData.series.forEach(item => {
        item.type = type
      })
      this.reload = !this.reload
    }
  }
}
</script>
<style lang="scss" scoped>
.charts-box-root{
  padding-bottom: 100px;
}
</style>