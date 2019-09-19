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
export const loginDapp = (data) => {
  return http({
    url: `http://192.168.2.8:8080/wx/auth/login_by_wallet`,
    method: 'post',
    data
  })
}
