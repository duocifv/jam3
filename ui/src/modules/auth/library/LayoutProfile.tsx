'use client'
import React from 'react'
import { useProfile } from '../../../app/auth/profile/hooks/useProfile'

const LayoutProfile = ({ children }) => {
  const { data } = useProfile()
  console.log('datadata', data)
  return <div>{children}</div>
}

export default LayoutProfile
