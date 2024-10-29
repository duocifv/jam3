"use client"
import React from "react";

const PostList = ({ initialData }) => {
  if(!initialData.length > 0 ) return null
  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto m-6">
      {initialData.map(({ node }) => {
        return (
          <div key={node.id} className="bg-slate-400 border w-1/4 p-4">
            <a href={`/posts/${node.slug}`}>
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
