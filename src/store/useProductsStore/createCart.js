import { gql } from 'graphql-request'
import { fetchData } from '@/lib/api'

export const createCart = (set, get) => ({
  cart: null,
  itemCart: [],
  addToCart: async (item) => {
    set((state) => ({
      itemCart: [...state.itemCart, { productId: item, quantity: 1 }],
    }))
    const ADD_TO_CART = gql`
      mutation AddCartItems($items: [CartItemInput!]!) {
        addCartItems(input: { items: $items }) {
          cart {
            contents {
              nodes {
                product {
                  node {
                    name
                    image {
                      sourceUrl
                    }
                    ... on VariableProduct {
                      productId
                      price(format: FORMATTED)
                      salePrice(format: FORMATTED)
                    }
                    ... on ExternalProduct {
                      productId
                      price(format: FORMATTED)
                      salePrice(format: FORMATTED)
                    }
                    ... on GroupProduct {
                      productId
                      price(format: FORMATTED)
                      salePrice(format: FORMATTED)
                    }
                    ... on SimpleProduct {
                      productId
                      price(format: FORMATTED)
                      salePrice(format: FORMATTED)
                    }
                  }
                }
                quantity
                total
              }
            }
            total(format: FORMATTED)
            totalTax(format: FORMATTED)
            shippingTotal
            shippingTax
            subtotal
            fees {
              amount
              id
              name
              taxClass
              taxable
              total
            }
            feeTax
            discountTotal(format: FORMATTED)
            contentsTotal
            contentsTax(format: FORMATTED)
          }
        }
      }
    `

    try {
      const { itemCart } = get()
      const { addCartItems } = await fetchData(ADD_TO_CART, {
        items: itemCart,
      })
      if (addCartItems.cart.contents) set({ cart: addCartItems.cart })
      console.log('state.itemCart data', addCartItems)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  },
})
