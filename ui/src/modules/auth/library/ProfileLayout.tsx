import React from 'react'
import { profileService } from '../feature/auth.service'

const ProfileLayout = () => {
  const data = profileService()
  console.log("datadatadatadata0:", data.data)
  return <div>ProfileLayout</div>
}

export default ProfileLayout
