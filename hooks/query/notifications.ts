import { restClient } from '@/utils/axios'
import { getToken, isUserAuthenticated } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

interface Notification {
  id: number
  picture?: string
  receiver: {
    id: number
    photo: string
    name: string
  }
  title: string
  content?: string
  status: string
  createdAt: Date
}

export type NotificationsResponse = Array<Notification>

export const getNotifications = async () => {
  const token = getToken()
  const res = await restClient.get<WebResponse<NotificationsResponse>>('/notifications?size=25', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useNotifications = () => {
  return useQuery('NOTIFICATIONS', getNotifications, {
    enabled: isUserAuthenticated()
  })
}

export default useNotifications
