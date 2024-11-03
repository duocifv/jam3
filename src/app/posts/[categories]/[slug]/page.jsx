import Link from "next/link";
import React from "react";
import db from "@/lib/cache";

export async function generateStaticParams() {
  const data = await db.Posts();
  if(!data) return []
  const params = [];

  data.forEach((post) => {
    const categories = post?.categories?.nodes;
    if (categories) {
      categories.forEach((item) => {
        params.push({
          categories: item.slug,
          slug: post.slug,
        });
      });
    }
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Không cần await ở đây
  const post = await db.Posts(slug); // Gọi một lần duy nhất

  if (!post) {
    return {
      title: "not title",
      description: "not description",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = await params; // Không cần await ở đây
  const post = await db.Posts(slug); // Gọi một lần duy nhất

  return (
    <main className="w-[800px] p-8 mx-auto bg-gray-300 m-6">
      <Link href="/posts/">Back to Posts</Link>
      <h2 className="text-4xl mb-6">{post.title}</h2>
      <p className="mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
};

export default DetailPage;
