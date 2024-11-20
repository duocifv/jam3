import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAppStore = create(
    devtools((set) => ({
      user: '',
      setUser: (user: string) => set({ user }), // Hàm setUser để cập nhật giá trị user
    }))
  );