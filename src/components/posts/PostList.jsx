"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import { useStore } from "@/store/useStore";
import { debounce } from "@/lib/utils";

const Search = ({ initialData, categorieId, categories }) => {
  const posts = useStore((state) => state.posts);
  const sortBy = useStore((state) => state.sortBy);
  const page = useStore((state) => state.page);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const loadMore = useStore((state) => state.loadMore);
  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 80);

  /* List */
  const list = posts.length === 0 ? initialData : posts;
  const fillPosts = !categories
    ? posts
    : list.filter((post) =>
        post?.categories?.nodes?.some((node) => node?.slug === categories)
      );
  const listPage = fillPosts.slice(0 , page * 10);

  /* Search */
  const filteredPosts = list.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const observerRef = useRef();

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="my-4">
      <div>
        <button onClick={() => sortBy("title")}>Sort Title</button> |
        <button onClick={() => sortBy("date")}>Sort Date</button>
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mb-4 p-2 border border-gray-300"
          />
          {searchQuery && (
            <div className="max-h-[500px] w-full bg-white overflow-auto absolute top-12 p-4">
              <button
                className="bg-gray-300 ml-auto w-[120px] block"
                onClick={() => handleSearch("")}
              >
                Close
              </button>
              <ul>
                {filteredPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <h3>{post.title}</h3>
                    <p>{post.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap max-w-[1200px] mx-auto m-6">
        {listPage.map((node, index) => {
          const categorySlug =
            categorieId || node?.categories?.nodes[0]?.slug || "";

          return (
            <div key={index} className="bg-slate-400 border w-1/4 p-4">
              <Link href={`/posts/${categorySlug}/${node.slug}`}>
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
              </Link>
            </div>
          );
        })}
      </div>
      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
};

const PostList = ({ initialData, categorieId, categories }) => {
  const setPosts = useStore((state) => state.setPosts);
  useEffect(() => {
    setPosts(initialData);
  }, [setPosts, initialData]);
  return (
    <Search
      initialData={initialData}
      categorieId={categorieId}
      categories={categories}
    />
  );
};

export default PostList;
