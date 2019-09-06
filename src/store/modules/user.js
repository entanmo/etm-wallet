import {login, getAccount, getBalance, effectAccount} from '@/api/account'
import {genPublicKey} from '@/utils/gen'
import {Decrypt} from '@/utils/aes'
import Storage from '@/utils/storage'
let storage = new Storage()
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
      storage.removeItem('etmUse')
      storage.removeItem('etmUse', true)
      sessionStorage.removeItem('localeLanguage')
    },
    async GetInfo ({commit}) {
      try {
        const informations = storage.getItem('etmUse') || storage.getItem('etmUse', true)
        const address = informations.account.address
        const secret = Decrypt(informations.account.secret)
        const publicKey = genPublicKey(secret)
        const result = await getAccount(address)
        if (result && result.data.success) {
          let info = {...result.data.account, ...result.data.latestBlock, ...result.data.version}
          info.publicKey = publicKey
          commit('SET_INFO', info)
          commit('SET_SECRET', secret)
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },
    async _getInfo ({commit}) {
      try {
        const informations = storage.getItem('etmUse') || storage.getItem('etmUse')
        const address = informations.account.address
        const result = await getAccount(address)
        if (result && result.data.success) {
          const balance = result.data.account.balance
          const height = result.data.latestBlock.height
          commit('SET_BALANCE', balance)
          commit('SET_HEIGHT', height)
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 获取余额
     */
    async _getBalance ({commit}) {
      try {
        const params = {address: this.state.user.accountInfo.address}
        const result = await getBalance(params)
        if (result && result.data.success) {
          const balance = result.data.balance
          commit('SET_BALANCE', balance)
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 有效用户
     */
    _effectAccount () {
      const params = {address: this.state.user.accountInfo.address}
      return effectAccount(params)
    }
  }
}
export default user
