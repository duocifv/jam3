import ShoppingCtrl from '@/controllers/client/ShoppingCtrl'

export const createCart = (set, get) => ({
  cart: null,
  itemCart: [],
  customer: {},
  step: 1,
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
    set({ step: 2 })
  },
  addCustomer: (customer) => {
    const { itemCart } = get()
    if (itemCart.length === 0) return alert('chọn sản phẩm')
    const productsCart = itemCart.map(({ productId, quantity }) => ({
      product_id: productId,
      quantity,
    }))
    customer.line_items = [...productsCart]
    set({ customer })
  },
  checkout: () => {
    const { customer } = get()
    ShoppingCtrl.order(customer).then((item) => {
      set({ cart: item.data })
      set({ step: 3 })
    })
  },
})
