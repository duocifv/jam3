const { getAllPosts } = require('./post.service.js');

exports.posts = async (req, res) => {
  try {
    const result = await getAllPosts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

