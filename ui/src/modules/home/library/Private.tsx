"use client"
import FormLogin from '@/modules/auth/library/FormLogin'
import { useAppStore } from '@/shared/store/app.store'
import { ReactNode } from 'react'

const Private = ({ children }: { children: ReactNode }) => {
  const loggedIn = useAppStore((state) => state.loggedIn)
  return loggedIn ? children : <FormLogin />
}

export default Private


// const refreshAccessToken = async () => {
//   try {
//     const response = await fetch('/refresh', {
//       method: 'POST',
//       credentials: 'include',  // Gửi cookie, bao gồm Refresh Token
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data.accessToken;  // Trả về Access Token mới
//     } else {
//       throw new Error('Không thể làm mới token');
//     }
//   } catch (error) {
//     console.error('Lỗi làm mới Access Token', error);
//   }
// };
