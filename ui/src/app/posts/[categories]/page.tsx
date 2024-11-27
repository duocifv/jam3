import React from 'react'
import PostList from 'modules/post/library/PostList'
import * as postService from 'modules/post/feature/post.service'

export async function generateStaticParams() {
  const categories = await postService.getCategories()
  if (!categories?.length) {
    return [{ categories: 'other' }]
  }
  return categories.map(({ slug }) => ({
    categories: slug,
  }))
}

interface Props {
  params: Promise<{ categories: string }>
}

const PagePostCategories = async (props: Props) => {
  const { categories } = await props.params
  const posts = await postService.getPostByCategory(categories)
  return (
    posts?.length &&
    categories && (
      <PostList
        initialData={posts}
        categorieId={categories}
        categories={categories}
      />
    )
  )
}

export default PagePostCategories
