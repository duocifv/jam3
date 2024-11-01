"use client"
import { useSearchParams } from "next/navigation";
import React from "react";

const Type = () => {
  const route = useSearchParams();
  const routePage = route.get("page")
  console.log("route", routePage)
  return (
    <div>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index}>{Number(routePage) + index}</div>
      ))}
    </div>
  );
};

export default Type;
