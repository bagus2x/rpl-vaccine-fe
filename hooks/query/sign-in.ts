import { restClient } from '@/utils/axios'
import { saveToken } from '@/utils/jwt'
import WebResponse from '@/utils/web-response'
import { useMutation, useQueryClient } from 'react-query'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
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

const signIn = async (req: SignInRequest) => {
  const res = await restClient.post<WebResponse<SignInResponse>>('/user/signin', req)
  return res.data.data
}

export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation('SIGN_UP', signIn, {
    onSuccess: (res, _req, _ctx) => {
      saveToken(res.token)
      queryClient.setQueryData<SignInResponse['user']>('USER', res.user)
    }
  })
}
