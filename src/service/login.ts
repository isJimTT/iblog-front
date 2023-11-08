import request from '@/utils/request'

export const LoginApi = (data: string) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const RegisterApi = (data: string) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}
