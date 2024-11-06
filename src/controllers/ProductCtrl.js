import ProductModel from '@/models/ProductModel'

class ProductCtrl {
  async list() {
    const categories = await ProductModel.getProductCategories()
    let result = []
    for (const item of categories) {
      if (item?.count === null) continue
      const res = await ProductModel.getProducts(item.slug)
      result = result.concat(res)
    }
    return result
  }

  async categories() {
    const categories = await ProductModel.getProductCategories()
    return categories
  }

  async listCategories(categories) {
    const res = await ProductModel.getProducts(categories)
    return res
  }

  async productcategories() {
    let result = []

    const categories = await ProductModel.getProductCategories()
    for (const item of categories) {
      if (item?.count === null) continue
      const res = await ProductModel.getProducts(item.slug)
      const items = res.map((product) => ({
        categories: item.slug,
        slug: product.slug,
      }))
      result = result.concat(items)
    }
    console.log('result', result)
    return result
  }
}

const results = new ProductCtrl()
export default results
