import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

export interface ArticleResponse {
  id: number
  picture: string | null
  author: {
    id: number
    photo: string | null
    name: string
  }
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

export const getArticleById = (articleId: number) => async () => {
  const res = await restClient.get<WebResponse<ArticleResponse>>(`/article/${articleId}`)

  return res.data.data
}

const useArticleById = (articleId?: number) => {
  return useQuery('ARTICLE', getArticleById(articleId as number), {
    enabled: !!articleId
  })
}

export default useArticleById
