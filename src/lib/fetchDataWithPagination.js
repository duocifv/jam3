import { fetchData } from '@/lib/api'

export async function fetchDataWithPagination(query, type, limit = 100) {
  let hasNextPage = true
  let cursor = null
  let data = []

  while (hasNextPage) {
    try {
      const response = await fetchData(query, {
        after: cursor,
        first: limit,
      })
      const edges = response[type]?.edges

      if (!edges) break

      data.push(...edges)
      hasNextPage = response[type].pageInfo.hasNextPage
      cursor = response[type].pageInfo.endCursor
    } catch (error) {
      console.error(`Error fetching ${type}:`, error)
      break
    }
  }

  return data.reduce((acc, item) => {
    acc[item.node.slug] = item.node
    return acc
  }, {})
}
