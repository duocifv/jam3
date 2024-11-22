import Link from 'next/link'
import React from 'react'

const Welcome = () => {
  return (
    <div>
      Chào mừng bạn đã quay lại! 😊 
      <Link href="/auth/profile/">Thông tin cá nhân</Link>
    </div>
  )
}

export default Welcome
