import request from '@/utils/request'

export const GetArticleListApi = () => {
  return request({
    url: '/article',
    method: 'get'
  })
}

export const GetArticleInfoApi = (articleId?: string) => {
  return request({
    url: '/article/detail/' + articleId,
    method: 'get'
  })
}
