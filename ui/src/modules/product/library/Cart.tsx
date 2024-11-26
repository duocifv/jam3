'use client'
import Image from 'next/image'
import Link from 'next/link'
import { cleanPrice } from '@/shared/utils/cleanPrice'
import { useAppStore } from '@/shared/store/app.store'
import cn from '../stylesheet/cart.module.css'
import Text from '@/shared/components/Text'
import Button from '@/shared/components/Button'

const Cart = () => {
  const cartOpen = useAppStore((state) => state.cartOpen)
  const openCart = useAppStore((state) => state.openCart)
  const cart = useAppStore((state) => state.cart)
  const total = cart.reduce((total, product) => {
    return total + cleanPrice(product.price) * product.quantity
  }, 0)

  return (
    <div className={`${cn.container} ${cartOpen ? cn.open : cn.close} `}>
      <div className="flex justify-between mb-2">
        <div>
          <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
        </div>
        <div>
          <button onClick={openCart}>Close</button>
        </div>
      </div>
      {cart ? (
        <div className={cn.list}>
          {cart?.map((item, index) => {
            return (
              <div key={index} className={cn.item}>
                <div className="m-4">
                  <Image
                    src={item.image && item.image?.sourceUrl}
                    width={80}
                    height={80}
                    alt={item?.name || ''}
                  />
                </div>
                <div className="p-4">
                  <Text size="large" content={item?.name} />
                  <div className="font-bold">
                    price:
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item?.price,
                      }}
                    />
                  </div>
                  <div>
                    {item?.salePrice && (
                      <div>
                        sale Price:
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.salePrice,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div> {item?.onSale && 'Sale'}</div>
                  <hr />
                  <div>quantity: {item?.quantity}</div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        'no cart'
      )}
      <div className={cn.info}>
        <div className="text-3xl text-gray-600 font-thin">Total: {total} ₫</div>
        {/*  <div>
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
            </div> */}
      </div>
      <Link href="/products/checkout">
        <Button variant="secondary" full>
          Checkout
        </Button>
      </Link>
    </div>
  )
}

export default Cart
