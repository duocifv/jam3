// /app/posts/page-[page]/page.js
import { fetchQuery } from "@/lib/apolloClient";
import PostList from "@/components/posts/PostList";
import { notFound } from "next/navigation";
import { GET_TOTAL_POSTS, GET_POSTS_PAGE, } from "@/queries/posts";


const limit = 10;

// Đặt biến cursors ngoài hàm
const fetchAllCursors = (() => {
  let cursors = []; // Khai báo biến cursors
  return async function () {
    if (cursors.length > 0) return cursors;

    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
      const { posts } = await fetchQuery(GET_POSTS_PAGE, {
        after: cursor,
        first: 100,
      });

      if (!posts) {
        break;
      }

      const data = posts?.edges || [];
      cursors = cursors.concat(data);

      hasNextPage = posts.pageInfo.hasNextPage;
      cursor = posts.pageInfo.endCursor;
    }

    return cursors;
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
  const data = await fetchAllCursors();
  const pageCurrent = page * limit;
  const list = data.slice(pageCurrent - limit, pageCurrent)
  if (!data) {
    notFound();
  }
  return (
    <div>
      dđ
      page: {page} : {data.length}
      {list.map((item, index) => <div key={index + item.cursor}>{item.cursor}</div>)}
      <PostList initialData={data} />
    </div>
  );
}
