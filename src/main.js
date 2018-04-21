// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './components/login'
import router from './router'
import { Table, TableColumn} from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
import './assets/css/reset.css'
Vue.config.productionTip = false
window.Bus = new Vue()
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   let pw = sessionStorage.getItem('pw')
//   // if( pw == null ) {
//   //   next('/login')
//   // }else {
//   //   next('/')
//   // }
//   next()
  
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Login },
  template: '<Login/>',
  data () {
    return {
      pw: ''
    }
  },
  created () {
    // this.pw = sessionStorage.getItem('pw')
    // if( this.pw == null || !this.pw ) {
    //   sessionStorage.setItem('pw', 'zzzzz')
    //   this.pw = sessionStorage.getItem('pw')
    //   console.log(this.pw)
    // }
  }
})
