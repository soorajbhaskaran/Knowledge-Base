import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import Articles from "./Articles";
import Categories from "./Categories";

import { getArticlesOrderByPosition } from "../utils";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState({});

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({});
      setCategories(categories);
      setSelectedCategory(categories[0]);
      setArticles(getArticlesOrderByPosition(categories[0].articles));
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="w-2/3">
        <Articles
          articles={articles}
          setArticles={setArticles}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
};

export default ManageCategories;
