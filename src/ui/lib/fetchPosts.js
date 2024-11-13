// lib/fetchPosts.js
import { gql } from '@apollo/client'
import { fetchQuery } from '@/lib/apolloClient'

export const GET_POSTS = gql`
  query Posts($first: Int, $after: String, $last: Int, $before: String) {
    posts(first: $first, after: $after, last: $last, before: $before) {
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
        }
      }
    }
  }
`

export async function fetchPosts({
  first = 10,
  after = null,
  last = null,
  before = null,
}) {
  const { posts } = await fetchQuery(GET_POSTS, { first, after, last, before })
  return posts
}
