import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation } from 'react-query'

const deleteVaccination = async (vaccinationId: number) => {
  const token = getToken()
  const res = await restClient.delete<WebResponse<number>>(`/vaccination/${vaccinationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

const useDeleteVaccination = () => {
  return useMutation('DELETE_VACCINATION', deleteVaccination)
}

export default useDeleteVaccination
