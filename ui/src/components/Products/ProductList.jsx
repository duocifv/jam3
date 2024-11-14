'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { productStore } from '@/stores/product/product.store'
import Link from 'next/link'

const ProductList = ({ innitData }) => {
  const products = productStore((state) => state.products)
  const setProducts = productStore((state) => state.setProducts)
  const sortBy = productStore((state) => state.sortBy)
  const setItemCart = productStore((state) => state.setItemCart)
  const handleAddToCart = (productId) => {
    setItemCart(productId, 1)
  }
  const list = products && products.length > 0 ? products : innitData
  useEffect(() => {
    setProducts(innitData)
  }, [innitData, setProducts])

  return (
    <>
      <div>
        <button onClick={() => sortBy('name')}>sort by name</button> |
        <button onClick={() => sortBy('price')}>sort by price</button>
      </div>
      <div className="flex flex-wrap">
        {list.map((product, index) => (
          <div key={index} className="bg-slate-400 w-1/2 p-4 border-8">
            {product?.image?.sourceUrl ? (
              <Image
                src={product.image.sourceUrl}
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
            <div>
              Price:
              <span dangerouslySetInnerHTML={{ __html: product?.price }} />
            </div>
            <div>Reviews: {product?.reviews?.averageRating}</div>
            <button
              className="bg-red-300"
              onClick={() => handleAddToCart(product.productId)}
            >
              Add to Cart {product.productId}
            </button>
            |
            <Link
              href={`/products/${product?.categories?.slug}/${product?.slug}`}
            >
              View more
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductList
