import React from 'react'
import { ProductList } from './library'
import * as productService from 'modules/product/feature/product.service'
import { notFound } from 'next/navigation'

const Product = async () => {
  const productList = await productService.getProductList()
  if (!productList?.length) notFound()
  return (
    <div className="flex flex-wrap">
      <ProductList innitData={productList} />
    </div>
  )
}

export default Product
