const postRepository = require('../repositories/post.repository.js');

getAllPosts = async () => {
  return await postRepository.getAllPosts();
};

module.exports = { getAllPosts };