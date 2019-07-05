import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Demo', icon: 'form' }
      }
    ]
  },

  {
    path: '/echarts',
    component: Layout,
    meta: { title: 'Charts', icon: 'chart' },
    children: [
      {
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '柱状图', icon: 'chart' },
        children: [
          {
            path: 'bar',
            component: () => import('@/views/echarts/bar/bar'),
            name: 'bar',
            meta: { title: '标准柱状图' }
          },
          {
            path: 'pubu',
            component: () => import('@/views/echarts/bar/pubu'),
            name: 'pubu',
            meta: { title: '组成瀑布图' }
          },
          {
            path: 'pubuChange',
            component: () => import('@/views/echarts/bar/pubuChange'),
            name: 'pubuChange',
            meta: { title: '阶梯瀑布图' }
          },
          {
            path: 'zhengfuBar',
            component: () => import('@/views/echarts/bar/zhengfuBar'),
            name: 'zhengfuBar',
            meta: { title: '正负柱状图' }
          },
          {
            path: 'mixBar',
            component: () => import('@/views/echarts/bar/mixBar'),
            name: 'mixBar',
            meta: { title: '混合柱状图' }
          }
        ]
      },
      {
        path: 'pieIndex',
        name: 'pieIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '饼状图', icon: 'chart' },
        children: [
          {
            path: 'pie',
            component: () => import('@/views/echarts/pie/pie'),
            name: 'pie',
            meta: { title: '标准饼状图' }
          },
          {
            path: 'cycPie',
            component: () => import('@/views/echarts/pie/cycPie'),
            name: 'cycPie',
            meta: { title: '环形饼状图' }
          },
          {
            path: 'outInPie',
            component: () => import('@/views/echarts/pie/outInPie'),
            name: 'outInPie',
            meta: { title: '嵌套饼状图' }
          },
          {
            path: 'rosePie',
            component: () => import('@/views/echarts/pie/rosePie'),
            name: 'rosePie',
            meta: { title: '玫瑰饼状图' }
          },
          {
            path: 'qianPie',
            component: () => import('@/views/echarts/pie/qianPie'),
            name: 'qianPie',
            meta: { title: '千层饼状图' }
          }
        ]
      },
      {
        path: 'treeChartsIndex',
        name: 'treeChartsIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '树状图', icon: 'chart' },
        children: [
          {
            path: 'defaultTree',
            component: () => import('@/views/echarts/tree/tree'),
            name: 'defaultTree',
            meta: { title: '标准树状图' }
          },
          {
            path: 'radialTree',
            component: () => import('@/views/echarts/tree/radialTree'),
            name: 'radialTree',
            meta: { title: '环形树状图' }
          }
        ]
      },
      {
        path: 'calendarIndex',
        name: 'calendarIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '日历图', icon: 'chart' },
        children: [
          {
            path: 'simple',
            component: () => import('@/views/echarts/calendar/simple'),
            name: 'simple',
            meta: { title: '简单日历图' }
          },
          {
            path: 'graph',
            component: () => import('@/views/echarts/calendar/graph'),
            name: 'graph',
            meta: { title: '曲线日历图' }
          },
          {
            path: 'dateCalendar',
            component: () => import('@/views/echarts/calendar/dateCalendar'),
            name: 'dateCalendar',
            meta: { title: '热力日历图' }
          },
          {
            path: 'pieCalendar',
            component: () => import('@/views/echarts/calendar/pieCalendar'),
            name: 'pieCalendar',
            meta: { title: '饼状日历图' }
          },
          {
            path: 'year',
            component: () => import('@/views/echarts/calendar/year'),
            name: 'year',
            meta: { title: '年份日历图' }
          }
        ]
      },

      {
        path: 'funnel',
        name: 'funnel',
        component: () => import('@/views/echarts/funnel'), // Parent
        meta: { title: '漏斗图', icon: 'chart' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/echarts/funnel'),
            name: 'funnel',
            meta: { title: '标准漏斗图' }
          },
          {
            path: 'more',
            component: () => import('@/views/echarts/funnel'),
            name: 'more',
            meta: { title: '多漏斗图' }
          }
        ]
      },
      {
        path: 'radar',
        name: 'radar',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '雷达图', icon: 'chart' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/echarts/radar'),
            name: 'radar',
            meta: { title: '标准雷达图' }
          },
          {
            path: 'fill',
            component: () => import('@/views/echarts/radar'),
            name: 'fill',
            meta: { title: '填充雷达图' }
          },
          {
            path: 'wormhole',
            component: () => import('@/views/echarts/radar'),
            name: 'wormhole',
            meta: { title: '虫洞雷达图' }
          }
        ]
      },
      {
        path: 'scatterIndex',
        name: 'scatterIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '散点图', icon: 'chart' },
        children: [
          {
            path: 'scatter',
            component: () => import('@/views/echarts/scatter/scatter'),
            name: 'scatter',
            meta: { title: '标准散点图' }
          },
          {
            path: 'scatter-process',
            component: () => import('@/views/echarts/scatter/scatter-process'),
            name: 'scatter-process',
            meta: { title: '坐标散点图' }
          }
        ]
      },
      {
        path: 'gaugeIndex',
        name: 'gaugeIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '仪表盘', icon: 'chart' },
        children: [
          {
            path: 'single-gauge',
            component: () => import('@/views/echarts/gauge/single-gauge'),
            name: 'single-gauge',
            meta: { title: '仪表盘' }
          },
          {
            path: 'multiple-gauge',
            component: () => import('@/views/echarts/gauge/multiple-gauge'),
            name: 'multiple-gauge',
            meta: { title: '多仪表盘' }
          }
        ]
      },
      {
        path: 'eventRiverIndex',
        name: 'eventRiverIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '河流图', icon: 'chart' },
        children: [
          {
            path: 'themeRiver',
            component: () => import('@/views/echarts/themeRiver'),
            name: 'themeRiver',
            meta: { title: '主题河流图' }
          },
          {
            path: 'eventRiver1',
            component: () => import('@/views/echarts/eventRiver'),
            name: 'eventRiver1',
            meta: { title: '事件河流图1' }
          },
          {
            path: 'eventRiver2',
            component: () => import('@/views/echarts/eventRiver'),
            name: 'eventRiver2',
            meta: { title: '事件河流图2' }
          }

        ]
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '中国地图', icon: 'chart' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/echarts/map'),
            name: 'map',
            meta: { title: '中国地图' }
          }
        ]
      },
      {
        path: 'line',
        name: 'line',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '折线图', icon: 'chart' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/echarts/line'),
            name: 'line',
            meta: { title: '折线图' }
          }
        ]
      },
      {
        path: 'synergyIndex',
        name: 'synergyIndex',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '桑基图', icon: 'chart' },
        children: [
          {
            path: 'sankey',
            component: () => import('@/views/echarts/sankey'),
            name: 'sankey',
            meta: { title: '桑基图' }
          }
        ]
      },
      {
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '合须图', icon: 'chart' },
        children: [
          {
            path: 'synergy',
            component: () => import('@/views/echarts/synergy'),
            name: 'synergy',
            meta: { title: '合须图' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

