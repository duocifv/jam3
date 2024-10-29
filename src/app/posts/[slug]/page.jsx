import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const GET_POSTS = gql`
  query Posts {
    posts(first: 1000) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($ID: ID!) {
    post(id: $ID, idType: SLUG) {
      id
      title
      excerpt
      date
      content
      isComment
      status
    }
  }
`;

export async function generateStaticParams() {
  const { posts } = await fetchQuery(GET_POSTS);
  const data = posts?.nodes || [];
  return data.map((item) => ({
    slug: item.slug,
    page: 1,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = await fetchQuery(GET_POST, { ID: slug });
  if (!post || !slug) {
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
