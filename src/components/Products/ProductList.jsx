'use client'
import Image from 'next/image'
import React from 'react'

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((product, index) => (
        <div key={index} className="bg-slate-400 w-1/4 p-4 m-4">
          <a href={`/products/${product?.categories?.slug}/${product?.slug}`}>
            {product?.image?.sourceUrl ? (
              <Image
                src={product.image.sourceUrl} // Lấy URL hình ảnh
                width={500}
                height={300}
                alt={product.name || 'Product image'}
              />
            ) : (
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                No image available
              </div>
            )}
            <h4 className="text-2xl mb-4">{product?.name}</h4>
            <div>categories: {product?.categories?.name}</div>
            <div>Slug: {product?.slug}</div>
            <div>On Sale: {product?.onSale ? 'Yes' : 'No'}</div>
            <div>Review Count: {product?.reviewCount}</div>
            <div>Type: {product?.type}</div>
            <div>Price: {product?.price}</div>
            <div>Reviews: {product?.reviews?.averageRating}</div>
          </a>
        </div>
      ))}
    </div>
  )
}

export default ProductList
