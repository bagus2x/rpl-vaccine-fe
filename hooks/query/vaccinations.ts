import { restClient } from '@/utils/axios'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

interface Vaccination {
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

export type VaccinationsResponse = Array<Vaccination>

export const getVaccinations = async () => {
  const res = await restClient.get<WebResponse<VaccinationsResponse>>('/vaccinations?size=20')
  return res.data.data
}

const useVaccinations = (initialData?: VaccinationsResponse) => {
  return useQuery('VACCINATIONS', getVaccinations, {
    initialData
  })
}

export default useVaccinations
