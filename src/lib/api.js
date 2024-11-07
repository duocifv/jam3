import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:3000/graphql'

export const fetchData = async (query, variables = {}) => {
  const client = new GraphQLClient(endpoint)
  const result = await client.request(query, variables)
  return result
}
