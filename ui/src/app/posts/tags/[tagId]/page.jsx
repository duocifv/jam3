import React from 'react'
import * as postsService from 'server/posts.service'
import PostList from '@/components/posts/PostList'

export async function generateStaticParams() {
  const tags = await postsService.tags()
  return tags.map((item) => ({ tagId: item.slug }))
}

const page = async ({ params }) => {
  const { tagId } = await params
  const posts = await postsService.list()
  return (
    <div>
      <PostList initialData={posts} tagId={tagId} />
    </div>
  )
}

export default page
