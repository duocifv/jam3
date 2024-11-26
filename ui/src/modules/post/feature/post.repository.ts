
import { cache } from '@/shared/utils/cache'
import { paginate } from '@/shared/utils/httpGraphql'
import { CategoriesPosts, CategoriesPostsQuery, GetPosts2, GetPosts2Query, TagsPosts, TagsPostsQuery } from './post.type'


export type TypePost = GetPosts2Query['posts']['edges'][0]['node']
export type TypePostList = TypePost

export const queryPostList = async (): Promise<TypePostList[]> => {
  const result = cache.list<TypePostList>('posts4')
  if (result?.length) {
    return result
  }

  try {
    const data = await paginate(GetPosts2)
    if (!data?.length) {
      console.log('error getPosts', data)
      return []
    }
    cache.put(data, 'posts4')
    return data as []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const queryPostDetail = async (slug?: string): Promise<TypePost> => {
  const result = cache.get<TypePost>(slug, 'posts4')
  if (!result) {
    return null
  }
  return result
}

type TypeCategories = CategoriesPostsQuery["categories"]["edges"][0]["node"]
export const queryPostCategories = async (): Promise<TypeCategories[]> => {
  const result = cache.list<TypeCategories>('categories2')
  if (result?.length) return result

  try {
    const data = await paginate<CategoriesPostsQuery>(CategoriesPosts)
    if (data?.length) {
      console.log(' error getCategories', data)
      return []
    }
    cache.put(data, 'categories2')
  } catch (error) {
    console.error('Error get Categories:', error)
    return []
  }
}

type TypeTags = TagsPostsQuery["tags"]["edges"][0]["node"]
export const queryPostTags = async (): Promise<TypeTags[]> => {
  const result = cache.list<TypeTags>('tags3')
  if (result?.length) return result

  try {
    const data = await paginate<TagsPostsQuery>(TagsPosts)
    if (data?.length) {
      console.log(' Tags Posts data', data)
      return []
    }
    cache.put(data, 'tags3')
    return result as []
  } catch (error) {
    console.error('Error get Tags Posts:', error)
    return []
  }
}

