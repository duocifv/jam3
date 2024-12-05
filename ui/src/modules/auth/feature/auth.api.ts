'use client'
import { client } from '@/utils/apiClient'
import { AuthForgot, AuthLogin, AuthRegister } from './auth.types'

export const loginApi = (options: AuthLogin) => {
  return client.post('auth/login', { options, credentials: true })
}

export const profileApi = () => {
  console.log('res payload')
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
  const status = await client.post('auth/refresh', {
    credentials: true,
  })
  if (!status) {
    throw new Error('Login failed: refreshToken not available')
  }
  return status
}

export const forgotApi = async (options: AuthForgot) => {
  try {
    return await client.post('auth/forgot', { options })
  } catch (error) {
    console.log('error', error)
    throw error
  }
}
