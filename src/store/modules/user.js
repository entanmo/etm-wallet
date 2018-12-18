import {login, getAccount, getBalance} from '@/api/account'
import {genPublicKey} from '@/utils/gen'

const user = {
  state: {
    accountInfo: {}, // 用户信息
    secret: '',
    lang: '',
    isMobile: false
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.accountInfo = {...info}
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    SET_SECONDSECRET: (state, secondSecret) => {
      state.accountInfo.secondSignature = secondSecret
    },
    SET_BALANCE: (state, balance) => {
      state.accountInfo.balance = balance
    },
    SET_HEIGHT: (state, height) => {
      state.accountInfo.height = height
    },
    LOGIN_OUT: (state) => {
      state.accountInfo = {}
    },
    SET_DEVICE: (state, isMobile) => {
      state.isMobile = isMobile
    }
  },
  actions: {
    async login ({commit}, password) {
      const key = genPublicKey(password)
      const result = await login(key)
      return result
    },
    async loginOut ({commit}) {
      commit('LOGIN_OUT', {})
      commit('SET_SECRET', '')
      commit('SET_SECONDSECRET', '')
      sessionStorage.removeItem('etmUse')
      localStorage.removeItem('etmUse')
      sessionStorage.removeItem('localeLanguage')
    },
    async GetInfo ({commit}) {
      const informations = sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')
      const address = JSON.parse(informations).account.address
      const secret = JSON.parse(informations).account.secret
      const publicKey = genPublicKey(secret)
      const result = await getAccount(address)
      if (result.data.success) {
        let info = {...result.data.account, ...result.data.latestBlock, ...result.data.version}
        info.publicKey = publicKey
        commit('SET_INFO', info)
        commit('SET_SECRET', secret)
      }
      return result
    },
    async _getInfo ({commit}) {
      try {
        const informations = sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')
        const address = JSON.parse(informations).account.address
        const result = await getAccount(address)
        if (result.data.success) {
          const balance = result.data.account.balance
          const height = result.data.latestBlock.height
          commit('SET_BALANCE', balance)
          commit('SET_HEIGHT', height)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async _getBalance ({commit}) {
      try {
        console.log(this.state.user.accountInfo)
        const params = {address: this.state.user.accountInfo.address}
        const result = await getBalance(params)
        console.log(result)
        if (result.data.success) {
          const balance = result.data.balance
          commit('SET_BALANCE', balance)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
export default user
