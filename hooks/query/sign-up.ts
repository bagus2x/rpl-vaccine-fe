import { restClient } from '@/utils/axios'
import { saveToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation, useQueryClient } from 'react-query'

interface SignUpRequest {
  name: string
  email: string
  password: string
  gender: string
  dateOfBirth: number
}

interface SignUpResponse {
  token: string
  user: {
    id: number
    roles: Array<{ id: number; name: string }>
    photo: string
    name: string
    email: string
    phoneNumber: string
    kk: string
    dateOfBirth: number
  }
}

const signUp = async (req: SignUpRequest) => {
  const res = await restClient.post<WebResponse<SignUpResponse>>('/user/signup', req)
  return res.data.data
}

const useSignUp = () => {
  const queryClient = useQueryClient()

  return useMutation('SIGN_UP', signUp, {
    onSuccess: (res, _req, _ctx) => {
      saveToken(res.token)
      queryClient.setQueryData<SignUpResponse['user']>('USER', res.user)
    }
  })
}

export default useSignUp
