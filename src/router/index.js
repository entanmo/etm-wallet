import Vue from 'vue'
import Router from 'vue-router'
const firstView = () => import('@/components/first-view')
const person = () => import('@/components/person')
const application = () => import('@/components/application')
const blockAppear = () => import('@/components/block-appear')
const blockScan = () => import('@/components/block-scan')
const vote = () => import('@/components/vote')
const transfer = () => import('@/components/transfer')
const node = () => import('@/components/node')
const applist = () => import('@/base/applist')
const download = () => import('@/base/download')
Vue.use(Router)

export default new Router({
  linkActiveClass: 'in',
  routes: [
    {
      path: '/',
      redirect: '/first-view'
    },
    {
      path: '/first-view',
      component: firstView
    },
    {
      path: '/person',
      component: person
    },
    {
      path: '/application',
      component: application,
      redirect: '/application/applist',
      children: [
        {
          path: 'applist',
          component: applist
        },
        {
          path: 'download',
          component: download
        }
      ]
    },
    {
      path: '/block-appear',
      component: blockAppear
    },
    {
      path: '/block-scan',
      component: blockScan
    },
    {
      path: '/vote',
      component: vote
    },
    {
      path: '/transfer',
      component: transfer
    },
    {
      path: '/node',
      component: node
    },
  ]
})
