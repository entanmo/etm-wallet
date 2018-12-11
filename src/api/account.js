import http from '../utils/axios'

export const login = (key) => {
  const data = {publicKey: key}
  return http({
    url: '/api/accounts/open2',
    method: 'post',
    data: data
  })
}

export const getAccount = (address) => {
  return http({
    url: '/api/accounts',
    method: 'get',
    params: {address}
  })
}
// 受托人列表
export const getVoteLists = (params) => {
  return http({
    url: '/api/delegates',
    method: 'get',
    params
  })
}
// 根据地址获取其投票列表
export const getRecord = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'get',
    params
  })
}
// 投票
export const submitVoter = (params) => {
  return http({
    url: '/api/accounts/delegates',
    method: 'put',
    data: params
  })
}
export const voteForMe = (params) => {
  return http({
    url: '/api/delegates/voters',
    method: 'get',
    params
  })
}
export const getTransaction = (params) => {
  return http({
    url: '/api/transactions',
    method: 'get',
    params
  })
}

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
