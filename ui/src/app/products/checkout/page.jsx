'use client'
import { productStore } from 'stores/product/product.store'
import { Checkout, OrderSummary } from '@/components/products/'

const Page = () => {
  const step = productStore((state) => state.step)

  return step === 2 ? <Checkout /> : step === 3 ? <OrderSummary /> : null
}

export default Page
