import { useAppStore } from '@/shared/store/app.store'
import { loginService, profileService } from './auth.service'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

//Hàm xử State (login)
export const useLogin = async () => {
  const router = useRouter()
  const addUser = useAppStore((state) => state.setUser)

  const mutate = async () => {
    const user = await loginService()
    if (!user) {
      return null
    }
    router.push('/auth/profile')
    addUser(user)
    return
  }
  return {
    mutate,
  }
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileService,
    staleTime: 60000,
  })
}
