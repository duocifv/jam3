// src/repositories/post.repository.js
const axios = require('axios');

const endpoint = 'https://cms.duocnv.top/graphql';

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

exports.getAllPosts = async () => {
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

