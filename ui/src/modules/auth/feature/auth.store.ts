export interface IAuthStore {
  user: string | null | any
  profile: string | null
  loggedIn: boolean
  setUser: (user: any) => void
  setProfile: (profile: string) => void
  logout: () => void
}

export const authStore = (set, get): IAuthStore => ({
  user: '',
  profile: '',
  loggedIn: false,
  setUser: (user: any) => set({ user, loggedIn: true }),
  setProfile: (profile) => set({ profile }),
  logout: () => {
    set({ user: null, loggedIn: false })
  },
})
