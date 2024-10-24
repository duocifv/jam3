"use client";
import React, { useEffect, useState } from "react";
import { ItemType } from "../type";

const DynamicComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://6717b3deb910c6a6e0298d04.mockapi.io/blog")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // Không hiển thị gì nếu đang load
  }

  if (data.length < 1) {
    return <p>No data available.</p>;
  }

  return (
    <div className="flex mx-auto flex-wrap justify-center">
      <div className="w-[940px] flex flex-wrap">
        {data.map((item: ItemType) => (
          <div key={item.id} className="bg-slate-600 w-[280px] p-4 m-3">
            <p>{item.name}</p>
            <p>{item.direction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicComponent;
