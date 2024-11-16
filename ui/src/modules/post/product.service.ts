import { ProductCategoriesDocument, ProductsDocument, ProductsQuery } from '@/gql/graphql';
import { cache } from '@/lib/cache';
import { paginate, query } from '@/lib/grapql';

export const getProductCategories = async () => {
  const result = cache.read('productCategories2')
  if (result?.length) return result;

  try {
    const data = await paginate(ProductCategoriesDocument);
    if (!data?.length) {
      console.log("error getPosts", data)
      return []
    }
    cache.write(data, 'productCategories2');
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export const getProducts = async (categorySlug: string, pageSlug: string) => {
  if (!categorySlug && !pageSlug) return []

  const data = cache.read('products2')
  if (categorySlug && data[categorySlug]) {
    if (pageSlug && data[categorySlug][pageSlug])
      return data[categorySlug][pageSlug]
    return data[categorySlug]
  }

  const categories: any[] = await getProductCategories()

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
  cache.write(Object.keys(result), 'products2')

  if (categorySlug && result[categorySlug]) {
    if (pageSlug && result[categorySlug][pageSlug])
      return result[categorySlug][pageSlug]
    return result[categorySlug]
  }

  return []
}


export const getProductPath = async () => {
  let result = []
  try {
    const categories: any[] = await getProductCategories()
    if (!categories?.length) {
      console.log("not array productPath")
      return []
    }
    for (const item of categories) {
      if (item?.count === null) continue
      const res = await getProducts(item.productCategoryId, item.slug)
      if (!res?.length) break
      const items = res.map((product) => ({
        categories: item.slug,
        slug: product.slug,
      }))
      result = result.concat(items)
    }
  } catch (error) {
    console.log("error api getProductCategories")
  }

  return result
}


export const getProductList = async () => {
  const categories: any[] = await getProductCategories()
  let result = []
  for (const item of categories) {
    if (item?.count === null) continue
    const res = await getProducts(item.productCategoryId, item.slug)
    result = result.concat(res)
  }
  return result
}


export const getProductListCategory = async (categories) => {
  return await getProducts(categories, undefined)
}