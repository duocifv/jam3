import { gql } from 'graphql-request'
import { fetchDataWithPagination } from '@/lib/fetchDataWithPagination'
import Cache from '@/lib/cache'

class PagesModel {
  async fetchPages() {
    return await fetchDataWithPagination(
      gql`
        query Pages($first: Int, $after: String) {
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
                blocks {
                  name
                  attributesJSON
                  order
                  innerBlocks {
                    name
                    attributesJSON
                    order
                    innerBlocks {
                      name
                      attributesJSON
                      order
                    }
                  }
                }
                featuredImage {
                  node {
                    mediaDetails {
                      sizes {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      'pages'
    )
  }

  // List Posts
  async getPages(slug) {
    const data = Cache.read('pages')
    if (Object.keys(data).length) {
      return slug ? data[slug] : Object.values(data)
    }

    const result = await this.fetchPages()
    Cache.write('pages', result)

    return slug ? result[slug] : Object.values(result)
  }
}

const result = new PagesModel()
export default result
