import axios from 'axios'
// import { notification } from 'ant-design-vue'
import qs from 'qs'
import middleWare from './middleWare'
const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

// request 拦截器
http.interceptors.request.use(config => {
  if (config.method === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.resolve(error)
})
// response 拦截器
http.interceptors.response.use(
  middleWare.list.bind(middleWare),
  error => {
    console.log(error)
    return Promise.resolve(error)
  }
)
export default http
