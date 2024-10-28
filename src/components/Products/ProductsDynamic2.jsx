"use client"
import { useQuery } from "@apollo/client";
import { query } from "@/app/page"; // Đảm bảo sử dụng đúng query
import ProductList from "@/components/Products/ProductList";
import ProductCategories from "@/components/Products/ProductCategories";

const ProductsDynamic2 = ({ initialProducts, initialCategories }) => {
  const { data } = useQuery(query);
  const products = data?.products?.nodes || initialProducts;
  const categories = data?.productCategories?.nodes || initialCategories;
  return (
    <>
      <ProductCategories categories={categories} />
      <ProductList items={products} />
    </>
  );
};

export default ProductsDynamic2;
