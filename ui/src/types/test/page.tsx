// import * as postService from '@/modules/post/post.service'
// import * as pageService from '@/modules/post/page.service'
// import * as productService from '@/modules/post/product.service'
// import Layout from '@/components/layout/Layout'
// import PostsClientPage from './client.page'

// const PostsPage = async () => {
//   const postList = await postService.getPostList()
//   const postTags = await postService.getPostTags()
//   const postCategories = await postService.getPostCategories()

//   const pagesList = pageService.getPagesList()
//   const pageDetail = pageService.getPageDetail('hello')
//   const pagePath = pageService.getPagePath()
//   const pageCategories = pageService.getPageCategories()

//   const productCategories = await productService.getProductCategories()
//   const productList = await productService.getProductList()
//   const productListCategory = await productService.getProductListCategory('ok')
//   const productPath = await productService.getProductPath()
//   const getProducts = await productService.getProducts('12', '12')

//   const data = {
//     post: {
//       name: 'duoc',
//       body: 'duoc helllo',
//     },
//   }
//   return (
//     <Layout>
//       <PostsClientPage {...data} />
//     </Layout>
//   )
// }

// export default PostsPage
