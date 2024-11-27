import { paginate } from '@/shared/utils/httpGraphql'
import {
  CategoriesPostsQuery,
  GetPosts2,
  GetPosts2Query,
  TagsPostsQuery,
} from './post.type'
import * as dbStore from '@/shared/utils/db'

const db = await dbStore.create<Data>('post', {
  posts: [],
  category: [],
  tag: []
})



export const queryPostList = async (): Promise<TypePostList[]> => {
  const { posts } = db.data
  if (posts?.length) {
    return posts
  }
  try {
    const data = await paginate(GetPosts2)
    const newData = Object.values(data)
    if (!newData?.length) {
      console.log('error getPosts ', data)
      return []
    }
    await dbStore.put(db, 'posts', newData)

    return data as []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}


export const findTag = async (): Promise<TypeTags[]> => {
  const { tag } = db.data
  if (tag?.length) {
    return tag
  }
  const tags = await queryPostList()
  const result = tags
    .map((post) => post.tags.nodes.filter((tag) => tag.slug))
    .flat()
    .filter(
      (value, index, self) =>
        self.findIndex((t) => t.slug === value.slug) === index
    )
  if(result?.length) {
    await db.update(({ tag }) => {
      return tag.push(...result)
    })
  }
  return result || []
}

export const findCategories = async (): Promise<TypeCategories[]> => {
  const { category } = db.data
  if (category?.length) {
    return category
  }
  const posts = await queryPostList()
  const result = posts
    .map((post) => post.categories.nodes.filter((category) => category.slug))
    .flat()
    .filter(
      (value, index, self) =>
        self.findIndex((t) => t.slug === value.slug) === index
    )
  if(!result?.length) return [] 
  await db.update(({ category }) => {
    return category.push(...result)
  })
  return result || []
}

export const queryPostDetail = (slug?: string): TypePost => {
  const { posts } = db.data
  const result = posts.find((post) => post.slug === slug)
  if (!result) {
    return null
  }
  return result
}



// export const queryPostTags = async (): Promise<TypeTags[]> => {
//   const result = cache.list<TypeTags>('tags3')
//   if (result?.length) return result

//   try {
//     const data = await paginate<TagsPostsQuery>(TagsPosts)
//     if (data?.length) {
//       console.log(' Tags Posts data', data)
//       return []
//     }
//     cache.put(data, 'tags3')
//     return result as []
//   } catch (error) {
//     console.error('Error get Tags Posts:', error)
//     return []
//   }
// }

type TypeCategories = CategoriesPostsQuery['categories']['edges'][0]['node']
export type TypePost = GetPosts2Query['posts']['edges'][0]['node']
type TypeTags = TagsPostsQuery['tags']['edges'][0]['node']
export type TypePostList = TypePost
type Data = {
  posts: TypePostList[] 
  category: TypeCategories[]
  tag: TypeTags[]
}