import React from "react";
import { ItemType } from "./type";

const StaticComponent = async () => {
  const products = await fetch("https://6717b3deb910c6a6e0298d04.mockapi.io/blog");
  const data = await products.json();
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
    <div className="w-[100px]">
      <ul>
        <p>
          pages:
        </p>
      </ul>
    </div>
  </div>
  );
};

export default StaticComponent;
