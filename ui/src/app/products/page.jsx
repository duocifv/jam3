import React from 'react'
import * as productService from 'server/product.service'
import { notFound } from 'next/navigation'
import { ProductList } from '@/components/products/'

const Page = async () => {
  const products = await productService.list()
  if (!products || products.length === 0) notFound()

  return (
    <div className="flex flex-wrap">
      <ProductList innitData={products} />
    </div>
  )
}

export default Page
