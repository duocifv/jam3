import React from 'react'
import ProductCtrl from '@/controllers/server/ProductCtrl'
import { ProductWrapper, ProductList } from '@/components/Products/'

export async function generateStaticParams() {
  const productCategories = await ProductCtrl.categories()
  return productCategories.map((node) => ({
    categories: node.slug,
  }))
}

const page = async ({ params }) => {
  const { categories } = await params
  const listCategories = await ProductCtrl.listCategories(categories)
  return (
    <ProductWrapper>
      <ProductList innitData={listCategories} />
    </ProductWrapper>
  )
}
export default page
