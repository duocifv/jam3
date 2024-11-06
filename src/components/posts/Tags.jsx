'use client'
import Link from 'next/link'
//import { usePathname } from "next/navigation";
import React from 'react'

const Tags = ({ initialData }) => {
  // const pathname = usePathname();
  // const parts = pathname.split('/').filter(Boolean);
  // const category = parts[1] || "all";
  return (
    <div>
      <h3 className="text-3xl">Tags</h3>
      <hr />
      {initialData.map((item, index) => {
        const tagUrl = `/posts/tags/${item.slug}`
        return (
          <div key={index}>
            <Link href={tagUrl}>
              {item.name} ({item.count})
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Tags
