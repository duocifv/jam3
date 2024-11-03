"use client";
import Link from "next/link";
import React from "react";

const Tags = ({ initialData }) => {
  console.log("initialData", initialData)
  return initialData
  return (
    <div>
      <h3>Hello</h3>
      {initialData.map((item, index) => (
        <div key={index}>
          <Link href={`/posts/${item.slug}`}>{item.name} ({item.count})</Link>
        </div>
      ))}
    </div>
  );
};

export default Tags;
