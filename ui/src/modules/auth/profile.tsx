'use client'
import React from 'react'
import Private from '@/modules/shared/library/Private'
import ProfileLayout from './library/ProfileLayout'
import { profileService } from './feature/auth.service'

const Profile = () => {
  const data = profileService()
  return (
    <Private>
      <ProfileLayout />
    </Private>
  )
}

export default Profile
