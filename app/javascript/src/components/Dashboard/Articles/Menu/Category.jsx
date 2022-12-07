import React from "react";

import { MenuBar } from "neetoui/layouts";
import { filter } from "ramda";

const Category = ({
  id,
  articles_count,
  category,
  title,
  categoryList,
  setCategoryList,
}) => {
  const handleCategoryChange = async ({ title, id }) => {
    categoryList.map(({ title }) => title).includes(title)
      ? setCategoryList(filter((category) => category.title !== title))
      : setCategoryList((prevCategoryList) => [
          ...prevCategoryList,
          { title, id },
        ]);
  };

  return (
    <MenuBar.Block
      count={articles_count}
      label={title}
      active={
        category &&
        category.split(",").includes(title.toLowerCase().replaceAll(" ", "-"))
      }
      onClick={() =>
        handleCategoryChange({
          title: title.toLowerCase().replaceAll(" ", "-"),
          id,
        })
      }
    />
  );
};

export default Category;
