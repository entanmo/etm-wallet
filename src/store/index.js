import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
    address: ''
}

const mutations = {
    setAddress(state,payload) {
        state.address = payload
    }
}

export default new vuex.Store({
    state,
    mutations
})