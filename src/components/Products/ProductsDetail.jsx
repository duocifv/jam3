import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsDetail = ({ product }) => {
  return (
    <div className="flex">
      <div>
        {product?.image?.sourceUrl && (
          <Image
            src={product.image.sourceUrl}
            width={570}
            height={727}
            alt="hello"
          />
        )}
      </div>
      <div className="w-[600px] p-6">
        <h1 className="font-bold text-3xl mb-4 py-4">{product?.title}</h1>
        <div>
          Price:
          <div dangerouslySetInnerHTML={{ __html: product?.price }} />
        </div>
        Content:
        <div dangerouslySetInnerHTML={{ __html: product?.content }} />
        <Link href="/">Back</Link>
      </div>
    </div>
  );
};

export default ProductsDetail;
