import { fetchQuery } from "@/lib/apolloClient";
import { GET_POSTS, GET_POST } from "@/queries/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const params = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const { posts } = await fetchQuery(GET_POSTS, {
      after: cursor,
      first: 100,
    });
    if (!posts) {
      console.error("No posts data received");
      break;
    }
    const data = posts?.edges || [];
    data.forEach((item) => {
      params.push({
        slug: item.node.slug,
      });
    });
    hasNextPage = posts.pageInfo.hasNextPage;
    cursor = posts.pageInfo.endCursor;
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = await fetchQuery(GET_POST, { ID: slug });
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = await params;
  const { post } = await fetchQuery(GET_POST, { ID: slug });
  if (!post) {
    notFound();
  }
  return (
    <div className="w-[1200px] p-8 mx-auto bg-gray-200 m-6">
      <Link href="/posts">Back</Link>
      <h2 className="text-4xl mb-6">{post.title}</h2>
      <p className="mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default DetailPage;
