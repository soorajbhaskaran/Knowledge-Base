import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import categoryApi from "apis/categories";

import Header from "./Header";
import PasswordScreen from "./PasswordScreen";

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
      <Header />
      <Redirect exact from={EUI_PATH} to={`${EUI_PATH}${initialSlug}`} />
      <Switch>
        <Route component={PasswordScreen} path={EUI_ARTICLE_PATH} />
        <Route exact component={PasswordScreen} path="/article/authenticate" />
      </Switch>
    </div>
  );
};
export default Eui;
