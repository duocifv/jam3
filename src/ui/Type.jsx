"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react'

const TypeBox = () => {
    const route = useSearchParams();
    const routePage = route.get("page")
    console.log("route", routePage)
    return (
      <div>
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index + routePage}>{Number(routePage) + index}</div>
        ))}
      </div>
    );
}

export default TypeBox
