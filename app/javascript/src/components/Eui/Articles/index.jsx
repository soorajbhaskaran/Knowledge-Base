import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/public/categories";

import Accordion from "./Accordion";
import Article from "./Article";

const Articles = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories: categoriesResponse },
      } = await categoriesApi.fetch();
      setCategories(categoriesResponse);
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
    <div className="flex w-full flex-1">
      <Accordion categories={categories} />
      <Article />
    </div>
  );
};

export default Articles;
