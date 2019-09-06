import http from '../utils/axios'
/**
 * 登录
 * @param {公钥} key
 */
export const login = (key) => {
  const data = {publicKey: key}
  return http({
    url: '/api/accounts/open2',
    method: 'post',
    data: data
  })
}
/**
 *获取用户信息
 * @param {地址} address
 */
export const getAccount = (address) => {
  return http({
    url: '/api/accounts',
    method: 'get',
    params: {address}
  })
}
/**
 * 矿工列表
 * @param {*} params
 */
export const getVoteLists = (params) => {
  return http({
    url: '/api/delegates',
    method: 'get',
    params
  })
}
/**
 * 矿工总数
 */
export const numVoteAll = () => {
  return http({
    url: '/api/delegates/count',
    method: 'get'
  })
}
/**
 * 根据地址获取其投票列表
 * @param {*} params
 */
export const getRecord = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'get',
    params
  })
}
/**
 * 投票
 * @param {*} params
 */
export const submitVoter = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'put',
    data: params
  })
}
/**
 * 谁投给了我
 * @param {*} params
 */
export const voteForMe = (params) => {
  return http({
    url: '/api/delegates/voters',
    method: 'get',
    params
  })
}
/**
 * 获取交易列表
 * @param {*} params
 */
export const getTransaction = (params) => {
  return http({
    url: '/api/transactions',
    method: 'get',
    params
  })
}
/**
 * 设置二级密码
 * @param {助计词} secret
 * @param {*二级密码} secondSecret
 */
export const setSecondSecret = (secret, secondSecret) => {
  const data = {secret: secret, secondSecret: secondSecret}
  return http({
    url: '/api/signatures',
    method: 'put',
    data: data
  })
}

/**
 * 锁仓
 */
export const lockVote = (params) => {
  return http({
    url: '/api/lockvote',
    method: 'put',
    data: params
  })
}

/**
 * 解锁
 */
export const lockRemove = (params) => {
  return http({
    url: '/api/lockvote/remove',
    method: 'put',
    data: params
  })
}
/**
 * 获取所有锁仓交易信息
 */
export const allLock = (params) => {
  return http({
    url: '/api/lockvote/all',
    method: 'get',
    params
  })
}

/**
 *是否为有效账户
*/
export const effectAccount = (params) => {
  return http({
    url: '/api/accounts/effectivity',
    method: 'get',
    params
  })
}
/**
 * 获取余额
 * @param {*} params
 */
export const getBalance = (params) => {
  return http({
    url: '/api/accounts/getBalance',
    method: 'get',
    params
  })
}

/**
 *获取延迟到账账单信息
 * @param {*} params
 */
export const delayOrders = (params) => {
  return http({
    url: '/api/accounts/delayOrders',
    method: 'get',
    params
  })
}
/**
 * 注册正式矿工
 * @param {*} params
 */
export const setDelegate = (params) => {
  return http({
    url: '/api/delegates',
    method: 'put',
    data: params
  })
}

export const cancelDelegate = (params) => {
  return http({
    url: '/api/delegates/undelegate',
    method: 'put',
    data: params
  })
}
