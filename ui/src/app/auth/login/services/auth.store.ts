import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Hàm xử State (login)
export const authStore = create(
    devtools((set) => ({
        user: '',
    }))
);