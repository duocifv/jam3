import { paginate, query } from '@/utils/httpGraphql'
import { PagesList, PagesListQuery } from './page.type'
import { gql } from 'graphql-request'
import * as dbStore from '@/utils/db'

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
`

const db = await dbStore.create<Data>('page', {
  pages: [],
  blocks: [],
})

export const queryPagesList = async (): Promise<TypePages[]> => {
  const { pages } = db.data
  if (pages?.length) return pages
  try {
    const data = await paginate(PagesList)
    const newData = Object.values(data)
    if (!newData?.length) {
      console.log('error getPosts')
      return []
    }
    dbStore.put(db, 'pages', newData)

    return data as []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const findPageMany = async (): Promise<TypePageDetail[]> => {
  const { blocks } = db.data
  if(blocks?.length) return blocks

  let data = db.data.pages
  if(!data) {
    data = await queryPagesList()
  }
  for (const item of Object.values(data)) {
    const { id, slug, title }: any = item
    const { page } = await query<any>(PageDetailQuery, {
      pageId: id,
    })
    const block = { id, slug, title, page }
    if (page?.blocks) {
      await db.update(({ blocks }) => blocks.push(block))
    } else {
      console.warn(`No data returned for page with ID 1: ${id}`)
      return []
    }
  }
  return blocks
}

export type TypePages = PagesListQuery['pages']['edges'][0]['node']
type TypePageDetail = {
  id: string
  slug: string
  title: string
  page: any
}

type Data = {
  pages: TypePages[]
  blocks: TypePageDetail[]
}
