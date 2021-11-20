import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation } from 'react-query'

interface CreateArticleRequest {
  picture?: string
  authorId: number
  title: string
  content: string
}

interface ArticleResponse {
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

const createArticle = async (req: CreateArticleRequest) => {
  const token = getToken()
  const res = await restClient.post<WebResponse<ArticleResponse>>('/article', req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useCreateArticle = () => {
  return useMutation('CREATE_ARTICLE', createArticle)
}

export default useCreateArticle
