import Link from 'next/link'
import React from 'react'
import * as postService from 'modules/post/feature/post.service'

export async function generateStaticParams() {
  const postList = await postService.getPostList()
  if (!postList?.length) return []
  let params = []

  postList.forEach((items) => {
    if (!items?.categories || items?.categories?.nodes.length === 0) {
      return params.push({
        categories: 'orther',
        slug: items.slug,
      })
    }
    return items?.categories?.nodes.forEach((item) => {
      return params.push({
        categories: item.slug,
        slug: items.slug,
      })
    })
  })

  return params
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await postService.getPostDetail(slug)

  if (!post) {
    return {
      title: 'not title',
      description: 'not description',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

const DetailPage = async ({ params }) => {
  const { slug } = await params
  const post = await postService.getPostDetail(slug)
  return (
    <main className="w-[800px] p-8 mx-auto bg-gray-300 m-6">
      <Link href="/posts/">Back to Posts</Link>
      {post.title && <h2 className="text-4xl mb-6">{post.title}</h2>}
      <p className="mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
    </main>
  )
}

export default DetailPage
