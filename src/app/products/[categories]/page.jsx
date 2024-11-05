import React from "react";
import ProductCtrl from "@/controllers/ProductCtrl";

export async function generateStaticParams() {
  const product = await ProductCtrl.categories();
  return product.map(({ node }) => ({
    categories: node.slug,
  }));
}

const page = async ({ params }) => {
  const { categories } = await params;
  const products = await ProductCtrl.list();
  const list = products.fillter(item => item.slug === categories)
  return (
    <div>
      Hello {categories}
      {products.map((item, index) => (
        <div key={index}>slug: {item.slug}</div>
      ))}
    </div>
  );
};

export default page;
