import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
    title: '',
    needsSecondSecret: null,
    sortAs: true,
    sortBy: 0
}

const mutations = {
    changeTitle(state,payload) {
        state.title = payload
    },
    changeNeedsSecondSecret(state, payload) {
        state.needsSecondSecret = payload
    },
    reverseSort(state, payload) {
        state.sortAs = payload
    },
    changeSort(state, payload) {
        state.sortBy = payload
    }
}

export default new vuex.Store({
    state,
    mutations
})