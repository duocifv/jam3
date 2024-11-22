import React from 'react'
import { profileService } from '../feature/auth.service'

const ProfileLayout = () => {
  const data = profileService()
  return <div>ProfileLayout</div>
}

export default ProfileLayout
