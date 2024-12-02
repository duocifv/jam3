'use client'
import { client } from '@/utils/apiClient'
import { AuthLogin, AuthRegister } from './auth.types'

export const loginApi = (options: AuthLogin) => {
  return client.post('auth/login', { options })
}

export const profileApi = () => {
  try {
    const res = client.get('auth/profile')
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const registerApi = (options: AuthRegister) => {
  try {
    const res = client.post('auth/register', { options })
    return res
  } catch (error) {
    console.log('registerApi Register failed:', error)
    throw error
  }
}

export const logoutApi = () => {
  try {
    const res = client.post('auth/logout')
    return res
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const refreshToken = async () => {
  try {
    const res = await client.post('auth/refresh', {
      headers: { credentials: 'include' },
    })
    if (!res) return await res
  } catch (error) {
    console.error('Lỗi làm mới Access Token', error)
  }
}
