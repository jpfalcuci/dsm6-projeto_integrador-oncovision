import axios from 'axios'
import { BASE_URL } from '@/constants/system'
import { LoginResponse } from '@/models'

export const UserService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  },

  register: async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    const response = await axios.post(
      `${BASE_URL}/register`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  },
}
