import React from 'react'
import ProductCtrl from '@/controllers/ProductCtrl'

export async function generateStaticParams() {
  const params = await ProductCtrl.productcategories()
  return params
}

const page = () => {
  return <div>Hello</div>
}

export default page
