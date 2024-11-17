const { getdAllPosts } = require("./post.repository.js");

exports.allPosts = async () => {
  try {
    const posts = await getdAllPosts();  // Gọi repository để lấy danh sách bài viết
    return posts;
  } catch (error) {
    throw new Error('Error in service: ' + error.message);
  }
};
