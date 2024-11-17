import React from 'react'
import * as pageService from '@/modules/page/page.service'
import * as postService from '@/modules/post/post.service'
import * as productService from '@/modules/product/product.service'

import MenuList from '@/components/core/MenuList'

const Sidebar = async () => {
  const [productCategories, postCategories, postTags, pageCategories] =
    await Promise.all([
      productService.getProductCategories(),
      postService.getPostCategories(),
      postService.getPostTags(),
      pageService.getPageCategories(),
    ])
  return (
    <div className="min-w-[380px] border-l-[30px] p-4 bg-[#fff] border-lime-600 mr-5">
      <MenuList initialData={pageCategories} path="/pages">
        Pages Categories
      </MenuList>
      <MenuList initialData={postCategories} path="/posts">
        Posts Categories
      </MenuList>
      <MenuList initialData={postTags} path="/posts/tags">
        Posts Tags
      </MenuList>
      <MenuList initialData={productCategories} path="/products">
        Products Categories
      </MenuList>
    </div>
  )
}

export default Sidebar
