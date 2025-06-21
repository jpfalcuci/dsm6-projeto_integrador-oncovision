import { BASE_URL } from '@/constants/system'
import axios, { AxiosRequestConfig } from 'axios'

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  return axios({ ...config, baseURL: BASE_URL, headers })
}
