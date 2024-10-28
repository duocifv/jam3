import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import ProductsDynamic2 from "@/components/Products/ProductsDynamic2";

export const query = gql`
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
    productCategories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export default async function HomePage() {
  const data = (await fetchQuery(query)) || {};

  return (
    <div className="w-[2000px] mx-auto mb-4 justify-center flex flex-wrap">
      <ProductsDynamic2 initialProducts={data?.products?.nodes} initialCategories={data?.productCategories?.nodes} />
    </div>
  );
}
