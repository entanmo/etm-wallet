import http from '../utils/axios2'

export const blockDay = (params) => {
  return http({
    url: '/extend/block/count/day',
    method: 'post',
    data: params
  })
}
export const incomeDay = (params) => {
  return http({
    url: '/extend/votes/count/day',
    method: 'post',
    data: params
  })
}
export const incomeSum = (params) => {
  return http({
    url: '/extend/income/sum',
    method: 'post',
    data: params
  })
}
export const incomeTop = (params) => {
  return http({
    url: '/extend/income/count/top',
    method: 'post',
    data: params
  })
}
export const votesTop = (params) => {
  return http({
    url: '/extend/votes/count/top',
    method: 'post',
    data: params
  })
}
export const votesAdd = (params) => {
  return http({
    url: '/extend/votes/add',
    method: 'post',
    data: params
  })
}
