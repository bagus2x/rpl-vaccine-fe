import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation } from 'react-query'

const deleteArticle = async (articleId: number) => {
  const token = getToken()
  const res = await restClient.delete<WebResponse<number>>(`/article/${articleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useDeleteArticle = () => {
  return useMutation('DELETE_ARTICLE', deleteArticle)
}

export default useDeleteArticle
