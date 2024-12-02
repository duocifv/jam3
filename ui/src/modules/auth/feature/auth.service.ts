'use client'
import { useAppStore } from '@/store/app.store'
import { loginApi, logoutApi, profileApi, refreshToken, registerApi } from './auth.api'
import { useMutation, useQuery } from '@tanstack/react-query'

// Hàm xử Service (login)
export const loginService = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      alert('đăng nhập thành công')
      useAppStore.setState({ user: data.user, loggedIn: true })
    },
  })
}

export const profileService = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi,
    staleTime: 60000,
    enabled: false,
  })
}

export const registerService = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      alert('Registration successful')
      console.log('registerService', data.message)
    },
    onError: (error) => {
      alert('Registration failed')
      console.log('Error during registration:', error.message)
    },
  })
}

export const logoutService = async () => {
  const logout = await logoutApi()
  if (logout) {
    useAppStore.setState({ user: null, loggedIn: false })
    alert(logout?.message)
  }
  return null
}

export const refreshTokenService = async () => {
  const refresh = await refreshToken()
  console.log('Refreshing token')
  return refresh
}
