"use client";
import React, { useEffect, useState } from "react";
import { ItemType } from "./type";



const DynamicComponent = () => {
  const [data, setData] = useState<ItemType[]>([]);

  useEffect(() => {
    // Fetching data or performing some side effect
    fetch("https://6717b3deb910c6a6e0298d04.mockapi.io/blog")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  if (data.length < 1) return null;

  return (
    <div className="flex mx-auto flex-wrap justify-center">
      <div className="w-[940px] flex flex-wrap">
        {data.map((item) => (
          <div key={item.id} className="bg-slate-600 w-[280px] p-4 m-3">
            <p>{item.name}</p>
            <p>{item.direction}</p>
          </div>
        ))}
      </div>
      <div className="w-[100px]">
        <ul>
          <p>pages:</p>
        </ul>
      </div>
    </div>
  );
};

export default DynamicComponent;
