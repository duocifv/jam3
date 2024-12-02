'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import React from 'react'
import { useStore } from '@/stores/useStore'
import { debounce } from '@/utils/debounce'
import PostController from 'modules/post/library/controller/PostController'
import { TypePostList } from 'modules/post/feature/post.repository'

const Search = ({ initialData, categorieId, categories, tagId }) => {
  const posts = useStore((state) => state.posts)
  const sortBy = useStore((state) => state.sortBy)
  const [page, loadMore] = useState(1)
  const searchQuery = useStore((state) => state.searchQuery)
  const setSearchQuery = useStore((state) => state.setSearchQuery)
  const handleSearch = debounce((value) => {
    setSearchQuery(value)
  }, 80)

  /* List */
  const list = posts.length === 0 ? initialData : posts
  let fillPosts = initialData

  if (categories) {
    fillPosts = list.filter((item) =>
      item?.categories?.nodes?.some((node) => node?.slug === categories)
    )
  }

  if (tagId) {
    fillPosts = list.filter((item) =>
      item?.tags?.nodes?.some((node) => node?.slug === tagId)
    )
  }

  const isScroll = fillPosts.length >= 10
  const listPage = isScroll ? fillPosts.slice(0, page * 10) : fillPosts

  /* Search */
  const filteredPosts = list.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const observerRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore(page + 1)
      },
      { threshold: 1 }
    )

    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loadMore, isScroll, page])

  return (
    <div className="my-4">
      <div>
        <button onClick={() => sortBy('title')}>Sort Title</button> |
        <button onClick={() => sortBy('date')}>Sort Date</button>
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mb-4 p-2 border border-gray-300"
          />
          {searchQuery && (
            <div className="max-h-[500px] w-full bg-white overflow-auto absolute top-12 p-4">
              <button
                className="bg-gray-300 ml-auto w-[120px] block"
                onClick={() => handleSearch('')}
              >
                Close
              </button>
              <ul>
                {filteredPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <h3>{post.title}</h3>
                    <p>{post.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap max-w-[1200px] mx-auto m-6 min-h-[100vh]">
        {listPage.map((node, index) => {
          const categorySlug =
            categorieId || node?.categories?.nodes[0]?.slug || 'orther'

          return (
            <div key={index} className="bg-slate-400 border w-1/2 p-4">
              <Link href={`/posts/${categorySlug}/${node.slug}`}>
                <h2
                  className="text-3xl mb-2"
                  dangerouslySetInnerHTML={{ __html: node.title }}
                />
                <div
                  className="text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: node.date }}
                />
                <hr className="mb-4" />
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Link>
            </div>
          )
        })}
      </div>
      <div ref={observerRef} style={{ height: '20px' }} />
    </div>
  )
}

interface IPostList {
  initialData: TypePostList[]
  categorieId?: string
  categories?: string
  tagId?: string
}
const PostList = ({
  initialData,
  categorieId,
  categories,
  tagId,
}: IPostList) => {
  return (
    <PostController initialData={initialData}>
      <Search
        initialData={initialData}
        categorieId={categorieId}
        categories={categories}
        tagId={tagId}
      />
    </PostController>
  )
}

export default PostList
