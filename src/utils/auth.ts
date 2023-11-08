import Cookies from 'js-cookie'

// 设置token
export const setToken = (token: string): void => {
  Cookies.set('Authorization', token)
}

// 获取token
export const getToken = (): string | undefined => {
  return Cookies.get('Authorization')
}

// 清除token
export const removeToken = (): void => {
  Cookies.remove('Authorization')
}
