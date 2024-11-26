import React from 'react'
import * as pageService from '@/modules/page/feature/page.service'
import * as postService from 'modules/post/feature/post.service'
import * as productService from 'modules/product/feature/product.service'
import MenuList from 'components/MenuList'

// Hàm xử Service (login)
export const getAuthCategories = () => {
  const data = [
    {
      slug: 'login',
      name: 'login',
    },
    {
      slug: 'profile',
      name: 'profile',
    },
    {
      slug: 'register',
      name: 'register',
    },
    {
      slug: 'forgot',
      name: 'forgot',
    },
  ]
  return data
}

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
    getAuthCategories(),
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
