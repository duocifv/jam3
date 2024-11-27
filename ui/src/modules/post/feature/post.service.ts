import {
  queryPostList,
  queryPostDetail,
  findCategories,
  findTag,
} from './post.repository'

export const getPostList = async () => await queryPostList()

export const getPostDetail = async (slug?: string) => queryPostDetail(slug)

export const getPostTags = async () => {
  const data = await findTag()
  return data
}

export const getCategories = async () => {
  const result = await findCategories()
  return result || []
}

export const getPostByCategory = async (slug?: string) => {
  const data = await queryPostList()
  const result = data.filter((item) => item.categories.nodes.find((i) => i.slug === slug))
  return result || []
}

export const getPostListCategoryTags = async (slug: string) => {
  const result = await queryPostList()

  if (!result?.length) {
    return []
  }
  return result.filter((item) =>
    item.tags.nodes.find((item) => item.slug === slug)
  )
}
