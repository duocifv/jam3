import Image from 'next/image'
import React from 'react'

const ProductDetail = ({ product }) => {
  return (
    <div>
      <h2 className="text-3xl">{product?.name}</h2>
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
      <div>categories: {product?.categories?.name}</div>
      <div>shortDescription: {product?.shortDescription}</div>
      <div>On Sale: {product?.onSale ? 'Yes' : 'No'}</div>
      <div>Review Count: {product?.reviewCount}</div>
      <div>Type: {product?.type}</div>
      <div>
        Price: <span dangerouslySetInnerHTML={{ __html: product?.price }} />
      </div>
      <div>Reviews: {product?.reviews?.averageRating}</div>
      <br />
      <div>
        Description: <br />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
      </div>
    </div>
  )
}

export default ProductDetail
