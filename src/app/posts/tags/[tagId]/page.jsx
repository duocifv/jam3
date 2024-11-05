import React from "react";
import db from "@/lib/cache";
import PostList from "@/components/posts/PostList";

export async function generateStaticParams() {
  const tags = await db.PostsTags();
  return tags.map((item) => ({ tagId: item.slug }));
}

const page = async ({ params }) => {
  const { tagId } = await params;
  const posts = await db.Posts();
  return (
    <div>
      <PostList
        initialData={posts}
        tagId={tagId}
      />
    </div>
  );
};

export default page;
