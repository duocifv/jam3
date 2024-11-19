import React from 'react'
import PostList from 'components/posts/PostList'
import * as postService from 'modules/post/post.service'

export async function generateStaticParams() {
  const categories = await postService.getPostCategories()
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
  const posts = await postService.getPostListCategory(categories)
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
