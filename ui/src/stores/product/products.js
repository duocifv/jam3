export const products = (set) => ({
  products: [],
  sortBy: (sortBy = 'name') =>
    set((state) => {
      const sortedProducts = [...state.products].sort((a, b) => {
        if (sortBy === 'price') {
          const priceA = parseInt(a.price, 10) ?? 0
          const priceB = parseInt(b.price, 10) ?? 0
          return priceA - priceB
        } else if (sortBy === 'name') {
          return a.name.localeCompare(b.name)
        }
        return 0
      })
      return { products: sortedProducts }
    }),
  setProducts: (newProducts) => {
    return set({ products: newProducts })
  },
})
