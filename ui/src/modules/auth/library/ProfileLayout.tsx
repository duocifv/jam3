import React from 'react'
import { profileService } from '../feature/auth.service'

const ProfileLayout = () => {
  const data = profileService()
  console.log('profileprofileprofileprofileprofile', data)
  return <div>ProfileLayout</div>
}

export default ProfileLayout
