import { notFound } from 'next/navigation'
import * as postService from 'modules/post/feature/post.service'
import PostList from 'modules/post/library/PostList'

export default async function PostsPage() {
  const postList = await postService.getPostList()
  if (!postList?.length) {
    notFound()
  }
  return <PostList initialData={postList} />
}
