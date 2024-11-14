import React from 'react'
import PostList from '@/components/posts/PostList'
import * as postsService from 'server/posts.service'

export async function generateStaticParams() {
  const categories = await postsService.categories()
  if (!categories || categories.length === 0) {
    return [{ categories: 'other' }]
  }

  return categories.map((item) => ({
    categories: item.slug,
  }))
}

const pageCategories = async ({ params }) => {
  const { categories } = await params
  const posts = await postsService.list()
  return (
    <div>
      <PostList
        initialData={posts}
        categorieId={categories}
        categories={categories}
      />
    </div>
  )
}

export default pageCategories
