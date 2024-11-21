import { useAppStore } from '@/shared/store/app.store'
import { loginService, profileService } from './auth.service'
import { AuthLogin } from './auth.types'
import { useRouter } from 'next/navigation'

//Hàm xử State (login)
export const useLogin = async () => {
  const router = useRouter()
  const addUser = useAppStore((state) => state.setUser)

  const mutate = async (field: AuthLogin) => {
    const user = await loginService(field)
    if (!user) {
      return null
    }
    addUser(user)
    router.push('/auth/profile')
    return
  }
  return {
    mutate,
  }
}

export const useProfile = async () => {
  const profile = await profileService()
  if(profile) {
    useAppStore.setState({ profile })

  }
}
