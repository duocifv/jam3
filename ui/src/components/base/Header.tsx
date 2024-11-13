import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="bg-gray-400">
      <menu className="flex justify-center">
        <li className="m-4">
          <Link href="/posts/">POSTS</Link>
        </li>
        <li className="m-4">
          <Link href="/products/">PRODUCTS</Link>
        </li>
      </menu>
    </div>
  )
}

export default Header
