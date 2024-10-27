import React from "react";

const ProductCategories = () => {
  return (
    <div className="w-[220px]">
      <h2 className="text-2xl">Product Categories</h2>
      <hr className="border-b-2 mb-4" />
      <ul>
        {categories.map((item) => (
          <a href={item.slug} key={item.id}>
            <p>
              {item.name}
              <span>({item.count})</span>
            </p>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
