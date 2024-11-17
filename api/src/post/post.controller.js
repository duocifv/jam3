const { allPosts } = require('./post.service.js');

exports.posts = async (req, res) => {
  try {
    const posts = await allPosts();  // Gọi service để lấy bài viết
    res.json(posts);  // Trả kết quả về cho client
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

