import { PageDetailsDocument, PagesListDocument, PagesListQuery, PageDetailsQuery } from '@/gql/graphql'
import { cache } from '@/shared/utils/cache'
import { paginate, query } from '@/shared/utils/httpGraphql'

export type TypePages = PagesListQuery['pages']['edges'][0]['node']

export const queryPagesList = async (): Promise<TypePages[]> => {
  const result = cache.list<TypePages>('pages')
  if (result?.length) return result

  try {
    const list = await paginate(PagesListDocument)
    if (list?.length) {
      console.log('error getPosts', list)
      return []
    }
    cache.put(list, 'pages')

    for (const item of list) {
      const { id, slug, title }: any = item
      const blocks = await query(PageDetailsDocument, {
        pageId: id,
      })
      const data = { id, slug, title, blocks }

      if (blocks) {
        cache.put(data, 'pages', `${slug}`)
      } else {
        console.warn(`No data returned for page with ID: ${id}`)
      }
    }

    return list as []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

type TypePageDetail = {
  id: string
  slug: string
  title: string
  blocks: PageDetailsQuery
}

export const queryPageDetail = async (slug: string): Promise<TypePageDetail> => {
  

  const result = cache.get<TypePageDetail>(null,'pages', `${slug}`)

  console.log("queryPageDetail pageSlug pageSlug", result)
  if (!result) {
    console.log("No data queryPageDetail", result)
    return null
  }
  return result
}

