import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
    title: '',
    needsSecondSecret: null
}

const mutations = {
    changeTitle(state,payload) {
        state.title = payload
    },
    changeNeedsSecondSecret(state, payload) {
        state.needsSecondSecret = payload
    }
}

export default new vuex.Store({
    state,
    mutations
})