import { gql } from 'graphql-request'
import { fetchData } from '@/lib/api'
import Cache from '@/lib/cache'

class PagesModel {
  async fetchPage(id) {
    return await fetchData(
      gql`
        query Page($id: ID!) {
          page(id: $id) {
            slug
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
          }
        }
      `,
      { id }
    )
  }

  // List Posts
  async getPage(id) {
    const data = Cache.read('page')
    if (Object.keys(data).length) {
      return id && data
    }
    const result = await this.fetchPage(id)
    Cache.write('page', result.page)

    return result || {}
  }
}

const result = new PagesModel()
export default result
