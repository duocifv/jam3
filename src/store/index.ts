import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ProductStore = {
  products: [];
  setProducts: (products: []) => void;
}

export const useStore = create<ProductStore>()(
  devtools((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
  })),
);
