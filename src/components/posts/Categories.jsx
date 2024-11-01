"use client";
import Link from "next/link";
import React from "react";

const Categories = ({ initialData }) => {
  return (
    <div>
      <h3>Hello</h3>
      {initialData.map(({ node }, index) => (
        <div key={index}>
          <Link href={`/posts/${node.slug}`}>{node.name} ({node.count})</Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
