"use client"
import { apiClient } from '@/shared/utils/apiClient'
import { AuthLogin, AuthRegister } from './auth.types'

export const loginApi = (options: AuthLogin) => {
  return apiClient('POST', 'auth/login', options)
}

export const profileApi = () => {
  try {
    const res = apiClient('GET', 'auth/profile')
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const registerApi = (options: AuthRegister) => {
  try {
    const res = apiClient('POST', 'auth/register', options)
    return res
  } catch (error) {
    console.log('registerApi Register failed:', error)
    throw error
  }
}

export const logoutApi = () => {
  try {
    const res = apiClient('POST', 'auth/logout')
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}
