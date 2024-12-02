'use client'
import React from 'react'
import FormLogin from './library/FormLogin'
import { useAppStore } from '@/store/app.store'
import Welcome from './library/Welcome'

const Login = () => {
  const loggedIn = useAppStore((state) => state.loggedIn)
  return loggedIn ? <Welcome /> : <FormLogin />
}

export default Login
