import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import ProductList from "@/components/Products/ProductList";
import ProductsClient from "@/components/Products/ProductsClient";

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
  const result = (await fetchQuery(query)) || {};
  const data = result.products?.nodes || [];
  return (
    <div className="w-[2000px] mx-auto mb-4 justify-center flex flex-wrap">
      <ProductsClient>
        <ProductList items={data} />
      </ProductsClient>
    </div>
  );
}
