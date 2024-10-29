// /app/posts/page-[page]/page.js
import { fetchQuery } from "@/lib/apolloClient"; // Thay đổi theo cách bạn quản lý Apollo Client
import PostList from "@/components/posts/PostList";
import Pagination from "@/components/commonI/Pagination";
import { notFound } from "next/navigation";
import { GET_POSTS_PAGE, GET_PATH_POSTS } from "@/queries/posts";

const limit = 10;

export async function generateStaticParams() {
  const params = [];
  let hasNextPage = true;
  let cursor = null;
  
  while (hasNextPage) {
    const { posts } = await fetchQuery(GET_PATH_POSTS, {
      first: limit,
      after: cursor,
    });
    if (!posts || !posts.edges) {
      break; // Thoát nếu không có dữ liệu
    }
    params.push({
      cursor,
      page: (params.length + 1).toString(),
    });
    hasNextPage = posts.pageInfo.hasNextPage;
    cursor = posts.pageInfo.endCursor;
  }
  return params
}

export default async function PostsPage({ params }) {
  const { page } = await params;
  const data = [];
  const pageNumber = parseInt(page, 10) - 1;
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const { posts } = await fetchQuery(GET_POSTS_PAGE, {
      first: limit,
      after: cursor,
    });
    if (!posts || !posts.edges) {
      break; // Thoát nếu không có dữ liệu
    }
    data.push({
      posts: posts?.edges || [],
      pageInfo: {
        perPage: data.length + 1,
        nextPage: posts.pageInfo.hasNextPage,
        previousPage: posts.pageInfo.hasPreviousPage,
      },
    });
    hasNextPage = posts.pageInfo.hasNextPage;
    cursor = posts.pageInfo.endCursor;
  }
  if (!page || pageNumber < 0 || pageNumber >= data.length || !data[pageNumber].posts) {
    notFound(); // Gọi notFound nếu không có dữ liệu
  }
  return (
    <div>
      page: {pageNumber} : {data.length}
      <PostList initialData={data[pageNumber].posts} />
      <Pagination
        currentPage={page}
        pageInfo={data[pageNumber]?.pageInfo}
        toltal={data.length}
      />
    </div>
  );
}
