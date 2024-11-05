import { gql } from "graphql-request";
import { fetchData } from "@/lib/api";
import Cache from "@/lib/cache";
import { fetchDataWithPagination } from "@/lib/fetchDataWithPagination";

class ProductModel {
  async fetchProducts() {
    return await fetchDataWithPagination(
      gql`
        query Products($first: Int, $after: String) {
          products(first: $first, after: $after) {
            edges {
              cursor
              node {
                id
                slug
                name
                description
                onSale
                reviewCount
                shortDescription
                image {
                  sourceUrl
                }
                sku
                type
                ... on VariableProduct {
                  comments {
                    nodes {
                      content
                      date
                      id
                      isComment
                    }
                  }
                  image {
                    guid
                  }
                  price(format: FORMATTED)
                  reviews {
                    averageRating
                  }
                  salePrice(format: FORMATTED)
                }
                ... on ExternalProduct {
                  comments {
                    nodes {
                      content
                      date
                      id
                      isComment
                    }
                  }
                  image {
                    guid
                  }
                  price(format: FORMATTED)
                  reviews {
                    averageRating
                  }
                  salePrice(format: FORMATTED)
                }
                ... on GroupProduct {
                  comments {
                    nodes {
                      content
                      date
                      id
                      isComment
                    }
                  }
                  image {
                    guid
                  }
                  price(format: FORMATTED)
                  reviews {
                    averageRating
                  }
                  salePrice(format: FORMATTED)
                }
                ... on SimpleProduct {
                  comments {
                    nodes {
                      content
                      date
                      id
                      isComment
                    }
                  }
                  image {
                    guid
                  }
                  price(format: FORMATTED)
                  reviews {
                    averageRating
                  }
                  salePrice(format: FORMATTED)
                }
                ... on SimpleProductVariation {
                  image {
                    guid
                  }
                  price(format: FORMATTED)
                  salePrice(format: FORMATTED)
                }
              }
            }
          }
        }
      `,
      "products"
    );
  }

  async fetchProductCategories() {
    const query = gql`
      query ProductCategories {
        productCategories {
          edges {
            cursor
            node {
              count
              name
              slug
              products {
                nodes {
                  id
                }
              }
            }
          }
        }
      }
    `;
    const result = await fetchData(query);
    return result;
  }

  async getProducts(slug) {
    const data = Cache.read("products");

    if (Object.keys(data).length) {
      return slug ? data[slug] : Object.values(data);
    }

    const products = await this.fetchProducts();
    Cache.write("products", products);

    return slug ? products[slug] : Object.values(products);
  }

  async getProductCategories() {
    const cachedData = Cache.read("productCategories");
    if (cachedData.length > 0) {
      return cachedData;
    }

    const { productCategories } = await this.fetchProductCategories();
    Cache.write("productCategories", productCategories?.edges);
    return productCategories?.edges || [];
  }
}

const reulst = new ProductModel();

export default reulst;
