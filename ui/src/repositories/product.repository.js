import { gql } from 'graphql-request'
import Cache from '@/lib/cache'
import { fetchDataWithPagination } from '@/lib/fetchDataWithPagination'
import { fetchData } from '@/lib/api'

const fetchProductCategories = async () => {
  const result = await fetchDataWithPagination(
    gql`
      query ProductCategories($first: Int, $after: String) {
        productCategories(first: $first, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              productCategoryId
              count
              name
              slug
            }
          }
        }
      }
    `,
    'productCategories'
  )
  return result
}

const fetchProducts = async (productFirst, productCategoryId) => {
  return await fetchData(
    gql`
      query Products($first: Int, $categoryId: Int) {
        products(first: $first, where: { categoryId: $categoryId }) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              slug
              name
              description
              onSale
              reviewCount
              shortDescription
              sku
              image {
                sourceUrl
              }
              type
              ... on VariableProduct {
                productId
                price(format: FORMATTED)
                salePrice(format: FORMATTED)
                reviews {
                  averageRating
                }
              }
              ... on ExternalProduct {
                productId
                price(format: FORMATTED)
                salePrice(format: FORMATTED)
                reviews {
                  averageRating
                }
              }
              ... on GroupProduct {
                productId
                price(format: FORMATTED)
                salePrice(format: FORMATTED)
                reviews {
                  averageRating
                }
              }
              ... on SimpleProduct {
                productId
                price(format: FORMATTED)
                salePrice(format: FORMATTED)
                reviews {
                  averageRating
                }
              }
              ... on SimpleProductVariation {
                price(format: FORMATTED)
                salePrice(format: FORMATTED)
              }
            }
          }
        }
      }
    `,
    {
      first: Number(productFirst),
      categoryId: Number(productCategoryId),
    }
  )
}

const getProductCategories = async () => {
  const data = Cache.read('productCategories')
  if (Object.keys(data).length) {
    return Object.values(data)
  }

  const productCategories = fetchProductCategories()
  Cache.write('productCategories', productCategories)
  return Object.values(productCategories) || []
}

const getProducts = async (categorySlug, pageSlug) => {
  if (!categorySlug && !pageSlug) return []

  const data = Cache.read('products')
  if (categorySlug && data[categorySlug]) {
    if (pageSlug && data[categorySlug][pageSlug])
      return data[categorySlug][pageSlug]
    return Object.values(data[categorySlug])
  }

  const categories = await getProductCategories()

  let result = {}
  for (const item of categories) {
    if (item?.count === null) continue

    const { products } = await fetchProducts(item.count, item.productCategoryId)

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
  Cache.write('products', result)

  if (categorySlug && result[categorySlug]) {
    if (pageSlug && result[categorySlug][pageSlug])
      return result[categorySlug][pageSlug]
    return Object.keys(result[categorySlug])
  }

  return []
}

export { getProducts, getProductCategories }
