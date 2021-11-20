import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

export interface VaccionationResponse {
  id: number
  title: string
  vaccine: string
  description: string | null
  picture: string | null
  startDate: number
  lastDate: number
  numberOfParticipants: number
  createdAt: number
  updatedAt: number
}

export const getVaccionationById = (vaccinationId: number) => async () => {
  const res = await restClient.get<WebResponse<VaccionationResponse>>(`/vaccination/${vaccinationId}`)

  return res.data.data
}

const useVaccionationById = (vaccinationId?: number) => {
  return useQuery('VACCINATION', getVaccionationById(vaccinationId as number), {
    enabled: !!vaccinationId
  })
}

export default useVaccionationById
