import { PageDetailsDocument, PageDetailsQuery, PagesListDocument, PagesListQuery } from '@/gql/graphql'
import { cache } from '@/lib/cache'
import { paginate, query } from '@/lib/grapql'

export type TypePages = PagesListQuery['pages']['edges'][0]['node']

export const getPagesList = async (): Promise<TypePages[]> => {
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

export const getPageDetail = async (slug: string): Promise<TypePageDetail> => {
  if (!slug) {
    console.log('slug không có')
    return null
  }
  const result = cache.get<TypePageDetail>(slug, 'pages', `${slug}`)
  if (!result) return null
  return result
}

export const getPagePath = async () => {
  try {
    const path = await getPagesList()
    if (!path.length) {
      console.log('not data getPath')
      return [{ pageSlug: 'home' }]
    }
    return path.map(({ slug }) => ({ pageSlug: slug }))
  } catch (error) {
    console.log('error data getPath')
    return [{ pageSlug: 'home' }]
  }
}

export const getPageCategories = async () => {
  try {
    const result: any[] = await getPagesList()
    if (!result.length) {
      console.log('not data getCategories')
      return [{ pageSlug: 'home' }]
    }
    return result.map(({ title, slug, pageId }) => ({
      name: title,
      slug,
      pageId,
    }))
  } catch (error) {
    console.log('error data getPath')
    return [{ pageSlug: 'home' }]
  }
}
