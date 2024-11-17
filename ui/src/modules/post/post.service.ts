import { queryPostList, queryPostDetail, queryPostCategories, queryPostTags } from './post.repository'

export const getPostList = async () => await queryPostList()

export const getPostDetail = async (slug?: string) => queryPostDetail(slug)

export const getPostCategories = async () => queryPostCategories()

export const getPostTags = async () => queryPostTags()

export const getPostListCategory = async (slug: string) => {
  const result = await queryPostList()
  if (!result) {
    return []
  }
  return result.filter(item => item.categories.nodes.find(item => item.slug === slug))
}

export const getPostListCategoryTags = async (slug: string) => {
  const result = await getPostList()
  if (!result) {
    return []
  }
  return result.filter(item => item.tags.nodes.find(item => item.slug === slug))
}

