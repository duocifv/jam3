import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createProducts } from './createProducts'
import { createCart } from './createCart'

export const useProductsStore = create(
  devtools((...a) => ({
    ...createProducts(...a),
    ...createCart(...a),
  }))
)
