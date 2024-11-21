import { apiClient } from '@/shared/utils/apiClient'
import { AuthLogin } from './auth.types'

export const loginApi = async (options: AuthLogin) => {
  try {
    const res = await apiClient('POST', 'auth/login', options)
    if (res?.error) {
      if (res?.error?.status === 401) {
        alert('chưa đăng nhập nha!')
      }
    }
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const profileApi = async () => {
  try {
    const res = await apiClient('GET', 'auth/profile')
   
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}
