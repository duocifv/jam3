'use client'
import { authStore, IAuthStore } from '@/modules/auth/feature/auth.store'
import {
  IProductStore,
  productsStore,
} from '@/modules/product/feature/product.store'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { subscribeWithSelector } from 'zustand/middleware'

export const useAppStore = create<IProductStore & IAuthStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...productsStore(set, get),
      ...authStore(set, get),
    }))
  )
)
