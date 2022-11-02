import React from "react";

import { MenuBar } from "neetoui/layouts";
import PropTypes from "prop-types";

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
      ? setCategoryList((prevCategoryList) =>
          prevCategoryList.filter((category) => category.title !== title)
        )
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

Category.propTypes = {
  articles_count: PropTypes.number,
  category: PropTypes.string,
  categoryList: PropTypes.array,
  id: PropTypes.string,
  setCategoryList: PropTypes.func,
};

export default Category;
