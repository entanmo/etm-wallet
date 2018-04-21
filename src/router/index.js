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
const applist = () => import('@/base/application/applist')
const download = () => import('@/base/application/download')
const account = () => import('@/base/person/account')
const secondpassword = () => import('@/base/person/second-password')
const lockup = () => import('@/base/person/lock-up')
const trusteelist = () => import('@/base/vote/trustee-list')
const record = () => import('@/base/vote/record')
const voteforme = () => import('@/base/vote/vote-for-me')
Vue.use(Router)

export default new Router({
  linkActiveClass: 'in',
  mode: 'history',
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
      component: person,
      redirect: '/person/account',
      children: [
        {
          path: 'account',
          component: account
        },
        {
          path: 'second-password',
          component: secondpassword
        },
        {
          path: 'lock-up',
          component: lockup
        }
      ]
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
      component: vote,
      redirect: '/vote/trustee-list',
      children: [
        {
          path: 'trustee-list',
          component: trusteelist
        },
        {
          path: 'record',
          component: record
        },
        {
          path: 'vote-for-me',
          component: voteforme
        }
      ]
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
