import { GraphQLClient, Variables, RequestDocument } from 'graphql-request'

const endpoint = 'https://cms.duocnv.top/graphql'
const client = new GraphQLClient(endpoint)

export const query = async <T>(
  document: RequestDocument,
  variables: Variables = {},
  headers = {}
): Promise<T> => {
  try {
    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    }
    client.setHeaders(allHeaders)
    const result = await client.request<T>(document, variables)
    return result
  } catch (error) {
    console.error('Lỗi khi gọi GraphQL:', error)
    throw new Error('Không thể lấy dữ liệu từ server')
  }
}

export const paginate = async <T>(
  document: RequestDocument,
  limit = 100
): Promise<T[]> => {
  let hasNextPage = true
  let cursor: string | null = null
  let result: any = {}
  let data: any = {}

  while (hasNextPage) {
    try {
      const response: any = await query(document, {
        after: cursor,
        first: limit,
      })

      if (!response) break

      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          result = response[key]
        }
      }

      const edges = result?.edges
      if (!edges) break

      edges.forEach((edge: any) => {
        data[edge.node.slug] = edge.node
      })

      hasNextPage = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    } catch (error) {
      console.error(`Error fetching :`, error)
      break
    }
  }
  return data
}

