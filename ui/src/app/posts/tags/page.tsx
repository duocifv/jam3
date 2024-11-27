import { getPostTags } from '@/modules/post/feature/post.service'
import Link from 'next/link'
import React from 'react'

const Tags = async () => {
  const data = await getPostTags()
  return (
    <div>
      Hello Tags
      {data?.map((item) => (
        <div key={item.id}>
          <Link href={`/posts/tags/${item.slug}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Tags
