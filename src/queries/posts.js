import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        slug
      }
    }
  }
}
`;

export const GET_POST = gql`
  query Post($ID: ID!) {
    post(id: $ID, idType: SLUG) {
      id
      title
      excerpt
      date
      content
      isComment
      status
    }
  }
`;



export const GET_PATH_POSTS = gql`
  query Posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
      }
    }
  }
`;

export const GET_POSTS_PAGE = gql`
  query Posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          slug
          status
          title
          date
          excerpt
        }
      }
    }
  }
`;