import React from 'react'
import PostsCtrl from '@/controllers/PostsCtrl'
import PostList from '@/components/posts/PostList'

export async function generateStaticParams() {
  const tags = await PostsCtrl.tags()
  return tags.map((item) => ({ tagId: item.slug }))
}

const page = async ({ params }) => {
  const { tagId } = await params
  const posts = await PostsCtrl.list()
  return (
    <div>
      <PostList initialData={posts} tagId={tagId} />
    </div>
  )
}

export default page
