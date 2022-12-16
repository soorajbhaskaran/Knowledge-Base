import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import Articles from "./Articles";
import DropDownButton from "./Articles/DropDownButton";
import Categories from "./Categories";
import { getArticlesOrderedByPosition } from "./utils";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const fetchCategories = async ({ isFirstFetch }) => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({});
      setCategories(categories);
      if (isFirstFetch) {
        setSelectedCategory(categories[0]);
        setArticles(getArticlesOrderedByPosition(categories[0].articles));
      }

      return categories;
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }

    return categories;
  };

  useEffect(() => {
    fetchCategories({ isFirstFetch: true });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="w-1/3">
        <Categories
          categories={categories}
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setArticles={setArticles}
          setCategories={setCategories}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="w-2/3">
        <Articles
          articles={articles}
          fetchCategories={fetchCategories}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setArticles={setArticles}
          setSearchTerm={setSearchTerm}
        >
          {({
            categories,
            checkedArticles,
            handleCategoryChange,
            handleSearch,
          }) => (
            <DropDownButton
              categories={categories}
              checkedArticles={checkedArticles}
              handleCategoryChange={handleCategoryChange}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              selectedCategoryId={selectedCategory.id}
            />
          )}
        </Articles>
      </div>
    </div>
  );
};

export default ManageCategories;
