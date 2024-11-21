import { loginApi, profileApi } from './auth.api'

// Hàm xử Service (login)
export const loginService = async (field) => {
  const { user } = await loginApi(field)
  return user
}

export const profileService = async () => {
  const res = await profileApi()
  if (res?.error) {
    if (res?.error?.status === 401) {
      alert('chưa đăng nhập nha!')
    }
  }
  return res.user || null
}

// Hàm xử Service (login)
export const getAuthCategories = async () => {
  const data = [
    {
      slug: 'login',
      name: 'login',
    },
    {
      slug: 'profile',
      name: 'profile',
    },
    {
      slug: 'register',
      name: 'register',
    },
    {
      slug: 'forgot',
      name: 'forgot',
    },
  ]
  return data
}
