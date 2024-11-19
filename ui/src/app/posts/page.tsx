import { notFound } from 'next/navigation'
import * as postService from 'modules/post/post.service'
import PostList from 'components/posts/PostList'

export default async function PostsPage() {
  const postList = await postService.getPostList()
  if (!postList?.length) {
    notFound()
  }
  return <PostList initialData={postList} />
}
