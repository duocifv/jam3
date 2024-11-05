import React from "react";
import ProductCtrl from "@/controllers/ProductCtrl";
import { notFound } from "next/navigation";
import Image from "next/image";

const Page = async () => {
  const products = await ProductCtrl.list();
  if (!products || products.length === 0) notFound();

  return (
    <div className="flex flex-wrap">
      {products.map((product, index) => (
        <div key={index} className="bg-slate-400 w-1/4 p-4 m-4">
          <a href={`products/${product?.slug}`}>
            {product?.image?.sourceUrl ? (
              <Image
                src={product.image.sourceUrl} // Lấy URL hình ảnh
                width={500}
                height={300}
                alt={product.name || "Product image"}
              />
            ) : (
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                No image available
              </div>
            )}
            <h4 className="text-2xl mb-4">{product?.name}</h4>
            <div>Slug: {product?.slug}</div>
            <div>On Sale: {product?.onSale ? "Yes" : "No"}</div>
            <div>Review Count: {product?.reviewCount}</div>
            <div>Type: {product?.type}</div>
            <div>Price: {product?.price}</div>
            <div>Reviews: {product?.reviews?.averageRating}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Page;
