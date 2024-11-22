"use client"
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  user: string | null | any
  profile: string | null
  loggedIn: boolean
  setUser: (user: any) => void
  setProfile: (profile: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  devtools(persist((set) => ({
    user: '',
    profile: '',
    loggedIn: false,
    setUser: (user: any) => set({ user, loggedIn: true }),
    setProfile: (profile) => set({ profile }),
    logout: () => {
      set({ user: null, loggedIn: false })
    },
  }), {
    name: "store-profile"
  })
  )
)
