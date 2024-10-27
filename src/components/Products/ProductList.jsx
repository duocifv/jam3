"use client";
import Image from "next/image";

const ProductList = ({ items }) => {
  return (
    <div className="w-[900px] mx-auto mb-4 justify-center flex flex-wrap">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200 w-[210px] m-3 hover:opacity-75"
        >
          <a href={item.slug}>
            <Image
              src={item?.image?.sourceUrl}
              width={240}
              height={268}
              alt={item.name}
            />
            <p>{item.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
