import DataLoader from 'dataloader'
import { GET_POSTS_BY_SLUGS } from '@/queries/posts'
import { fetchQuery } from '@/lib/apolloClient'

export const fetchAllPosts = async () => {
  let hasNextPage = true
  let cursor = null
  let data = []
  // Lấy tất cả bài đăng một lần
  while (hasNextPage) {
    const { posts } = await fetchQuery(GET_POSTS_BY_SLUGS, {
      after: cursor,
      first: 100,
    })

    if (!posts) break

    data.push(...posts.edges)

    hasNextPage = posts.pageInfo.hasNextPage
    cursor = posts.pageInfo.endCursor
  }
  return data
}

export const postLoader = new DataLoader(async (slugs) => {
  const allPosts = await fetchAllPosts()
  const postMap = allPosts.reduce((acc, post) => {
    acc[post.node.slug] = post.node // Lưu bài đăng theo slug
    return acc
  }, {})
  return slugs.map((slug) => postMap[slug] || null)
})
