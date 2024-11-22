
import { cache } from '@/shared/utils/cache'
import { paginate, query } from '@/shared/utils/httpGraphql'
import { ProductCategories, ProductCategoriesQuery, Products, ProductsQuery } from './product.type'

type TypeProductCategories =
  ProductCategoriesQuery['productCategories']['edges'][0]['node']
export const queryProductCategories = async (): Promise<
  TypeProductCategories[]
> => {
  const result = cache.list<TypeProductCategories>('productCategories2')
 
  if (result?.length) return result

  try {
    const data = await paginate<TypeProductCategories>(
      ProductCategories
    )
    
    if (data?.length) {
      console.log('error getProductCategories 555', data)
      return []
    }
    
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, { count }]) => count !== null)
    );
    
    cache.put(filteredData, 'productCategories2')
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export type TypeProductsQuery = ProductsQuery['products']['edges'][0]['node']
export const queryProducts = async (
  categorySlug?: string,
  pageSlug?: string
): Promise<TypeProductsQuery[]> => {
  if (!categorySlug && !pageSlug) {
    const data = cache.list<TypeProductsQuery>('products2')
    if (data) return data
  }
  const category = cache.get<TypeProductsQuery>(categorySlug, 'products2')
  if (category) {
    if (category[pageSlug]) return category[pageSlug]
    return Object.values(category) as []
  }

  const categories = await queryProductCategories()

  const result = {}
  for (const item of categories) {
    if (item?.count === null) continue

    const { products } = await query<ProductsQuery>(Products, {
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

export const queryProductDetail = async (categorieSlug, slug) => {
  const data = await queryProducts(categorieSlug, slug)
  if (!data) {
    console.log(data, 'error no db', categorieSlug, slug)
    return {}
  }
  return data
}
