// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Login from './components/login'
import router from './router'
import axios from 'axios'
import store from './store'
import { Table, TableColumn} from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
// qrcode
import VueQrcode from '@xkeshi/vue-qrcode'
Vue.component('qrcode', VueQrcode)

import './assets/css/reset.css'
import './assets/css/public.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

window.Bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, Login },
  // template: '<App/>',
  render(h) {
    return h(this.etmaddress ? 'app' : 'login')
  },
  data () {
    return {
      pw: ''
    }
  },
  created () {
    this.etmaddress = localStorage.getItem('etmaddress')
  }
})
