import React from 'react'
import productService from 'server/product.service'
import { ProductDetail } from '@/components/Products/'

export async function generateStaticParams() {
  const params = await productService.productcategories()
  return params
}

const page = async ({ params }) => {
  const { categories, slug } = await params
  const product = await productService.detail(categories, slug)
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default page
