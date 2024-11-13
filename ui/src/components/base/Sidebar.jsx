import React from 'react'
import ProductCtrl from '@/controllers/server/ProductCtrl'
import PostsCtrl from '@/controllers/server/PostsCtrl'
import PagesCtrl from '@/controllers/server/PagesCtrl'
import MenuList from '@/components/common/MenuList'

const Sidebar = async () => {
  const [productsCategories, postsCategories, PostsTags, PagesList] =
    await Promise.all([
      ProductCtrl.categories(),
      PostsCtrl.categories(),
      PostsCtrl.tags(),
      PagesCtrl.list(),
    ])

  return (
    <div className="min-w-[380px] border-l-[30px] p-4 bg-[#fff] border-lime-600 mr-5">
      <MenuList initialData={PagesList} path="/pages">
        Pages Categories
      </MenuList>
      <MenuList initialData={postsCategories} path="/posts">
        Posts Categories
      </MenuList>
      <MenuList initialData={PostsTags} path="/posts/tags">
        Posts Tags
      </MenuList>
      <MenuList initialData={productsCategories} path="/products">
        Products Categories
      </MenuList>
    </div>
  )
}

export default Sidebar
