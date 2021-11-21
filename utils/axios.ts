import axios from 'axios'

export const BACKEND_URL = 'http://localhost:8080'

export const restClient = axios.create({ baseURL: BACKEND_URL + '/api' })

export const CLOUD_NAME = 'dzj27omy0'

// export const CLOUDINARY = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
export const CLOUDINARY = `https://api.cloudinary.com/v1_1/`

export const cloudinaryUpload = axios.create({ baseURL: CLOUDINARY + `/${CLOUD_NAME}` })
