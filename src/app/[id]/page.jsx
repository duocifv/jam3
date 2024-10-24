import Image from "next/image";
import Link from "next/link";
import React from "react";

const getProductData = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const { products = [] } = await res.json();

  const params = products.map((product) => ({
    id: product.id.toString(),
  }));

  return params;
}

export async function generateMetadata({ params }) {
  const { id = {} } = await params;
  const item = await getProductData(id);
  return {
    title: item.title || "no title",
    description: item.description || "no description",
  };
}

const DetailPage = async ({ params }) => {
  const { id = {} } = await params;
  const item = await getProductData(id);

  return (
    <div className="w-[800px] mx-auto bg-gray-200 m-6 p-4">
      <h1 className="font-bold text-3xl mb-4 py-4">{item.title}</h1>
      <p>{item?.description}</p>
      <p>{item.price}</p>
      <p>{item.shippingInformation}</p>
      <Image src={item.thumbnail} width={500} height={500} alt="hello" />
      <Link href="/">Back</Link>
    </div>
  );
};

export default DetailPage;
