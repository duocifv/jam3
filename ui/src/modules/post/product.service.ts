import {
  ProductCategoriesDocument,
  ProductsDocument,
  ProductsQuery,
  ProductCategoriesQuery
} from '@/gql/graphql'
import { cache } from '@/lib/cache'
import { paginate, query } from '@/lib/grapql'

type TypeProductCategories = ProductCategoriesQuery["productCategories"]["edges"][0]["node"]
export const getProductCategories = async (): Promise<TypeProductCategories[]> => {
  const result = cache.list<TypeProductCategories>('productCategories2')
  if (result?.length) return result

  try {
    const data = await paginate<TypeProductCategories>(ProductCategoriesDocument)
    if (data?.length) {
      console.log('error getProductCategories', data)
      return []
    }
    cache.put(data, 'productCategories2')
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}


export type TypeProductsQuery = ProductsQuery["products"]["edges"][0]["node"]
export const getProducts = async (categorySlug: string, pageSlug?: string): Promise<TypeProductsQuery[]> => {

  if (!categorySlug && !pageSlug) return []

  const data = cache.list<TypeProductsQuery>('products2')
  if (categorySlug && data[categorySlug]) {
    if (pageSlug && data[categorySlug][pageSlug])
      return data[categorySlug][pageSlug]
    return data[categorySlug]
  }

  const categories = await getProductCategories()

  const result = {}
  for (const item of categories) {
    if (item?.count === null) continue

    const { products } = await query<ProductsQuery>(ProductsDocument, {
      first: Number(item.count),
      categoryId: Number(item.productCategoryId),
    })

    if (products && Array.isArray(products.edges)) {
      const productList = await products.edges.reduce((acc, child) => {
        if (child.node && child.node.slug) {
          acc[child.node.slug] = {
            ...child.node,
            categories: {
              slug: item?.slug,
              name: item?.name,
            },
          }
        }
        return acc
      }, {})

      result[item.slug] = productList
    } else {
      console.log(`No products found for category: ${item.slug}`)
    }
  }
  cache.put(result, 'products2')

  if (categorySlug && result[categorySlug]) {
    if (pageSlug && result[categorySlug][pageSlug])
      return result[categorySlug][pageSlug]
    return result[categorySlug]
  }

  return []
}

export const getProductDetail = async (categorieSlug: string, slug: string) => {
  const data = cache.get(categorieSlug, 'products2')
  console.log("data", data)
  return {}
}

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
    let result:TypeProductsQuery[] = []
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
    const data = Object.values(await getProducts(categories, undefined))
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