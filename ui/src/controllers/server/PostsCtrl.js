import PostsModel from '@/services/PostsModel'

class PostsCtrl {
  async list(slug) {
    const posts = await PostsModel.getPosts(slug)
    return posts
  }
  async categories() {
    const categories = await PostsModel.getCategories()
    return categories
  }
  async tags() {
    const tags = await PostsModel.getTags()
    return tags
  }
}

const results = new PostsCtrl()
export default results
