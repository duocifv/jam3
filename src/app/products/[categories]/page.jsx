import React from 'react'
import ProductCtrl from '@/controllers/ProductCtrl'
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
  return <ProductList products={listCategories} />
}

export default page
