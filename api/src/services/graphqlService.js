import config from "../../config/graphqlConfig.js";

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
    `;

    const response = await axios.post(
      config.GRAPHQL_URL,
      {
        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data.posts.nodes;
  },
};

export default graphqlService;
