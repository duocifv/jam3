import ShoppingCtrl from '@/controllers/client/ShoppingCtrl'

export const createCart = (set, get) => ({
  cart: null,
  itemCart: [],
  setItemCart: (productId, quantity) => {
    const { itemCart } = get()
    const updatedItemCart = itemCart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    )
    if (!updatedItemCart.some((item) => item.productId === productId)) {
      updatedItemCart.push({ productId, quantity })
    }
    set({ itemCart: updatedItemCart })
  },
  addToCart: () => {
    const { itemCart } = get()
    ShoppingCtrl.addCart(itemCart).then(({ data }) => {
      const cart = data.addCartItems.cart
      if (cart) set({ cart })
    })
    set({ cart: ['loadding'] })
  },
})
