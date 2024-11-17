import { queryPagesList, queryPageDetail } from './page.repository'

export const getPagesList = async () => queryPagesList()
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

export const getPageDetail = async (slug: string) => queryPageDetail(slug)