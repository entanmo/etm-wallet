// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import i18n from '@/lang'
import App from './App'
import VueSocketIO from 'vue-socket.io'
import router from './router'
import Viser from 'viser-vue'
import './assets/css/reset.css'

import './components.js'
// qrcode
import VueQrcode from '@xkeshi/vue-qrcode'
import store from '@/store'
import './permission'
Vue.use(new VueSocketIO({
  debug: false,
  connection: process.env.BASE_API,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(Viser)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
