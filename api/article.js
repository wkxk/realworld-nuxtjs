import { request } from '@/plugins/request'

// 获取公共文章列表
export const getAticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取标签列表
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}

// 获取关注用户文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 文章点赞
export const favoriteArticle = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 文章取消点赞
export const unfavoriteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 查询文章
export const getArticleBySlug = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}