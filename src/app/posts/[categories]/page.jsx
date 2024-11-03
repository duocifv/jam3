import React from "react";
import PostList from "@/components/posts/PostList";
import db from "@/lib/cache";

export async function generateStaticParams() {
  const categories = await db.PostsCategories();

  if (!categories) {
    notFound();
  }

  return categories.map((item) => ({
    categories: item.slug,
  }));
}

const pageCategories = async ({ params }) => {
  const { categories } = await params;
  const posts = await db.Posts();
  const filteredPosts = posts.filter(
    (post) =>
      post?.categories?.nodes?.some((node) => node?.slug === categories)
  );
  return (
    <div>
      <PostList initialData={filteredPosts} categorieId={categories} />
    </div>
  );
};

export default pageCategories;
