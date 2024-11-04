import { gql } from "graphql-request";

export const GET_POPULAR_TAGS = gql`
  query GetPopularTags {
    tags(where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        count
        slug
      }
    }
  }
`;

export const GET_CATEGORIES_AND_POSTS = gql`
  query CategoriesAndPosts(
    $categoriesFirst: Int
    $categoriesAfter: String
    $postsFirst: Int
    $postsAfter: String
  ) {
    categories(first: $categoriesFirst, after: $categoriesAfter) {
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
    posts(first: $postsFirst, after: $postsAfter) {
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
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES_POSTS = gql`
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
          categories {
            nodes {
              slug
            }
          }
          tags {
            nodes {
              slug
            }
          }
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
