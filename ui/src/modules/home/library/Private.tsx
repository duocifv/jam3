import FormLogin from '@/modules/auth/library/FormLogin'
import { useAppStore } from '@/shared/store/app.store'
import { ReactNode } from 'react'

const Private = ({ children }: { children: ReactNode }) => {
  const loggedIn = useAppStore((state) => state.loggedIn)
  return loggedIn ? children : <FormLogin />
}

export default Private
