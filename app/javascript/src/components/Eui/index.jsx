import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import categoryApi from "apis/categories";
import preferenceApi from "apis/preference";

import Header from "./Header";
import PasswordScreen from "./PasswordScreen";
import PublishedArticles from "./PublishedArticles";

import { EUI_PATH, EUI_ARTICLE_PATH } from "../routeConstants";

const Eui = () => {
  const [initialSlug, setInitialSlug] = useState("");
  const [preference, setPreference] = useState({});

  const fetchInitialSlug = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch();
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
      if (preference.active) {
        fetchInitialSlug();
      }
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
      <Redirect
        exact
        from={EUI_PATH}
        to={`${EUI_PATH}${!preference.active ? initialSlug : "authenticate"}`}
      />
      <Switch>
        <Route
          exact
          path="/article/authenticate"
          render={(props) => (
            <PasswordScreen
              {...props}
              preference={preference}
              setPreference={setPreference}
            />
          )}
        />
        <Route component={PublishedArticles} path={EUI_ARTICLE_PATH} />
      </Switch>
    </div>
  );
};
export default Eui;
