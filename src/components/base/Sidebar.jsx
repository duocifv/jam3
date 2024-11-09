import React from 'react'
import ProductCtrl from '@/controllers/server/ProductCtrl'
import PostsCtrl from '@/controllers/server/PostsCtrl'
import { notFound } from 'next/navigation'
import MenuList from '@/components/common/MenuList'

const Sidebar = async () => {
  const categoriesProducts = await ProductCtrl.categories()
  const categories = await PostsCtrl.categories()
  const tags = await PostsCtrl.tags()
  if (categories.length === 0 || tags.length === 0) {
    notFound()
  }
  return (
    <div className="min-w-[380px] border-l-[30px] p-4 bg-[#fff] border-lime-600 mr-5">
      <MenuList initialData={categories} path="/posts">
        Posts Categories
      </MenuList>
      <MenuList initialData={tags} path="/posts/tags">
        Posts Tags
      </MenuList>
      <MenuList initialData={categoriesProducts} path="/products">
        Products Categories
      </MenuList>
    </div>
  )
}

export default Sidebar
