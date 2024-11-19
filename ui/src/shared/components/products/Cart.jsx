'use client'
import { productStore } from '@/stores/product/product.store'
import Image from 'next/image'
import Link from 'next/link'

const Cart = () => {
  const cart = productStore((state) => state.cart)
  const addToCart = productStore((state) => state.addToCart)
  const itemCart = productStore((state) => state.itemCart)
  return (
    <div className="bg-gray-200 p-2 m-2">
      <i className="fas fa-shopping-cart"></i> Cart
      <span>({itemCart.length})</span>
      {cart ? (
        <div className="flex">
          <div className="border w-8/12">
            {cart?.contents?.nodes?.map(({ product, quantity, total }) => {
              return (
                <div key={product.node.productId} className="flex">
                  <div className="m-4">
                    <Image
                      src={product.node.image && product.node.image?.sourceUrl}
                      width={80}
                      height={80}
                      alt={product?.node.name || ''}
                    />
                  </div>
                  <div className="p-4">
                    <div>product name: {product?.node.name}</div>
                    <div>
                      price:
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product?.node?.price,
                        }}
                      />
                    </div>
                    {product.salePrice && (
                      <div>salePrice: {product.node?.salePrice}</div>
                    )}
                    <hr />
                    <div>quantity: {quantity}</div>
                    <div>
                      total:{' '}
                      <span dangerouslySetInnerHTML={{ __html: total }} />
                    </div>
                  </div>
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

          <Link href="/products/checkout">Thanh toán</Link>
        </div>
      ) : (
        'no cart'
      )}
      <div>
        <button onClick={addToCart}>View Card</button>
      </div>
    </div>
  )
}

export default Cart
