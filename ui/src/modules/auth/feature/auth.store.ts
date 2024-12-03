

export interface IAuthStore {
  user: string | null | any
  profile: string | null
  loggedIn: boolean
  accessToken: string
  setUser: (user: any) => void
  setAccessToken: (token: string) => void
  setProfile: (profile: string) => void
  logout: () => void
}

export const authStore = (set, get): IAuthStore => ({
  user: '',
  profile: '',
  loggedIn: true,
  accessToken: '',
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user, loggedIn: true }),
  setProfile: (profile) => set({ profile }),
  logout: () => {
    set({ user: null, loggedIn: false })
  },
})

