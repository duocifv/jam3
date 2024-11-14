import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { products } from './products'
import { cart } from './cart.product'

export const productStore = create(
  devtools((...a) => ({
    ...products(...a),
    ...cart(...a),
  }))
)
