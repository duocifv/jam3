'use client'
import Link from 'next/link'
import React from 'react'

const Categories = ({ initialData }) => {
  return (
    <div>
      <h3 className="text-3xl">Categories</h3>
      <hr />
      {initialData.map((item, index) => (
        <div key={index}>
          <Link href={`/posts/${item.slug}`}>
            {item.name} ({item.count})
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Categories
