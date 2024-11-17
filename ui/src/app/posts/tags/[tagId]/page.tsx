import React from 'react'
import * as postService from '@/modules/post/post.service'
import PostList from '@/components/posts/PostList'

export async function generateStaticParams() {
  const tags = await postService.getPostTags()
  return tags.map(({ slug }) => ({ tagId: slug }))
}

interface Props {
  params: Promise<{ tagId: string }>
}

const page = async (props: Props) => {
  const { tagId } = await props.params
  const posts = await postService.getPostListCategoryTags(tagId)
  return (
    <div>
      <PostList initialData={posts} tagId={tagId} />
    </div>
  )
}

export default page
