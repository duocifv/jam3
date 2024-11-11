import PagesModel from '@/models/PagesModel'

class PagesCtrl {
  async page(id) {
    if (!id) return 'not id'
    const page = await PagesModel.getPage(id)
    return page
  }
}
const results = new PagesCtrl()
export default results
