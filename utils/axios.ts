import axios from 'axios'

export const BACKEND_URL = 'http://localhost:8080'

export const restClient = axios.create({ baseURL: BACKEND_URL + '/api' })
