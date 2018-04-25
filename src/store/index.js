import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
    title: ''
}

const mutations = {
    changeTitle(state,payload) {
        state.title = payload
    }
}

export default new vuex.Store({
    state,
    mutations
})