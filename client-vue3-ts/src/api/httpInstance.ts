import { Notify } from 'vant'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { REQUEST_SUCCESS } from '@/config/constant'

// 实例化请求
const http = axios.create({
  timeout: 20000,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
  // baseURL: VUE_APP_CONTEXT
})

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对错误进行统一处理
    if (response.data.code !== REQUEST_SUCCESS) {
      if (response.data.msg) {
        Notify({ type: 'danger', message: response.data.msg })
      }
      return Promise.reject(response)
    }
    return Promise.resolve({
      code: response.data.code,
      msg: response.data.msg,
      data: response.data.data
    })
  },
  (error: AxiosError) => {
    switch (error?.response?.status) {
      case 401:
        Notify({ type: 'danger', message: '暂无权限访问，请先登录!' })
        break
      case 403:
        Notify({ type: 'danger', message: '登录过期，请重新登录!' })
        break
      case 404:
        Notify({ type: 'danger', message: '访问资源不存在!' })
        break
      case 500:
        Notify({ type: 'danger', message: '服务器内部错误!' })
        break
      default:
        if (Object.prototype.toString.call(error?.response?.data) === '[object Object]') {
          Notify({ type: 'danger', message: error?.response?.data })
        }
    }
    return Promise.reject(error)
  }
)

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'get') {
      config.params = { ...config.params, _t: Date.now() }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default http
