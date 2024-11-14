import * as productRepository from '@/repositories/product.repository'

const list = async () => {
  const categories = await productRepository.getProductCategories()
  let result = []
  for (const item of categories) {
    if (item?.count === null) continue
    const res = await productRepository.getProducts(item.slug)
    result = result.concat(res)
  }
  return result
}

const categories = async () => {
  const categories = await productRepository.getProductCategories()
  return categories
}

const listCategories = async (categories) => {
  const res = await productRepository.getProducts(categories)
  return res
}

const productCategories = async () => {
  let result = []

  const categories = await productRepository.getProductCategories()
  for (const item of categories) {
    if (item?.count === null) continue
    const res = await productRepository.getProducts(item.slug)
    const items = res.map((product) => ({
      categories: item.slug,
      slug: product.slug,
    }))
    result = result.concat(items)
  }
  return result
}

const detail = async (slugCategory, slugPage) => {
  const product = await productRepository.getProducts(slugCategory, slugPage)
  return product
}

export { list, categories, listCategories, productCategories, detail }
