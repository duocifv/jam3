// /app/posts/page-[page]/page.js
import PostList from "@/components/posts/PostList";
import { notFound } from "next/navigation";
import PostsCtrl from "@/controllers/PostsCtrl"

export default async function PostsPage() {
  const posts = await PostsCtrl.list();
  if (!posts) {
    notFound();
  }
  return (
    <div>
      <PostList initialData={posts} />
    </div>
  );
}
