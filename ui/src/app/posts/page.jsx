import PostList from '@/components/posts/PostList'
import { notFound } from 'next/navigation'
import * as postsService from 'server/posts.service'

export default async function PostsPage() {
  const posts = await postsService.list()
  if (!posts) {
    notFound()
  }
  return (
    <div>
      <PostList initialData={posts} />
    </div>
  )
}
