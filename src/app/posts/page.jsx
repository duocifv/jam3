// /app/posts/page-[page]/page.js
import PostList from "@/components/posts/PostList";
import { notFound } from "next/navigation";
import db from "@/lib/cache";

export default async function PostsPage() {
  const posts = await db.Posts();
  if (!posts) {
    notFound();
  }
  return (
    <div>
      <PostList initialData={posts} />
    </div>
  );
}
