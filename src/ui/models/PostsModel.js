import { gql } from 'graphql-request'
import Cache from '@/lib/cache'
import { fetchDataWithPagination } from '@/lib/fetchDataWithPagination'

class PostsModel {
  async fetchPosts() {
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

  async fetchCategoriesPosts() {
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

  async fetchTagsPosts() {
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

  // List Posts
  async getPosts(slug) {
    const data = Cache.read('posts')
    if (Object.keys(data).length) {
      return slug ? data[slug] : Object.values(data)
    }

    const postsData = await this.fetchPosts()
    Cache.write('posts', postsData)

    return slug ? postsData[slug] : postsData
  }

  // Categories
  async getCategories(slug) {
    const data = Cache.read('categories')
    if (Object.keys(data).length) {
      return slug ? data[slug] : Object.values(data)
    }

    const categories = await this.fetchCategoriesPosts()
    Cache.write('categories', categories)

    return slug ? categories[slug] : Object.values(categories)
  }

  // Tags
  async getTags() {
    const data = Cache.read('tags')
    if (Object.keys(data).length) {
      return Object.values(data)
    }

    const tags = await this.fetchTagsPosts()
    Cache.write('tags', tags)

    return Object.values(tags)
  }
}

const reulst = new PostsModel()
export default reulst
