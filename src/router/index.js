import Vue from 'vue'
import Router from 'vue-router'
// import i18n from '@/lang'
import Home from '@/views/home/home'

Vue.use(Router)
export default new Router({
  linkActiveClass: 'ant-menu-item-selected',
  routes: [
    {
      path: '/404',
      component: () => import('@/views/404')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login')
    }, {
      path: '/',
      component: Home,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'first-view',
          component: () => import('@/views/first-view/first-view'),
          meta: {title: 'home'}
        }
      ]
    },
    {
      path: '/person',
      component: Home,
      redirect: '/person',
      children: [
        {
          path: '',
          name: 'Person',
          component: () => import('@/views/person/person'),
          meta: {title: 'person'}
        }
      ]

    }, {
      path: '/application',
      component: Home,
      redirect: '/application',
      children: [
        {
          path: '',
          name: 'Application',
          component: () => import('@/views/application/application'),
          meta: {title: 'app'}
        }
      ]

    }, {
      path: '/block-production',
      component: Home,
      redirect: '/block-production',
      children: [
        {
          path: '',
          name: 'BlockProduction',
          component: () => import('@/views/block-production/block-production'),
          meta: {title: 'block_production'}
        }
      ]

    }, {
      path: '/block-scan',
      component: Home,
      redirect: '/block-scan',
      children: [
        {
          path: '',
          name: 'BlockScan',
          component: () => import('@/views/block-scan/block-scan'),
          meta: {title: 'block_scan'}
        }
      ]

    }, {
      path: '/vote',
      component: Home,
      redirect: '/vote',
      children: [
        {
          path: '',
          name: 'Vote',
          component: () => import('@/views/vote/vote'),
          meta: {title: 'vote'}
        }
      ]

    }, {
      path: '/transfer',
      component: Home,
      redirect: '/transfer',
      children: [
        {
          path: '',
          name: 'Transfer',
          component: () => import('@/views/transfer/transfer'),
          meta: {title: 'transfer'}
        }
      ]

    }, {
      path: '/miners-list',
      component: Home,
      redirect: '/miners-list',
      children: [
        {
          path: '',
          name: 'MinersList',
          component: () => import('@/views/miners-list/miners-list'),
          meta: {title: 'SCV矿工列表'}
        }
      ]

    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
