import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import categoryApi from "apis/categories";

import PublishedArticles from "./PublishedArticles";

import { EUI_PATH, EUI_ARTICLE_PATH } from "../routeConstants";

const Eui = () => {
  const [initialSlug, setInitialSlug] = useState("");

  const fetchInitialSlug = async () => {
    const {
      data: { categories },
    } = await categoryApi.fetch();
    setInitialSlug(categories[0].articles.published[0].slug);
  };

  useEffect(() => {
    fetchInitialSlug();
  }, []);

  return (
    <div className="h-screen w-full">
      <Switch>
        <Redirect exact from="/article" to={`${EUI_PATH}${initialSlug}`} />
        <Route component={PublishedArticles} path={EUI_ARTICLE_PATH} />
      </Switch>
    </div>
  );
};
export default Eui;
