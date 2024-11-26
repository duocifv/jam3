import React from 'react'
import * as productService from 'modules/product/feature/product.service'
import { ProductWrapper, ProductList } from '@/modules/product/library'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return await productService.getProductCategoriesPath()
}

const ProductCategoryPage = async ({ params }) => {
  const { categories } = await params
  const productListCategory = await productService.getProductListCategory(categories)
  if (!productListCategory?.length) notFound()
  
  return (
    <ProductWrapper>
      <ProductList innitData={productListCategory} />
    </ProductWrapper>
  )
}
export default ProductCategoryPage
