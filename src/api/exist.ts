import request from '@/utils/request'

export const ExistDateApi = () => {
  return request({
    url: '/exist',
    method: 'get'
  })
}
