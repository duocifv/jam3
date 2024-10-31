import React from "react";

const Categories = ({ initialData }) => {
  return (
    <div>
      <h3>Hello</h3>
      {initialData.map((node) => (
        <div key={node.categoryId}>{node.name}</div>
      ))}
    </div>
  );
};

export default Categories;
