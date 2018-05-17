import Vue from 'vue'
import Router from 'vue-router'
const firstView = (resolve) => {
  import('@/components/first-view').then((module) => {
    resolve(module)
  })
}
const person = (resolve) => {
  import('@/components/person').then((module) => {
    resolve(module)
  })
}
const application = (resolve) => {
  import('@/components/application').then((module) => {
    resolve(module)
  })
}
const blockAppear = (resolve) => {
  import('@/components/block-appear').then((module) => {
    resolve(module)
  })
}
const blockScan = (resolve) => {
  import('@/components/block-scan').then((module) => {
    resolve(module)
  })
}
const vote = (resolve) => {
  import('@/components/vote').then((module) => {
    resolve(module)
  })
}
const transfer = (resolve) => {
  import('@/components/transfer').then((module) => {
    resolve(module)
  })
}
const node = (resolve) => {
  import('@/components/node').then((module) => {
    resolve(module)
  })
}
const applist = (resolve) => {
  import('@/base/application/applist').then((module) => {
    resolve(module)
  })
}
const download = (resolve) => {
  import('@/base/application/download').then((module) => {
    resolve(module)
  })
}
const account = (resolve) => {
  import('@/base/person/account').then((module) => {
    resolve(module)
  })
}
const secondpassword = (resolve) => {
  import('@/base/person/second-password').then((module) => {
    resolve(module)
  })
}
const lockup = (resolve) => {
  import('@/base/person/lock-up').then((module) => {
    resolve(module)
  })
}
const trusteelist = (resolve) => {
  import('@/base/vote/trustee-list').then((module) => {
    resolve(module)
  })
}
const record = (resolve) => {
  import('@/base/vote/record').then((module) => {
    resolve(module)
  })
}
const voteforme = (resolve) => {
  import('@/base/vote/vote-for-me').then((module) => {
    resolve(module)
  })
}
const login = (resolve) => {
  import('@/components/login').then((module) => {
    resolve(module)
  })
}
// 2018/5/15
const selectMiners = (resolve) => {
  import('@/components/select-miners').then((module) => {
    resolve(module)
  })
}
const minersList = (resolve) => {
  import('@/components/miners-list').then((module) => {
    resolve(module)
  })
}
const formalMiners = (resolve) => {
  import('@/base/scv-miner/formal-miners').then((module) => {
    resolve(module)
  })
}
const candidateMiners = (resolve) => {
  import('@/base/scv-miner/candidate-miners').then((module) => {
    resolve(module)
  })
}
const remainingMiners = (resolve) => {
  import('@/base/scv-miner/remaining-miners').then((module) => {
    resolve(module)
  })
}
const selectedMiners = (resolve) => {
  import('@/components/selected-miners').then((module) => {
    resolve(module)
  })
}

const minerDetail = (resolve) => {
  import('@/components/miner-detail').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

const router = new Router({
  linkActiveClass: 'in',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/first-view'
    },
    {
      path: '/login',
      component: login
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
          component: trusteelist,
          name: 'trusteelist'
        },
        {
          path: 'record',
          component: record,
          name: 'record'
        },
        {
          path: 'vote-for-me',
          component: voteforme,
          name: 'voteforme'
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
    {
      path: '/select-miners',
      component: selectMiners,
      children: [
        {
          path: ':id',
          component: minerDetail,
          name: 'minerDetail'
        }
      ]
    },
    {
      path: '/miners-list',
      component: minersList,
      redirect: '/miners-list/formal-miners',
      children: [
        {
          path: 'formal-miners',
          component: formalMiners,
          name: 'formalMiners'
        },
        {
          path: 'candidate-miners',
          component: candidateMiners,
          name: 'candidateMiners'   
        },
        {
          path: 'remaining-miners',
          component: remainingMiners,
          name: 'remainingMiners'          
        },
        {
          path: ':id',
          component: minerDetail,
          name: 'minerDetail'
        },
      ]

    },
    {
      path: '/selected-miners',
      component: selectedMiners,
      children: [
        {
          path: ':id',
          component: minerDetail,
          name: 'minerDetail'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('etmsecret') || 
      sessionStorage.getItem('etmsecret')
    ) {
      next()
    }else {
      if(to.path === '/login') {
        next()
      }else {
        next({ path: '/login' })
      }
    }
  
})

export default router

