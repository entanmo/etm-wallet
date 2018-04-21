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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Login },
  // template: '<Login/>',
  render(h) {
    return h(this.pw?'app':'login')
  },
  data () {
    return {
      pw: ''
    }
  },
  created () {
    this.pw = sessionStorage.getItem('pw')
  }
})
