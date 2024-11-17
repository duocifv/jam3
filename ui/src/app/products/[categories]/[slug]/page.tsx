import React from 'react'
import * as productService from '@/modules/product/product.service'
import { ProductDetail } from '@/components/products'

export async function generateStaticParams() {
  const params = await productService.getProductPath()
  return params || []
}

const page = async ({ params }) => {
  const { categories, slug } = await params
  const product = await productService.getProductDetail(categories, slug)
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default page
