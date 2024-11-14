// src/repositories/post.repository.js
const axios = require('axios'); // Import axios

const endpoint = 'https://cms.duocnv.top/graphql'; // Địa chỉ endpoint WPGraphQL

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

const getAllPosts = async () => {
  try {
    const response = await axios.post(endpoint, {
      query: query
    });
    return response.data.data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Error fetching posts');
  }
};

module.exports = { getAllPosts }; // Export hàm
