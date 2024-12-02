'use client'
import React from 'react'
import Private from '@/modules/shared/library/Private'
import ProfileLayout from './library/ProfileLayout'

const Profile = () => {
  return (
    <Private>
      <ProfileLayout />
    </Private>
  )
}

export default Profile
