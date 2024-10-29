"use client";
import { useQuery, gql } from "@apollo/client";
import ProductsDetail from "./ProductsDetail";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const get_product = gql`
  query Product($ID: ID!) {
    product(id: $ID, idType: SLUG) {
      id
      name
      slug
      status
      title
      content
      dateGmt
      description
      ... on SimpleProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on VariableProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on ExternalProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on GroupProduct {
        price
        image {
          sourceUrl
        }
      }
    }
  }
`;

const ProductDetailDynamic = ({ children }) => {
  const router = useSearchParams();
  const [productId, setProductId] = useState(null);

  const { data } = useQuery(get_product, {
    variables: { ID: productId  }, // Sử dụng slug để truy vấn
    fetchPolicy: "cache-first", // Hoặc "cache-and-network" nếu cần
    skip: !productId, // Bỏ qua truy vấn nếu slug không có
  });
  const product = data?.product;
  useEffect(() => {
    const slug = router.get("slug")
      setProductId(slug);
  }, []);

  if (!product) return children;

  return (
    <>
      <ProductsDetail product={product} />
    </>
  );
};

export default ProductDetailDynamic;
