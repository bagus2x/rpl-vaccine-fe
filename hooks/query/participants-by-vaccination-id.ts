import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

export type Status = 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'WAITING'

export interface Participant {
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
  status: Status
  createdAt: number
  updatedAt: number
}

export type ParticipantsResponse = Array<Participant>

const getParticipantsByVaccinationId = (vaccinationId: number) => async () => {
  const token = getToken()
  const res = await restClient.get<WebResponse<ParticipantsResponse>>(`/participants/vaccination/${vaccinationId}?size=50`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data.data
}

const useParticipantsyVaccinationId = (vaccinationId?: number) => {
  return useQuery(['PARTICIPANTS_BY_VACCINATION_ID', vaccinationId], getParticipantsByVaccinationId(vaccinationId as number), {
    enabled: !!getToken() && !!vaccinationId
  })
}

export default useParticipantsyVaccinationId
