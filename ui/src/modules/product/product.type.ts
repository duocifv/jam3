import * as Types from '../../types/types';

import gql from 'graphql-tag';
export type ProductCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ProductCategoriesQuery = { __typename?: 'RootQuery', productCategories?: { __typename?: 'RootQueryToProductCategoryConnection', pageInfo: { __typename?: 'RootQueryToProductCategoryConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToProductCategoryConnectionEdge', cursor?: string | null, node: { __typename?: 'ProductCategory', productCategoryId?: number | null, count?: number | null, name?: string | null, slug?: string | null } }> } | null };

export type ProductsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  categoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ProductsQuery = { __typename?: 'RootQuery', products?: { __typename?: 'RootQueryToProductUnionConnection', pageInfo: { __typename?: 'RootQueryToProductUnionConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToProductUnionConnectionEdge', cursor?: string | null, node: { __typename?: 'ExternalProduct', productId: number, price?: string | null, salePrice?: string | null, slug?: string | null, name?: string | null, description?: string | null, onSale?: boolean | null, reviewCount?: number | null, shortDescription?: string | null, sku?: string | null, type?: Types.ProductTypesEnum | null, reviews?: { __typename?: 'ProductToCommentConnection', averageRating?: number | null } | null, image?: { __typename?: 'MediaItem', sourceUrl?: string | null } | null } | { __typename?: 'GroupProduct', productId: number, price?: string | null, salePrice?: string | null, slug?: string | null, name?: string | null, description?: string | null, onSale?: boolean | null, reviewCount?: number | null, shortDescription?: string | null, sku?: string | null, type?: Types.ProductTypesEnum | null, reviews?: { __typename?: 'ProductToCommentConnection', averageRating?: number | null } | null, image?: { __typename?: 'MediaItem', sourceUrl?: string | null } | null } | { __typename?: 'SimpleProduct', productId: number, price?: string | null, salePrice?: string | null, slug?: string | null, name?: string | null, description?: string | null, onSale?: boolean | null, reviewCount?: number | null, shortDescription?: string | null, sku?: string | null, type?: Types.ProductTypesEnum | null, reviews?: { __typename?: 'ProductToCommentConnection', averageRating?: number | null } | null, image?: { __typename?: 'MediaItem', sourceUrl?: string | null } | null } | { __typename?: 'SimpleProductVariation', price?: string | null, salePrice?: string | null, slug?: string | null, name?: string | null, description?: string | null, onSale?: boolean | null, reviewCount?: number | null, shortDescription?: string | null, sku?: string | null, type?: Types.ProductTypesEnum | null, image?: { __typename?: 'MediaItem', sourceUrl?: string | null } | null } | { __typename?: 'VariableProduct', productId: number, price?: string | null, salePrice?: string | null, slug?: string | null, name?: string | null, description?: string | null, onSale?: boolean | null, reviewCount?: number | null, shortDescription?: string | null, sku?: string | null, type?: Types.ProductTypesEnum | null, reviews?: { __typename?: 'ProductToCommentConnection', averageRating?: number | null } | null, image?: { __typename?: 'MediaItem', sourceUrl?: string | null } | null } }> } | null };


export const ProductCategories = gql`
    query ProductCategories($first: Int, $after: String) {
  productCategories(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        productCategoryId
        count
        name
        slug
      }
    }
  }
}
    `;
export const Products = gql`
    query Products($first: Int, $categoryId: Int) {
  products(first: $first, where: {categoryId: $categoryId}) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        slug
        name
        description
        onSale
        reviewCount
        shortDescription
        sku
        image {
          sourceUrl
        }
        type
        ... on VariableProduct {
          productId
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          reviews {
            averageRating
          }
        }
        ... on ExternalProduct {
          productId
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          reviews {
            averageRating
          }
        }
        ... on GroupProduct {
          productId
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          reviews {
            averageRating
          }
        }
        ... on SimpleProduct {
          productId
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
          reviews {
            averageRating
          }
        }
        ... on SimpleProductVariation {
          price(format: FORMATTED)
          salePrice(format: FORMATTED)
        }
      }
    }
  }
}
    `;