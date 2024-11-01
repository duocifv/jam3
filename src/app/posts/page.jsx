// /app/posts/page-[page]/page.js
import PostList from "@/components/posts/PostList";
import { notFound } from "next/navigation";
import { fetchAllCursors } from "@/lib/fetchAllCursors";


export default async function PostsPage() {
  const { posts } = await fetchAllCursors();
  if (!posts) {
    notFound();
  }
  return (
    <div>
      <PostList initialData={posts} />
    </div>
  );
}
