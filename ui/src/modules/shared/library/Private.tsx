'use client'
import { refreshTokenService } from '@/modules/auth/feature/auth.service'
import FormLogin from '@/modules/auth/library/FormLogin'
import { useAppStore } from '@/store/app.store'
import { ReactNode, useEffect } from 'react'

const Private = ({ children }: { children: ReactNode }) => {
  const loggedIn = useAppStore((state) => state.loggedIn)
  const accessToken = useAppStore((state) => state.accessToken)
  const setAccessToken = useAppStore((state) => state.setAccessToken)
  useEffect(() => {
    if (!accessToken) {
      const data = refreshTokenService()
      data
        .then((item) => {
          if (!item?.accessToken) {
            useAppStore.setState({ loggedIn: false })
          }
          setAccessToken(item?.accessToken)
        })
        .catch(() => {
          useAppStore.setState({ loggedIn: false })
        })
    } else {
      useAppStore.setState({ loggedIn: true })
    }
  }, [accessToken])
  return loggedIn ? children : <FormLogin />
}

export default Private
