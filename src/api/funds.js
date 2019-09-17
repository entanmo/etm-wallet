import http from '@/utils/axios'

export const issuers = (params) => {
  return http({
    url: '/api/uia/issuers',
    method: 'get',
    params
  })
}

export const assets = (params) => {
  return http({
    url: '/api/uia/assets',
    method: 'get',
    params
  })
}

export const getDappBanlance = (address) => {
  return http({
    url: `/api/uia/balances/${address}`,
    method: 'get'
  })
}
