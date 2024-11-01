import React from "react";
import { fetchAllCursors } from "@/lib/fetchAllCursors";
import PostList from "@/components/posts/PostList";


export async function generateStaticParams() {
  const { categories } = await fetchAllCursors();

  if (!categories) {
    notFound();
  }

  return categories.map(({ node }) => ({
    categories: node.slug,
  }));
}


const pageCategories = async ({ params }) => {
  const { categories } = await params;
  const { posts } = await fetchAllCursors();
  const data = posts.filter(({ node }) => {
    const item = node?.categories?.nodes.find((item) => item.slug === categories)
    if(item) return item
  }
   
  );
  return (
    <div>
      <PostList initialData={data} categorieId={categories}/>
    </div>
  );
};

export default pageCategories;
