import request from '@/utils/request'

interface IArticleListQuery {
  category?: string
  page?: number
  pageSize?: number
}

export const GetArticleListApi = (params: IArticleListQuery = {}) => {
  return request({
    url: '/article',
    method: 'get',
    params: {
      category: params.category,
      page: params.page,
      pageSize: params.pageSize
    }
  })
}

export const GetArticleInfoApi = (articleId?: string) => {
  return request({
    url: '/article/detail/' + articleId,
    method: 'get'
  })
}

export const GetClassListApi = () => {
  return request({
    url: '/article/class',
    method: 'get'
  })
}
