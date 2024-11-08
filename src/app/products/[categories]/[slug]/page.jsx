import React from 'react'
import ProductCtrl from '@/controllers/server/ProductCtrl'
import ProductDetail from '@/components/Products/ProductDetail'

export async function generateStaticParams() {
  const params = await ProductCtrl.productcategories()
  return params
}

const page = async ({ params }) => {
  const { categories, slug } = await params
  const product = await ProductCtrl.detail(categories, slug)
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default page
