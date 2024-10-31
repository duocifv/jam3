// /app/posts/page-[page]/page.js
import { fetchQuery } from "@/lib/apolloClient";
import PostList from "@/components/posts/PostList";
import { notFound } from "next/navigation";
import { GET_TOTAL_POSTS, GET_CATEGORIES_AND_POSTS } from "@/queries/posts";
import Categories from "@/components/posts/Categories";

const limit = 10;

const fetchAllCursors = (() => {
  let categories = [];
  let posts = [];

  return async function () {
    // Nếu đã có dữ liệu, trả về ngay lập tức
    if (categories.length > 0 && posts.length > 0) {
      return { categories, posts };
    }

    let hasMoreCategories = true;
    let hasMorePosts = true;
    let categoryCursor = null;
    let postCursor = null;

    while (hasMoreCategories || hasMorePosts) {
      const data = await fetchQuery(GET_CATEGORIES_AND_POSTS, {
        categoriesAfter: categoryCursor,
        categoriesFirst: 100,
        postsAfter: postCursor,
        postsFirst: 100,
      });

      // Xử lý categories
      if (hasMoreCategories) {
        const categoryData = data?.categories?.edges || [];
        categories = categories.concat(categoryData);

        hasMoreCategories = data?.categories?.pageInfo?.hasNextPage || false;
        categoryCursor = data?.categories?.pageInfo?.endCursor || null;
      }

      // Xử lý posts
      if (hasMorePosts) {
        const postData = data?.posts?.edges || [];
        posts = posts.concat(postData);

        hasMorePosts = data?.posts?.pageInfo?.hasNextPage || false;
        postCursor = data?.posts?.pageInfo?.endCursor || null;
      }
    }

    return { categories, posts };
  };
})();

export async function generateStaticParams() {
  const { posts } = await fetchQuery(GET_TOTAL_POSTS);
  const totalCount = posts?.totalCount || 0;
  const totalPage = Math.ceil(totalCount / limit);
  const params = Array.from({ length: totalPage }, (_, i) => ({
    page: `${i + 1}`,
  }));
  return params;
}

export default async function PostsPage({ params }) {
  const { page } = await params;
  const { posts, categories } = await fetchAllCursors();
  const pageCurrent = page * limit;
  const list = posts.slice(pageCurrent - limit, pageCurrent);
  if (!list) {
    notFound();
  }
  return (
    <div className="flex max-w-[1300px] mx-auto">
      <Categories initialData={categories} />
      <div>
        page: {page} : {posts.length}
        <PostList initialData={list} />
      </div>
    </div>
  );
}
