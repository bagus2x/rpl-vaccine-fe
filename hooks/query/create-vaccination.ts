import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import { useMutation } from 'react-query'

interface CreateVaccinationRequest {
  title: string
  vaccine: string
  description?: string
  picture?: string
  startDate: number
  lastDate: number
}

interface VaccinationResponse {
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

const createVaccination = async (req: CreateVaccinationRequest) => {
  const token = getToken()
  const res = await restClient.post<VaccinationResponse>('/vaccination', req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

const useCreateVaccination = () => {
  return useMutation('CREATE_VACCINATION', createVaccination)
}

export default useCreateVaccination
