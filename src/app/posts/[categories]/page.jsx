import React from 'react'
import PostList from '@/components/posts/PostList'
import PostsCtrl from '@/controllers/PostsCtrl'

export async function generateStaticParams() {
  const categories = await PostsCtrl.categories()
  if (!categories || categories.length === 0) {
    return [{ categories: 'other' }]
  }

  return categories.map((item) => ({
    categories: item.slug,
  }))
}

const pageCategories = async ({ params }) => {
  const { categories } = await params
  const posts = await PostsCtrl.list()
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
