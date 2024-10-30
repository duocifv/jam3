import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });
}

export async function fetchQuery(query, variables = {}) {
  const client = createApolloClient();
  const { data } = await client.query({
    query,
    variables,
  });
  return data;
}
