import { apiClient } from '@/shared/utils/apiClient'
import { AuthLogin, AuthRegister } from './auth.types'

export const loginApi = async (options: AuthLogin) => {
  try {
    const res = await apiClient('POST', 'auth/login', options)
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

export const registerApi = async (options: AuthRegister) => {
  try {
    const res = await apiClient('POST', 'auth/register', options)
    return res
  } catch (error) {
    console.log('registerApi Register failed:', error)
    throw error 
  }
}

export const logoutApi = async () => {
  try {
    const res = await apiClient('POST', 'auth/logout')
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}
