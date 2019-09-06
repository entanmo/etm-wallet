const getters = {
  accountInfo: state => state.user.accountInfo,
  secondSecret: state => state.user.secondSecret,
  secret: state => state.user.secret,
  lang: state => state.user.lang
}

export default getters
