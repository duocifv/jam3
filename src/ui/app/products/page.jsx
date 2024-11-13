import React from 'react'
import ProductCtrl from '@/controllers/server/ProductCtrl'
import { notFound } from 'next/navigation'
import { ProductList } from '@/components/Products/'

const Page = async () => {
  const products = await ProductCtrl.list()
  if (!products || products.length === 0) notFound()

  return (
    <div className="flex flex-wrap">
      <ProductList innitData={products} />
    </div>
  )
}

export default Page
