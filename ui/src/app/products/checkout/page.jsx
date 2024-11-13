'use client'
import { useProductsStore } from '@/stores/useProductsStore'
import { Checkout, OrderSummary } from '@/components/Products/'

const Page = () => {
  const step = useProductsStore((state) => state.step)

  return step === 2 ? <Checkout /> : step === 3 ? <OrderSummary /> : null
}

export default Page
