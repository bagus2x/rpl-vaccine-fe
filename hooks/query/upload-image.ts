import { cloudinaryUpload } from '@/utils/axios'
import { useMutation } from 'react-query'

interface UploadImageRequest {
  folder: string
  file: File
}

interface UploadImageResponse {
  secure_url: string
}

const uploadImage = async (req: UploadImageRequest) => {
  const formData = new FormData()
  formData.append('upload_preset', req.folder)
  formData.append('file', req.file)

  const res = await cloudinaryUpload.post<UploadImageResponse>('/image/upload', formData)
  return res.data.secure_url
}

const useUploadImage = () => {
  return useMutation('UPLOAD_IMAGE', uploadImage)
}

export default useUploadImage
