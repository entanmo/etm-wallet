import http from '../utils/axios'

export const blocksNum = (params) => {
  return http({
    url: '/list/block/count/day',
    method: 'post',
    data: params
  })
}
