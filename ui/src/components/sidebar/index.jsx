import React from 'react'
import * as pagesService from '@/services/server/pages.service'
import * as postsService from '@/services/server/posts.service'
import * as productService from '@/services/server/product.service'
import MenuList from '@/components/core/MenuList'

const Sidebar = async () => {
  const [productsCategories, postsCategories, PostsTags, PagesList] =
    await Promise.all([
      productService.categories(),
      postsService.categories(),
      postsService.tags(),
      pagesService.list(),
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
