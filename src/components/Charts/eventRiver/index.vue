<template>
  <div class="river-echarts-root">
    <div :id="id" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>
<script>
import resize from '../mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'eventRiver'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 折线图主题
    themeName: {
      type: String,
      default: 'light'
    },
    reload: {
      type: Boolean
    },
    // 数据
    series: {
      type: Array,
      default: () => []
    },
    yAxis: {
      type: Array,
      default: () => []
    },
    xAxis: {
      type: Array,
      default: () => []
    },
    legend: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      
    options: {
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
}
    }
  },
  watch: {
    reload(val) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.initChart(this.options)
    },
  },
  mounted() {
    this.initChart(this.options)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(options) {
      if (!document.getElementById(this.id)) return
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.options)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>