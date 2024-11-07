import React from 'react'
import ProductCtrl from '@/controllers/ProductCtrl'
import ProductWrapper from '@/components/Products/ProductWrapper'
import ProductList from '@/components/Products/ProductList'

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
