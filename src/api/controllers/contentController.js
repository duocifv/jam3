import graphqlService from '../services/graphqlService.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await graphqlService.fetchPosts()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
