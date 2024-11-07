import { gql } from 'graphql-request'
import { fetchData } from '@/lib/api'

export const createCart = (set, get) => ({
  cart: null,
  itemCart: [],
  
  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (item) => {
    set((state) => ({
      itemCart: [...state.itemCart, { productId: item, quantity: 1 }], // Cập nhật giỏ hàng
    }));

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
    `;

    try {
      const { itemCart } = get(); // Lấy dữ liệu giỏ hàng từ state
      const { addCartItems } = await fetchData(ADD_TO_CART, { items: itemCart });

      if (addCartItems.cart.contents) {
        set({ cart: addCartItems.cart }); // Lưu giỏ hàng vào state
      }
      console.log('Giỏ hàng sau khi thêm sản phẩm:', addCartItems);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  },

  // Tiến hành thanh toán
  checkout: async (billingInfo, shippingInfo) => {
    const CHECKOUT = gql`
      mutation Checkout($input: CheckoutInput!) {
        checkout(input: $input) {
          order {
            date
            id
            status
            subtotal
            total
            totalTax
            transactionId
          }
        }
      }
    `;

    try {
      const { cart, wooSessionToken } = get(); // Lấy giỏ hàng và token từ state

      if (!wooSessionToken) {
        throw new Error('Chưa đăng nhập, không có token!');
      }

      if (!cart || !cart.contents.nodes.length) {
        throw new Error('Giỏ hàng không có sản phẩm');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wooSessionToken}`, // Sử dụng token trong header
      };

      const checkoutInput = {
        billing: billingInfo,
        shipping: shippingInfo,
        customerNote: "Ghi chú từ khách hàng",
        isPaid: true,
        shipToDifferentAddress: true,
      };

      const { checkout } = await fetchData(CHECKOUT, { input: checkoutInput, headers });

      if (checkout) {
        set({ cart: null }); // Xóa giỏ hàng sau khi thanh toán
        console.log('Đơn hàng đã được xử lý:', checkout);
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện thanh toán:', error);
    }
  },

  // Đăng nhập và lấy wooSessionToken
  login: async () => {
    console.log("Đang thực hiện đăng nhập...");
    
    const headers = {
      'Authorization': 'Basic YWRtaW46YWRtaW4=', // Basic Auth cho tài khoản admin/admin
      'Content-Type': 'application/json'
    };

    const LOGIN = gql`
      query Viewer {
        viewer {
          wooSessionToken
        }
      }
    `;

    try {
      // Gọi fetchData và nhận kết quả từ GraphQL
      const data = await fetchData(LOGIN,{}, { headers });
      console.log("|datadatadatadatadata", data)
      
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  }
});
