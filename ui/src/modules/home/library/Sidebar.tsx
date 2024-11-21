import React from 'react'
import * as pageService from 'modules/page/page.service'
import * as postService from 'modules/post/post.service'
import * as authService from 'modules/auth/feature/auth.service'
import * as productService from 'modules/product/product.service'
import MenuList from 'components/MenuList'

const Sidebar = async () => {
  const [
    productCategories,
    postCategories,
    postTags,
    pageCategories,
    categoriesAuth,
  ] = await Promise.all([
    productService.getProductCategories(),
    postService.getPostCategories(),
    postService.getPostTags(),
    pageService.getPageCategories(),
    authService.getAuthCategories(),
  ])
  return (
    <div className="min-w-[380px] p-4 pl-14 mr-6 bg-[#fff] pattern-green">
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
      <MenuList initialData={categoriesAuth} path="/auth">
        Authenticate
      </MenuList>
    </div>
  )
}

export default Sidebar
