'use client'
import { logoutService } from '@/modules/auth/feature/auth.service'
import { useAppStore } from '@/store/app.store'

const HeaderUser = () => {
  const user = useAppStore((state) => state.user)
  return (
    user?.username && (
      <div>
        {user.username}
        <button onClick={logoutService}>Logout</button>
      </div>
    )
  )
}

export default HeaderUser
