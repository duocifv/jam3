'use client'
import React from 'react'
import FormLogin from './library/FormLogin'
import { useAppStore } from '@/shared/store/app.store'
import Welcome from './library/Welcome'

const LoginPage = () => {
  const loggedIn = useAppStore((state) => state.loggedIn)
  return loggedIn ? <Welcome /> : <FormLogin />
}

export default LoginPage
