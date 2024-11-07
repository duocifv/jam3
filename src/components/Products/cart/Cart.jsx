'use client'
import { useProductsStore } from '@/store/useProductsStore'

const Cart = () => {
  const cart = useProductsStore((state) => state.cart)

  console.log('cart', cart)
  return (
    <div className="bg-gray-200 p-2 m-2">
      <i className="fas fa-shopping-cart"></i> Cart
      {cart ? (
        <div className="flex">
          <div className="border w-8/12">
            {cart?.contents?.nodes?.map(({ product, quantity, total }) => {
              return (
                <div key={product.productId}>
                  <div>product name: {product?.node.name}</div>
                  <div>
                    image: {product.node.image && product.node.image?.sourceUrl}
                  </div>
                  <div>
                    price:
                    <span
                      dangerouslySetInnerHTML={{ __html: product?.node?.price }}
                    />
                  </div>
                  {product.salePrice && (
                    <div>salePrice: {product.node?.salePrice}</div>
                  )}
                  <hr />
                  <div>quantity: {quantity}</div>
                  <div>
                    total: <span dangerouslySetInnerHTML={{ __html: total }} />
                  </div>
                  <br />
                </div>
              )
            })}
          </div>
          <div className="w-4/12 bg-gray-300 p-4">
            <div>
              total:
              <span dangerouslySetInnerHTML={{ __html: cart.total }} />
            </div>
            <div>
              totalTax:
              <span dangerouslySetInnerHTML={{ __html: cart.totalTax }} />
            </div>
            <div>
              shippingTotal:
              <span dangerouslySetInnerHTML={{ __html: cart.shippingTotal }} />
            </div>
            <div>
              shippingTax:
              <span dangerouslySetInnerHTML={{ __html: cart.shippingTax }} />
            </div>
            <div>
              subtotal:
              <span dangerouslySetInnerHTML={{ __html: cart.subtotal }} />
            </div>
            <div>
              feeTax:
              <span dangerouslySetInnerHTML={{ __html: cart.feeTax }} />
            </div>
            <div>
              discountTotal:
              <span dangerouslySetInnerHTML={{ __html: cart.discountTotal }} />
            </div>
            <div>
              contentsTotal:
              <span dangerouslySetInnerHTML={{ __html: cart.contentsTotal }} />
            </div>
            <div>
              contentsTax:
              <span dangerouslySetInnerHTML={{ __html: cart.contentsTax }} />
            </div>
          </div>
        </div>
      ) : (
        'no cart'
      )}
    </div>
  )
}

export default Cart
