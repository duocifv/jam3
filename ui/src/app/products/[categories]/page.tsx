import React from 'react'
import * as productService from '@/modules/product/product.service'
import { ProductWrapper, ProductList } from '@/components/products/'

export async function generateStaticParams() {
  return await productService.getProductCategoriesPath()
}

const ProductCategoryPage = async ({ params }) => {
  const { categories } = await params
  const listCategories = await productService.getProductListCategory(categories)
  return (
    <ProductWrapper>
      <ProductList innitData={listCategories} />
    </ProductWrapper>
  )
}
export default ProductCategoryPage
