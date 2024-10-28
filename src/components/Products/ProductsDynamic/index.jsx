"use client";
import { useQuery, useApolloClient } from "@apollo/client";
import ProductList from "@/components/Products/ProductList";
import { query } from "@/app/page";
import ProductCategories from "../ProductCategories";

const ProductsDynamic = ({ children }) => {
  const client = useApolloClient();
  const { data } = useQuery(query, {
    fetchPolicy: "cache-first",
  });
  const products = data?.products?.nodes || [];
  const categories = data?.productCategories?.nodes || [];
  if (products.length === 0) return children;
  if (categories.length === 0) return children;
 

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    client.writeQuery({
      query,
      data: {
        products: {
          nodes: sortedProducts,
          __typename: "ProductConnection", // Thêm __typename nếu cần thiết
        },
        productCategories: {
          nodes: categories,
          __typename: "ProductCategoryConnection", // Thêm __typename nếu cần thiết
        },
      },
    });
  };

  return <>
  <button onClick={handleSort}>Sort Products</button>
  <ProductCategories categories={categories}/>
  <ProductList items={products} />
  </>;
};

export default ProductsDynamic;
