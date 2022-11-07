import React, { useState, useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, useHistory } from "react-router-dom";

import categoriesApi from "apis/categories";
import preferenceApi from "apis/preference";
import EmptyState from "components/Common/EmptyState";
import PrivateRoute from "components/Common/PrivateRoute";
import EmptyArticleList from "images/EmptyArticleList";
import { getFromLocalStorage } from "utils/storage";

import Header from "./Header";
import PasswordScreen from "./PasswordScreen";
import PublishedArticle from "./PublishedArticles";
import { getFirstPublishedArticleFromCategories } from "./utils";

import {
  AUTH_PATH,
  EUI_ARTICLE_PATH,
  EUI_PATH,
  INVALID_PATH,
} from "../routeConstants";

const Eui = () => {
  const [slugOfFirstArticle, setSlugOfFirstArticle] = useState("");
  const [preference, setPreference] = useState({});
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = !either(isNil, isEmpty)(authToken);

  const history = useHistory();

  const fetchFirstArticle = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ path: "/categories" });
      setSlugOfFirstArticle(
        getFirstPublishedArticleFromCategories(categories).slug
      );
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

  const loadData = async () => {
    await Promise.all([fetchFirstArticle(), fetchPreference()]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-screen w-full">
      <Header title={preference.name} />
      <Switch>
        <Route exact component={PasswordScreen} path={AUTH_PATH} />
        <Route
          exact
          path={INVALID_PATH}
          render={(props) => (
            <EmptyState
              {...props}
              image={EmptyArticleList}
              primaryAction={() => history.push("/articles")}
              primaryActionLabel="Home"
              subtitle="The page you are looking for does not exist."
              title="Page Not Found"
            />
          )}
        />
        <Route exact component={PublishedArticle} path={EUI_ARTICLE_PATH} />
        <PrivateRoute
          component={PublishedArticle}
          condition={isAuthenticated}
          isPasswordProtected={preference.is_password_protection_enabled}
          path={EUI_PATH}
          redirectRoute={AUTH_PATH}
          slugOfFirstArticle={slugOfFirstArticle}
        />
      </Switch>
    </div>
  );
};
export default Eui;
