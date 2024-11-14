import React from 'react'
import * as productService from 'server/product.service'
import { ProductWrapper, ProductList } from '@/components/products/'

export async function generateStaticParams() {
  const productCategories = await productService.categories()
  return productCategories.map((node) => ({
    categories: node.slug,
  }))
}

const page = async ({ params }) => {
  const { categories } = await params
  const listCategories = await productService.listCategories(categories)
  return (
    <ProductWrapper>
      <ProductList innitData={listCategories} />
    </ProductWrapper>
  )
}
export default page
