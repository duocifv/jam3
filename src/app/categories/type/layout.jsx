"use client";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Layout({ children, item }) {
  const routeCategory = useSelectedLayoutSegment("item");
  console.log("routeCategory222", routeCategory);
  if (routeCategory === "page") {
    return <>{item}</>;
  }
  return (
    <>
      {children}
    </>
  );
}
