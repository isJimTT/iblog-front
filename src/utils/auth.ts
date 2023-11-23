// 设置token
export const setToken = (token: string): void => {
  localStorage.setItem('Authorization', token)
}

// 获取token
export const getToken = (): string | null => {
  return localStorage.getItem('Authorization')
}

// 清除token
export const removeToken = (): void => {
  localStorage.removeItem('Authorization')
}
