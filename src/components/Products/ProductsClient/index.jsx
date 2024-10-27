"use client";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useStore } from "@/store";
import ProductList from "@/components/Products/ProductList";

const query = gql`
  query Products {
    products {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;

const ProductsClient = ({ children }) => {
  const { data } = useQuery(query);
  const newItems = data?.products?.nodes;
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  useEffect(() => {
    if (newItems) {
      const arr = [];
      arr.push(newItems[1]);
      arr.push(newItems[2]);
      arr.push(newItems[3]);
      console.log("arr", arr);
      setProducts(arr);
    }
  }, [data, setProducts, newItems]);

  if (products.length === 0) return children;
  return <ProductList items={products} />;
};

export default ProductsClient;
