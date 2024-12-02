"use client"
import { refreshTokenService } from '@/modules/auth/feature/auth.service'
import FormLogin from '@/modules/auth/library/FormLogin'
import { useAppStore } from '@/store/app.store'
import { ReactNode } from 'react'

const Private =  ({ children }: { children: ReactNode }) => {
  const data = refreshTokenService()
  const loggedIn = useAppStore((state) => state.loggedIn)
  return loggedIn ? children : <FormLogin />
}

export default Private



