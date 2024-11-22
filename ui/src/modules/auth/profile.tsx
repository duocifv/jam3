'use client'
import React from 'react'
import Private from '@/modules/home/library/Private'
import ProfileLayout from './library/ProfileLayout'

const Profile = () => {
  return (
    <Private>
      <ProfileLayout />
    </Private>
  )
}

export default Profile
