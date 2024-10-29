"use client";
import React from "react";

const PostList = ({ initialData }) => {
  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto m-6">
      {initialData.map((item) => {
        return (
          <div key={item.id} className="bg-slate-400 border w-1/4 p-4">
            <a href={`/posts/${item.slug}`}>
              <h2
                className="text-3xl mb-2"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <div
                className="text-sm mb-4"
                dangerouslySetInnerHTML={{ __html: item.date }}
              />
              <hr className="mb-4" />
              <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
