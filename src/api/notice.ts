import request from '@/utils/request'

export const NoticeListApi = () => {
  return request({
    url: '/notice',
    method: 'get'
  })
}
