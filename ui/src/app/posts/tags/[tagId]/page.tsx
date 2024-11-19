import React from 'react'
import * as postService from 'modules/post/post.service'
import PostList from 'components/posts/PostList'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = await postService.getPostTags()
  if(!tags?.length) {
    console.log("generateStaticParams TagsPage", tags)
    return [{
      tagId: "index"
    }]
  }
  return tags?.map(({ slug }) => ({ tagId: slug }))
}

interface Props {
  params: Promise<{ tagId: string }>
}

const TagsPage= async (props: Props) => {
  const { tagId } = await props.params
  if(!tagId) {
    notFound()
  }
  const posts = await postService.getPostListCategoryTags(tagId)
  return (
    <div>
      <PostList initialData={posts} tagId={tagId} />
    </div>
  )
}

export default TagsPage
