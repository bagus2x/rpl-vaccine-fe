import { restClient } from '@/utils/axios'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

interface Article {
  id: number
  picture?: string
  author: {
    id: number
    photo?: string
    name: string
  }
  title: string
  content: string
	createdAt: number
	updatedAt: number
}

export type ArticlesResponse = Array<Article>

export const getArticles = async () => {
  const res = await restClient.get<WebResponse<ArticlesResponse>>('/articles?size=25')
  return res.data.data
}

const useArticles = () => {
  return useQuery('ARTICLES', getArticles)
}

export default useArticles
