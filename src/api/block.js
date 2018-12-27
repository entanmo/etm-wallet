import http from '../utils/axios'
/**
 * 查询最新块
 * @param {*} params
 */
export const blocks = (params) => {
  return http({
    url: '/api/blocks',
    method: 'get',
    params
  })
}
/**
 *根据块的参数查询块信息
 * @param {*} params
 */
export const searchBlock = (params) => {
  return http({
    url: '/api/blocks/get',
    method: 'get',
    params
  })
}
/**
 * 获取区块链高度
 */
export const getHighest = () => {
  return http({
    url: '/api/blocks/getHeight',
    method: 'get'
  })
}
/**
 * 根据公钥或者用户名获取受托人详情
 * @param {*} params
 */
export const getDelegate = (params) => {
  return http({
    url: '/api/delegates/get',
    method: 'get',
    params
  })
}
/**
 * 获取受托人列表
 * @param {*} params
 */
export const setDelegate = (params) => {
  return http({
    url: '/api/delegates',
    method: 'put',
    data: params
  })
}
/**
 * 创建交易
 * @param {*} params
 */
export const transactions = (params) => {
  return http({
    url: '/api/transactions',
    method: 'put',
    data: params
  })
}
