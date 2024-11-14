import { gql } from 'graphql-request'
import Cache from '@/lib/cache'
import { fetchDataWithPagination } from '@/lib/fetchDataWithPagination'

const fetchPosts = async () => {
  return await fetchDataWithPagination(
    gql`
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
    `,
    'posts'
  )
}

export const fetchCategoriesPosts = async () => {
  return await fetchDataWithPagination(
    gql`
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
    `,
    'categories'
  )
}

const fetchTagsPosts = async () => {
  return await fetchDataWithPagination(
    gql`
      query TagsPosts {
        tags(where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
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
    `,
    'tags'
  )
}

const getPosts = async (slug) => {
  const data = Cache.read('posts')
  if (Object.keys(data).length) {
    return slug ? data[slug] : Object.values(data)
  }
  const postsData = await fetchPosts()
  Cache.write('posts', postsData)
  return slug ? postsData[slug] : postsData
}

const getCategories = async (slug) => {
  const data = Cache.read('categories')
  if (Object.keys(data).length) {
    return slug ? data[slug] : Object.values(data)
  }
  const categories = await fetchCategoriesPosts()
  Cache.write('categories', categories)
  return slug ? categories[slug] : Object.values(categories)
}

const getTags = async () => {
  const data = Cache.read('tags')
  if (Object.keys(data).length) {
    return Object.values(data)
  }
  const tags = await fetchTagsPosts()
  Cache.write('tags', tags)
  return Object.values(tags)
}

export { getPosts, getCategories, getTags }
