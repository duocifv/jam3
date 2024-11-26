import { create } from 'zustand'
import { products } from './products'
import { cart } from './cart.product'

export const productStore = create(
  (...a) => ({
    ...products(...a),
    ...cart(...a),
  })
)
