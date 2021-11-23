import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation } from 'react-query'

interface SendNotificationRequest {
  picture?: string
  receiverId: number
  title: string
  content?: string
  email: boolean
}

interface NotificationResponse {
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

const sendNotification = async (req: SendNotificationRequest) => {
  const token = getToken()
  const res = await restClient.post<WebResponse<NotificationResponse>>('/notification', req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useSendNotification = () => {
  return useMutation('SEND_NOTIFICATION', sendNotification)
}

export default useSendNotification
