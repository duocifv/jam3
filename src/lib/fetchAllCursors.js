import { fetchQuery } from '@/lib/apolloClient'
import { GET_CATEGORIES_AND_POSTS } from '@/queries/posts'

let categories = []
let posts = []

export const fetchAllCursors = async () => {
  // Nếu đã có dữ liệu, trả về ngay lập tức
  if (categories.length > 0 && posts.length > 0) {
    return { categories, posts }
  }

  let hasMoreCategories = true
  let hasMorePosts = true
  let categoryCursor = null
  let postCursor = null

  while (hasMoreCategories || hasMorePosts) {
    const data = await fetchQuery(GET_CATEGORIES_AND_POSTS, {
      categoriesAfter: categoryCursor,
      categoriesFirst: 100,
      postsAfter: postCursor,
      postsFirst: 100,
    })

    // Xử lý categories
    if (hasMoreCategories) {
      const categoryData = data?.categories?.edges || []
      categories = categories.concat(categoryData)

      hasMoreCategories = data?.categories?.pageInfo?.hasNextPage || false
      categoryCursor = data?.categories?.pageInfo?.endCursor || null
    }

    // Xử lý posts
    if (hasMorePosts) {
      const postData = data?.posts?.edges || []
      posts = posts.concat(postData)

      hasMorePosts = data?.posts?.pageInfo?.hasNextPage || false
      postCursor = data?.posts?.pageInfo?.endCursor || null
    }
  }

  return { categories, posts }
}
