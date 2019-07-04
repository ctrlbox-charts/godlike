import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
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
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
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
            component: () => import('@/views/echarts/bar'),
            name: 'bar',
            meta: { title: '标准柱状图' }
          },
          {
            path: 'pubu',
            component: () => import('@/views/echarts/pubu'),
            name: 'pubu',
            meta: { title: '组成瀑布图' }
          },
          {
            path: 'pubuChange',
            component: () => import('@/views/echarts/pubuChange'),
            name: 'pubuChange',
            meta: { title: '阶梯瀑布图' }
          },
          {
            path: 'zhengfuBar',
            component: () => import('@/views/echarts/zhengfuBar'),
            name: 'zhengfuBar',
            meta: { title: '正负柱状图' }
          },
          {
            path: 'mixBar',
            component: () => import('@/views/echarts/mixBar'),
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
            path: 'line',
            component: () => import('@/views/echarts/line'),
            name: 'line',
            meta: { title: '标准折线图' }
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
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '散点图', icon: 'chart' },
        children: [
          {
            path: 'scatter',
            component: () => import('@/views/echarts/scatter'),
            name: 'scatter',
            meta: { title: '标准散点图' }
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
      },
      {
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '主题河流图', icon: 'chart' },
        children: [
          {
            path: 'themeRiver',
            component: () => import('@/views/echarts/themeRiver'),
            name: 'themeRiver',
            meta: { title: '主题河流图' }
          }
        ]
      },
      {
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '事件河流图', icon: 'chart' },
        children: [
          {
            path: 'eventRiver',
            component: () => import('@/views/echarts/eventRiver'),
            name: 'eventRiver',
            meta: { title: '事件河流图' }
          }
        ]
      },
      {
        path: 'index',
        name: 'echarts',
        component: () => import('@/views/echarts/index'), // Parent
        meta: { title: '仪表盘', icon: 'gauge' },
        children: [
          {
            path: 'gauge',
            component: () => import('@/views/echarts/gauge'),
            name: 'gauge',
            meta: { title: '仪表盘' }
          }
        ]
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
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

