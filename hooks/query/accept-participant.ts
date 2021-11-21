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

const accept = async (participantId: number) => {
  const token = getToken()
  const res = await restClient.patch<WebResponse<ParticipantResponse>>(`/participant/${participantId}/accept`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useAcceptParticipant = () => {
  return useMutation('ACCEPT_PARTICIPANT', accept)
}

export default useAcceptParticipant
