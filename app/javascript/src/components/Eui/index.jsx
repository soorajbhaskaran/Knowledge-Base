import React, { useState, useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, withRouter } from "react-router-dom";

import categoriesApi from "apis/categories";
import organizationApi from "apis/organization";
import EmptyState from "components/Common/EmptyState";
import PrivateRoute from "components/Common/PrivateRoute";
import EmptyArticleList from "images/EmptyArticleList";
import { getFromLocalStorage } from "utils/storage";

import Articles from "./Articles";
import Header from "./Header";
import PasswordScreen from "./PasswordScreen";
import { getFirstPublishedArticleFromCategories } from "./utils";

import {
  AUTH_PATH,
  EUI_ARTICLE_PATH,
  EUI_PATH,
  INVALID_PATH,
} from "../routeConstants";

const Eui = ({ history }) => {
  const [slugOfFirstArticle, setSlugOfFirstArticle] = useState("");
  const [organization, setOrganization] = useState({});
  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = !either(isNil, isEmpty)(authToken);

  const fetchFirstArticle = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({});
      setSlugOfFirstArticle(
        getFirstPublishedArticleFromCategories(categories).slug
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchOrganization = async () => {
    try {
      const {
        data: { organization },
      } = await organizationApi.show();
      setOrganization(organization);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    await Promise.all([fetchOrganization(), fetchFirstArticle()]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      <Header
        isPasswordProtected={organization.is_password_protection_enabled}
        title={organization.name}
      />
      <Switch>
        <Route exact component={PasswordScreen} path={AUTH_PATH} />
        <Route
          exact
          path={INVALID_PATH}
          render={(props) => (
            <EmptyState
              {...props}
              image={EmptyArticleList}
              primaryAction={() => history.push("/public/articles")}
              primaryActionLabel="Home"
              subtitle="The page you are looking for does not exist."
              title="Page Not Found"
            />
          )}
        />
        <Route exact component={Articles} path={EUI_ARTICLE_PATH} />
        <PrivateRoute
          component={Articles}
          condition={isAuthenticated}
          isPasswordProtected={organization.is_password_protection_enabled}
          path={EUI_PATH}
          redirectRoute={AUTH_PATH}
          slugOfFirstArticle={slugOfFirstArticle}
        />
      </Switch>
    </div>
  );
};
export default withRouter(Eui);
