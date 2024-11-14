import * as pageRepository from '@/repositories/page.repository'

const all = async (slug) => {
  const data = await pageRepository.getPages(slug)
  return data
}

const path = async () => {
  const path = await all()
  const data = path.map((item) => ({ pageSlug: item.slug }))
  return data
}

const list = async () => {
  const pages = await all()
  const data = pages.map(({ title, slug, pageId }) => ({
    name: title,
    slug,
    pageId,
  }))
  return data
}

const detail = async (slug) => {
  if (!slug) return null
  const data = await all(slug)
  return data || {}
}

export { all, path, list, detail }
