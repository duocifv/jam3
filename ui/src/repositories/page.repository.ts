import { fetchDataWithPagination } from '@/lib/fetchDataWithPagination'
import { GetPagesDocument, GetPageDetailsDocument, GetPagesQuery } from '../gql/graphql';
import Cache from '@/lib/cache'
import { fetchData } from '@/lib/api'

const fetchPages = async () => {
  return await fetchDataWithPagination(
    GetPagesDocument,
    'pages'
  )
}

const fetchDetailPage = async (pageId: string) => {
  const result = await fetchData(GetPageDetailsDocument,
    { pageId }
  )
  return result.page.blocks || {}
}

const getPages = async () => {
  const data = Cache.read('pages')
  if (Object.keys(data).length) {
    return Object.values(data)
  }

  const result = await fetchPages()
  Cache.write(result, 'pages')

  for (const page of Object.values(result)) {
    const { id, slug, title }: any = page;
    const blocks = await fetchDetailPage(id)
    const data = { id, slug, title, blocks }

    if (blocks) {
      Cache.write(data, 'pages', `${slug}`)
    } else {
      console.warn(`No data returned for page with ID: ${id}`)
    }
  }
  return Object.values(result)
}

const getPageDetail = async (slug: string) => {
  const data = Cache.read('pages', slug)
  return data
}

export { getPages, getPageDetail }
