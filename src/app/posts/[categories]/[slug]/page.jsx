import { fetchQuery } from "@/lib/apolloClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { GET_POSTS_BY_SLUGS } from "@/queries/posts";

// Đặt biến cursors ngoài hàm
const fetchAllCursors = (() => {
  let cursors = []; // Khai báo biến cursors
  return async function () {
    if (cursors.length > 0) return cursors;

    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
      const { posts } = await fetchQuery(GET_POSTS_BY_SLUGS, {
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
  const data = await fetchAllCursors();
  const params = [];
  data.forEach(({ node }) => {
    node?.categories?.nodes.forEach((item) => {
      params.push({
        categories: item.slug,
        slug: node?.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetchAllCursors();
  const { node } = data.find(({ node }) => node.slug === slug);
  return {
    title: node?.title || "not title",
    description: node?.excerpt || "not description",
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = await params;
  const data = await fetchAllCursors();
  const { node } = data.find(({ node }) => node.slug === slug);

  if (!node) {
    notFound();
  }

  return (
    <main className="w-[800px] p-8 mx-auto bg-gray-200 m-6">
      <Link href="/posts/page/2">Back to Posts</Link>
      <h2 className="text-4xl mb-6">{node.title}</h2>
      <p className="mb-6">{node.date}</p>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />
    </main>
  );
};

export default DetailPage;
