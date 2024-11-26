export const productsStore = (set, get) => ({
  cart: [],
  cartOpen: false,
  addCart: (newCart) => {
    const { cart } = get()
    const newProduct = { ...newCart[0], quantity: 1 }
    const updatedCart = cart.map((item) => {
      if (item.slug === newProduct.slug) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    const isProductInCart = cart.some((item) => item.slug === newProduct.slug)
    if (!isProductInCart) {
      updatedCart.push(newProduct)
    }
    set({ cart: updatedCart })
    set({ cartOpen: true })
  },
  openCart: () => set({cartOpen: false})
})

export interface IProductStore {
  cart: any[]
  cartOpen: boolean
  addCart: (newCart: any[]) => void
  openCart: () => boolean
}
