import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import { useMutation } from 'react-query'

interface RegisterParticipantRequest {
  userId: number
  vaccinationId: number
}

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

const RegisterParticipant = async (req: RegisterParticipantRequest) => {
  const token = getToken()
  const res = await restClient.post<ParticipantResponse>('/participant', req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

const useRegisterParticipant = () => {
  return useMutation('REGISTER_PARTICIPANT', RegisterParticipant)
}

export default useRegisterParticipant
