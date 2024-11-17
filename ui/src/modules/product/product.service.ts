import { cache } from '@/lib/cache'
import { queryProductCategories, queryProducts, queryProductDetail, TypeProductsQuery } from './product.repository'


export const getProductCategories = async () => queryProductCategories()

export const getProducts = async (categorySlug: string) => queryProducts(categorySlug)

export const getProductDetail = async (categorieSlug: string) => queryProductDetail(categorieSlug)

type ProductPath = { categories: string, slug: string }
export const getProductPath = async (): Promise<ProductPath[]> => {
  let result = []
  try {
    const categories = await getProductCategories()

    if (!categories?.length) {
      console.log('not array productPath')
      return [{
        categories: '',
        slug: ''
      }]
    }

    for (const item of categories) {
      if (item?.count === null) continue
      const res = Object.values(await getProducts(item.slug))
      if (!res?.length) break
      const items = res.map((product) => ({
        categories: item.slug,
        slug: product.slug,
      }))
      result = result.concat(items)
    }
  } catch (error) {
    console.log('error api getProductCategories')
  }
  return result
}

export const getProductCategoriesPath = async (): Promise<{
  categories: string
}[]> => {
  try {
    const data = await getProductCategories()
    if (!data?.length) {
      console.log("error: not data getProductCategoriesPath", data)
      return [{
        categories: ''
      }]
    }
    const params = data.map(item => ({
      categories: item.slug
    }))
    return params
  } catch (error) {
    console.log(`error: api getProductCategoriesPath ${error}`)
    return []
  }

}


export const getProductList = async () => {
  try {
    const categories = await getProductCategories()
    if (!categories?.length) {
      console.log("error: not data getProductList", categories)
      return []
    }
    let result: TypeProductsQuery[] = []
    for (const item of categories) {
      if (item?.count === null) continue
      const res = await getProducts(item.slug)
      result = result.concat(res)
    }
    return result
  } catch (error) {
    console.log(`error: api getProductList ${error}`)
    return []
  }
}

export const getProductListCategory = async (categories) => {
  try {
    const data = Object.values(await getProducts(categories))
    if (!data?.length) {
      console.log("error: not data getProductListCategory", data)
      return []
    }
    return data
  } catch (error) {
    console.log(`error: api getProductListCategory ${error}`)
    return []
  }
}