"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const PostList = ({ initialData, categorieId }) => {

  const query = useSearchParams();
  const search = parseInt(query.get("page"), 10) || 0;

  if (!initialData.length > 0) return null;
  const limit = initialData.length >= 10
  const data = limit ? initialData.slice(search * 10, search * 10 + 10) : initialData;

  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto m-6">
      {data.map(({ node }, index) => {
        const categorie = categorieId ?? node?.categories?.nodes[0]?.slug ?? "";
        return (
          <div key={index} className="bg-slate-400 border w-1/4 p-4">
            <a href={`/posts/${categorie}/${node.slug}`}>
              <h2
                className="text-3xl mb-2"
                dangerouslySetInnerHTML={{ __html: node.title }}
              />
              <div
                className="text-sm mb-4"
                dangerouslySetInnerHTML={{ __html: node.date }}
              />
              <hr className="mb-4" />
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
