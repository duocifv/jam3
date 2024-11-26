import * as Types from '../../../types/types';

import gql from 'graphql-tag';
export type PagesListQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type PagesListQuery = { __typename?: 'RootQuery', pages?: { __typename?: 'RootQueryToPageConnection', pageInfo: { __typename?: 'RootQueryToPageConnectionPageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'RootQueryToPageConnectionEdge', cursor?: string | null, node: { __typename?: 'Page', id: string, pageId: number, status?: string | null, slug?: string | null, dateGmt?: string | null, title?: string | null } }> } | null };


export const PagesList = gql`
    query PagesList($first: Int, $after: String) {
  pages(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        pageId
        status
        slug
        dateGmt
        title
      }
    }
  }
}
    `;