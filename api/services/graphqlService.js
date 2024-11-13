import config from '../config/graphqlConfig.js'

const graphqlService = {
  async fetchPosts() {
    const query = `
      query {
        posts {
          nodes {
            title
            content
            date
          }
        }
      }
    `

    const response = await fetch(config.GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const result = await response.json()
    return result.data.posts.nodes
  },
}

export default graphqlService
