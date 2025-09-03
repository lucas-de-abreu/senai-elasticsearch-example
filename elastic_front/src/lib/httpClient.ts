import axios from 'axios'
import type { AxiosInstance } from 'axios'

export default function HttpClient(): AxiosInstance {
  const httpClient = axios.create({})

  httpClient.interceptors.request.use(async (config) => {
    config.baseURL = 'http://localhost:9200/'

    return config
  })

  return httpClient
}
