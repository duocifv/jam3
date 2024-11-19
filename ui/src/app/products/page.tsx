import React from 'react'
import * as productService from 'modules/product/product.service'
import { notFound } from 'next/navigation'
import { ProductList } from 'components/products'

const ProductPage = async () => {
  const productList = await productService.getProductList()
  if (!productList?.length) notFound()

  return (
    <div className="flex flex-wrap">
      <ProductList innitData={productList} />
    </div>
  )
}

export default ProductPage
