import React from "react";
import ProductCtrl from "@/controllers/ProductCtrl";
import { notFound } from "next/navigation";

const page = async () => {
  const products = await ProductCtrl.list();
  if (!products || products.length === 0) notFound();
  return (
    <div className="flex flex-wrap">
      {products.map((product, index) => (
        <div key={index} className="bg-slate-400 w-1/3 p-4 m-4">
          <h4 className="text-2xl mb-4">{product?.name}</h4>
          <div>slug: {product?.slug}</div>
          <div>onSale: {product?.onSale}</div>
          <div>reviewCount: {product?.reviewCount}</div>
          <div>type: {product?.type}</div>
          <div>price: {product?.price}</div>
          <div>reviews: {product?.reviews?.averageRating}</div>
        </div>
      ))}
    </div>
  );
};

export default page;
