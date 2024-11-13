import PagesModel from '@/services/PagesModel'

class PagesCtrl {
  async all(slug) {
    const data = await PagesModel.getPages(slug)
    return data
  }
  async path() {
    const path = await this.all()
    const data = path.map((item) => ({ pageSlug: item.slug }))
    console.log('data', data)
    return data
  }
  async list() {
    const pages = await this.all()
    const data = pages.map(({ title, slug, pageId }) => ({
      name: title,
      slug,
      pageId,
    }))
    return data
  }
  async detail(slug) {
    if (!slug) return null
    const data = await this.all(slug)
    return data || {}
  }
}
const results = new PagesCtrl()
export default results
