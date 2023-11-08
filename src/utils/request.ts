import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig } from 'axios'
import { getToken } from './auth'
import { message } from 'antd'

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 6000
})

// 请求前拦截
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const Authorization = getToken() || ''
  if (config && config.headers && Authorization) {
    config.headers.Authorization = Authorization
  }
  return config
})

const request = async (config: AxiosRequestConfig) => {
  try {
    const response = await service.request(config)
    return response.data
  } catch (err: any) {
    if (!window.navigator.onLine) {
      errorInfoRet('请检查网络连接')
    }
    return {
      code: -1,
      msg: 'error',
      data: null as any
    }
  }
}

const errorInfoRet = (msg: string) => {
  message.error(msg)
  return {
    code: -1,
    msg,
    data: null as any
  }
}
export default request
