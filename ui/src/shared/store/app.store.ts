import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAppStore = create(
  devtools((set) => ({
    user: '',
    profile: '',
    setUser: (user: object) => set({ user }),
    setProfile: (profile: object) => set({ profile }),
    loggedIn: false,
    logout: () => set({ user: null, loggedIn: false }),
  }))
)
