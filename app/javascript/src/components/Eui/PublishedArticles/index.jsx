import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoryApi from "apis/categories";

import Accordion from "./Accordion";
import ArticleContent from "./ArticleContent";

const PublishedArticles = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch({ path: "/public/categories" });
      setCategories(
        categories.map(
          (category) =>
            category.articles.published.length > 0 && {
              id: category.id,
              title: category.title,
              articles: category.articles.published,
            }
        )
      );
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
      <div className="h-screen w-full ">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex">
        <Accordion categories={categories} />
        <ArticleContent />
      </div>
    </div>
  );
};

export default PublishedArticles;
