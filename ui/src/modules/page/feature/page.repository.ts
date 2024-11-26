
import { cache } from '@/shared/utils/cache'
import { paginate, query } from '@/shared/utils/httpGraphql'
import { PagesList, PagesListQuery } from './page.type'
import { gql } from 'graphql-request';


export const PageDetailQuery = gql`
    query PageDetails($pageId: ID!) {
      page(id: $pageId) {
        blocks {
          name
          attributesJSON
          saveContent
          innerBlocks {
            name
            attributesJSON
            saveContent
            innerBlocks {
              name
              attributesJSON
              saveContent
            }
          }
        }
      }
    }
`;


export type TypePages = PagesListQuery['pages']['edges'][0]['node']

export const queryPagesList = async (): Promise<TypePages[]> => {
  const result = cache.list<TypePages>('pages')
  if (result?.length) return result

  try {
    const listData = await paginate(PagesList)

    if (!listData) {
      console.log('error getPosts', listData)
      return []
    }
    cache.put(listData, 'pages')

    for (const item of Object.values(listData)) {
      const { id, slug, title }: any = item
      const { page } = await query<any>(PageDetailQuery, {
        pageId: id,
      })
      const data = { id, slug, title, page }
      console.log("blocks blocks", page?.blocks)
      if (page?.blocks) {
        cache.put(data, 'pages', `${slug}`)
      } else {
        console.warn(`No data returned for page with ID: ${id}`)
      }
    }

    return listData as []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

type TypePageDetail = {
  id: string
  slug: string
  title: string
  blocks: any
}

export const queryPageDetail = async (slug: string): Promise<TypePageDetail> => {

  const result = cache.get<TypePageDetail>(null,'pages', `${slug}`)
  if (!result) {
    console.log("No data queryPageDetail", result)
    return null
  }
  return result
}

