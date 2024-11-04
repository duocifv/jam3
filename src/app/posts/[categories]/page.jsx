import React from "react";
import PostList from "@/components/posts/PostList";
import db from "@/lib/cache";

export async function generateStaticParams() {
  const categories = await db.PostsCategories();

  if (!categories || categories.length === 0) {
    return [{ categories: "other" }];
  }

  return categories.map((item) => ({
    categories: item.slug,
  }));
}

const pageCategories = async ({ params }) => {
  const { categories } = await params;
  const posts = await db.Posts();
  return (
    <div>
      <PostList
        initialData={posts}
        categorieId={categories}
        categories={categories}
      />
    </div>
  );
};

export default pageCategories;
