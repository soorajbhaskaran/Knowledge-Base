import React, { useState, useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch } from "react-router-dom";

import categoryApi from "apis/categories";
import preferenceApi from "apis/preference";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "utils/storage";

import Header from "./Header";
import PasswordScreen from "./PasswordScreen";
import PublishedArticle from "./PublishedArticles";

const Eui = () => {
  const [initialSlug, setInitialSlug] = useState("");
  const [preference, setPreference] = useState({});
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = !either(isNil, isEmpty)(authToken);

  const fetchInitialSlug = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch({ path: "/categories" });
      setInitialSlug(categories[0].articles.published[0].slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchPreference = async () => {
    try {
      const {
        data: { preference },
      } = await preferenceApi.show();
      setPreference(preference);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPreference();
    fetchInitialSlug();
  }, []);

  return (
    <div className="h-screen w-full">
      <Header title={preference.name} />
      <Switch>
        <Route exact component={PasswordScreen} path="/article/authenticate" />
        <Route exact component={PublishedArticle} path="/article/:slug" />
        <PrivateRoute
          component={PublishedArticle}
          condition={isAuthenticated}
          initialSlug={initialSlug}
          isPasswordProtected={preference.is_password_protection_enabled}
          path="/article"
          redirectRoute="/article/authenticate"
        />
      </Switch>
    </div>
  );
};
export default Eui;
