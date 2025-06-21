import { AxiosRequestConfig } from 'axios'
import * as accessToken from '@/hooks/useLocalStorage'
import { requestBackend } from './requests'
import { PredictData } from '@/models'

export const AppServices = {
  getHistory: async () => {
    const { token, user } = getAccessToken()
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/history/${user}?hash=${token}`,
      signal: AbortSignal.timeout(5000),
    }

    return requestBackend(config)
  },

  getPrediction: async (data: PredictData) => {
    const { token, user } = getAccessToken()
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `/predict`,
      data: {
        username: user,
        hash: token,
        data,
      },
      signal: AbortSignal.timeout(5000),
    }

    return requestBackend(config)
  },
}

export const getAccessToken = () => {
  const token = accessToken.getToken()
  const user = accessToken.getUser()

  return { token, user }
}
