import router from './router'
import store from './store'
import NProgress from 'nprogress'
import Storage from '@/utils/storage'
import 'nprogress/nprogress.css'
let storage = new Storage()

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = storage.getItem('etmUse', false) || storage.getItem('etmUse', true)
  if (token) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      if (!store.getters.secret) {
        try {
          const result = await store.dispatch('GetInfo')
          if (result && result.data.success) {
            next()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
