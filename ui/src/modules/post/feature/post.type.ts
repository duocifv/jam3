import * as Types from '../../../types/types';

import gql from 'graphql-tag';
export type GetPosts2QueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPosts2Query = { __typename?: 'RootQuery', posts?: { __typename?: 'RootQueryToPostConnection', pageInfo: { __typename?: 'RootQueryToPostConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToPostConnectionEdge', cursor?: string | null, node: { __typename?: 'Post', id: string, slug?: string | null, title?: string | null, excerpt?: string | null, date?: string | null, content?: string | null, categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, name?: string | null, slug?: string | null, count?: number | null }> } | null, tags?: { __typename?: 'PostToTagConnection', nodes: Array<{ __typename?: 'Tag', id: string, slug?: string | null, name?: string | null, count?: number | null }> } | null } }> } | null };

export type CategoriesPostsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CategoriesPostsQuery = { __typename?: 'RootQuery', categories?: { __typename?: 'RootQueryToCategoryConnection', pageInfo: { __typename?: 'RootQueryToCategoryConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToCategoryConnectionEdge', cursor?: string | null, node: { __typename?: 'Category', id: string, name?: string | null, slug?: string | null, count?: number | null, categoryId?: number | null } }> } | null };

export type TagsPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TagsPostsQuery = { __typename?: 'RootQuery', tags?: { __typename?: 'RootQueryToTagConnection', pageInfo: { __typename?: 'RootQueryToTagConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToTagConnectionEdge', cursor?: string | null, node: { __typename?: 'Tag', id: string, name?: string | null, count?: number | null, slug?: string | null } }> } | null };


export const GetPosts2 = gql`
    query GetPosts2($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        slug
        title
        excerpt
        date
        content
        categories {
          nodes {
            id
            name
            slug
            count
          }
        }
        tags {
          nodes {
            id
            slug
            name
            count
            slug
          }
        }
      }
    }
  }
}
    `;
export const CategoriesPosts = gql`
    query CategoriesPosts($first: Int, $after: String) {
  categories(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        name
        slug
        count
        categoryId
      }
    }
  }
}
    `;
export const TagsPosts = gql`
    query TagsPosts {
  tags(where: {hideEmpty: true, orderby: COUNT, order: DESC}) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        name
        count
        slug
      }
    }
  }
}
    `;