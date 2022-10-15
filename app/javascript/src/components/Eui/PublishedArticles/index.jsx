import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";
import { Switch, Route } from "react-router-dom";

import categoryApi from "apis/categories";
import { EUI_ARTICLE_PATH } from "components/routeConstants";

import Accordion from "./Accordion";
import ArticleContent from "./ArticleContent";

const PublishedArticles = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch();
      setCategories(categories);

      //       const publishedCategory = categories.articles.filter(
      //         (article) => article.status === "published"
      //       );
      // debugger;
      //       setCategories(
      //         publishedCategory.filter((category) => category.articles.length > 0)
      //       );
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
      <div className="flex flex-col items-center  border-b-2 py-5 text-center text-indigo-600">
        <Typography component="p" style="h3" weight="semibold">
          Spinkart
        </Typography>
      </div>
      <div className="flex">
        <Accordion categories={categories} />
        <Switch>
          <Route exact component={ArticleContent} path={EUI_ARTICLE_PATH} />
        </Switch>
      </div>
    </div>
  );
};

export default PublishedArticles;
