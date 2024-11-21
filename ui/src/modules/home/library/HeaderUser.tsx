'use client'
import { useAppStore } from '@/shared/store/app.store'
import React from 'react'

const HeaderUser = () => {
  const user = useAppStore((state) => state.user)
  return user?.username && <div>{user.username}</div>
}

export default HeaderUser
