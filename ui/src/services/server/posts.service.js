import * as postsRepository from '@/repositories/posts.repository'

const list = async (slug) => {
  const data = await postsRepository.getPosts(slug)
  return data
}

const categories = async () => {
  const data = await postsRepository.getCategories()
  return data
}

const tags = async () => {
  const data = await postsRepository.getTags()
  return data
}

export { list, categories, tags }
