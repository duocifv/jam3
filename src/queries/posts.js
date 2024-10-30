import { gql } from "@apollo/client";

export const GET_POSTS_BY_SLUGS = gql`
  query Posts($first: Int, $after: String) {
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

export const GET_POSTS = gql`
  query Posts($first: Int, $after: String) {
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
        }
      }
    }
  }
`;

export const GET_CUSORS = gql`
  query Cusors($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_TOTAL_POSTS = gql`
  query TotalCount {
    posts {
      totalCount
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
