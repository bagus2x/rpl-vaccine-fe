import axios, { AxiosError } from 'axios'

interface WebResponse<T> {
  code: number
  status: string
  data: T
}

export const isWebResponse = (error: any): error is AxiosError<WebResponse<string>> => {
  if (!error) return false
  if (axios.isAxiosError(error)) {
    if(!error.response) return false
    if (error.response?.data) {
      if (error.response.data) return true
    }
  }

  return false
}

export default WebResponse
