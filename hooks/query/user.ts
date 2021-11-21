import { restClient } from '@/utils/axios'
import { getToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useQuery } from 'react-query'

interface UserResponse {
  id: number
  roles: Array<{ id: number; name: string }>
  photo: string
  name: string
  email: string
  phoneNumber: string
  kk: string
  gender: string,
  dateOfBirth: number
}

const getUser = async () => {
  const token = getToken()
  const res = await restClient.get<WebResponse<UserResponse>>('/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data.data
}

const useUser = () => {
  return useQuery('USER', getUser, {
    staleTime: 1 * 60 * 1000,
    retry: false,
		enabled: !!getToken()
  })
}

export default useUser
