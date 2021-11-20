import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation } from 'react-query'

interface ParticipantResponse {
  id: number
  user: {
    id: number
    photo?: string
    name: string
  }
  vaccination: {
    id: number
    title: string
    vaccine: string
    description?: string
    picture?: string
    startDate: number
    lastDate: number
  }
  status: string
  createdAt: number
  updatedAt: number
}

const cancel = async (participantId: number) => {
  const token = getToken()
  const res = await restClient.patch<WebResponse<ParticipantResponse>>(`/participant/${participantId}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useCancelParticipant = () => {
  return useMutation('CANCEL_PARTICIPANT', cancel)
}

export default useCancelParticipant
